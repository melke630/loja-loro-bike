/*
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";
import NoData from "../components/NoData";

const BannerAdmin = () => {
  const [data, setData] = useState({
    title: "",
    image: "",
    redirectTo: "",
  });

  const [bannersList, setBannersList] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  
  const [deleteBanner, setDeleteBanner] = useState({ _id: "" });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getBanner,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setBannersList(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingUpload(true);
    try {
      const response = await uploadImage(file);
      console.log("Resposta completa do upload:", response);

      const imageUrl = 
        response?.data?.url || 
        response?.url || 
        response?.secure_url || 
        response?.data?.secure_url;

      if (imageUrl) {
        setData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
        successAlert("Imagem carregada com sucesso!");
      } else {
        alert("O upload ocorreu, mas a URL da imagem não foi encontrada na resposta.");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.addBanner,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          title: "",
          image: "",
          redirectTo: "",
        });
        fetchBanners();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleDeleteBanner = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteBanner,
        url: `${SummaryApi.deleteBanner.url}/${deleteBanner._id}`,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        fetchBanners();
        setOpenConfirmBoxDelete(false);
        setDeleteBanner({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full">
      <div className="p-2 bg-white shadow-md flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Banners do Carrossel</h2>
      </div>

      /* Formulário de Cadastro 
      <div className="bg-white p-4 shadow-md rounded mb-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          
          <div className="grid gap-1">
            <label className="font-medium text-sm">Título (Opcional):</label>
            <input
              type="text"
              name="title"
              placeholder="Digite o título do banner"
              value={data.title}
              onChange={handleChange}
              className="bg-blue-50 p-2 border rounded outline-none text-sm"
            />
          </div>

          <div className="grid gap-1">
            <label className="font-medium text-sm">Link de Redirecionamento (Opcional - ex: /category/123):</label>
            <input
              type="text"
              name="redirectTo"
              placeholder="/caminho-do-produto-ou-categoria"
              value={data.redirectTo}
              onChange={handleChange}
              className="bg-blue-50 p-2 border rounded outline-none text-sm"
            />
          </div>

          {/* Upload Imagem 
          <div className="grid gap-1">
            <label className="font-medium text-sm">Imagem do Banner:</label>
            <label className="bg-blue-50 h-36 border rounded flex justify-center items-center cursor-pointer overflow-hidden">
              {loadingUpload ? (
                <Loading />
              ) : data.image ? (
                <img src={data.image} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center flex flex-col items-center">
                  <FaCloudUploadAlt size={25} />
                  <span className="text-sm">Carregar Imagem</span>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleUploadImage} />
            </label>
          </div>

          <button type="submit" className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold text-white bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 cursor-pointer">
            Cadastrar Banner
          </button>
        </form>
      </div>

      {/* Listagem de Banners 
      <h3 className="font-semibold text-md mb-3">Banners Cadastrados</h3>

      {!bannersList[0] && !loading && <NoData />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bannersList.map((banner) => {
          return (
            <div key={banner._id} className="bg-white p-3 border rounded shadow relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-neutral-500 truncate max-w-[80%]">ID: {banner._id}</span>
                  <button
                    onClick={() => {
                      setDeleteBanner(banner);
                      setOpenConfirmBoxDelete(true);
                    }}
                    className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded cursor-pointer"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>

                {banner.title && (
                  <p className="text-sm font-semibold mb-2 text-neutral-700">{banner.title}</p>
                )}
              </div>

              <div className="h-32 bg-blue-50 border flex items-center justify-center overflow-hidden rounded mb-2">
                {banner.image ? (
                  <img
                    src={banner.image}
                    alt="Banner"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setViewImageURL(banner.image)}
                  />
                ) : (
                  <span className="text-xs text-neutral-400">Sem imagem</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {/* Modal de Zoom da Imagem 
      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
      )}

      {/* Modal de Confirmação de Exclusão 
      {openConfirmBoxDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-2">Excluir Banner</h3>
            <p className="text-sm text-neutral-600 mb-4">Tem certeza que deseja excluir este banner?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenConfirmBoxDelete(false)}
                className="px-4 py-2 bg-gray-200 rounded text-sm font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteBanner}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BannerAdmin; */

// codigo dizendo a ia que vai da tudo certo
// codigo dizendo a ia que vai da tudo certo
/*
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";
import NoData from "../components/NoData";

const BannerAdmin = () => {
  const [data, setData] = useState({
    title: "",
    image: "",
    imageDesktop: "",
    imageMobile: "",
    redirectTo: "",
  });

  const [bannersList, setBannersList] = useState([]);
  const [loadingUploadDesktop, setLoadingUploadDesktop] = useState(false);
  const [loadingUploadMobile, setLoadingUploadMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  
  const [deleteBanner, setDeleteBanner] = useState({ _id: "" });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getBanner,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setBannersList(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fieldName === "imageDesktop") setLoadingUploadDesktop(true);
    if (fieldName === "imageMobile") setLoadingUploadMobile(true);

    try {
      const response = await uploadImage(file);
      const imageUrl = 
        response?.data?.url || 
        response?.url || 
        response?.secure_url || 
        response?.data?.secure_url;

      if (imageUrl) {
        setData((prev) => ({
          ...prev,
          [fieldName]: imageUrl,
        }));
        successAlert("Imagem carregada com sucesso!");
      } else {
        alert("O upload ocorreu, mas a URL da imagem não foi encontrada.");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingUploadDesktop(false);
      setLoadingUploadMobile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.addBanner,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          title: "",
          image: "",
          imageDesktop: "",
          imageMobile: "",
          redirectTo: "",
        });
        fetchBanners();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleDeleteBanner = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteBanner,
        url: `${SummaryApi.deleteBanner.url}/${deleteBanner._id}`,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        fetchBanners();
        setOpenConfirmBoxDelete(false);
        setDeleteBanner({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full">
      <div className="p-2 bg-white shadow-md flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Banners do Carrossel (Desktop & Mobile)</h2>
      </div>

      {/* Formulário de Cadastro 
      <div className="bg-white p-4 shadow-md rounded mb-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          
          <div className="grid gap-1">
            <label className="font-medium text-sm">Título (Opcional):</label>
            <input
              type="text"
              name="title"
              placeholder="Digite o título do banner"
              value={data.title}
              onChange={handleChange}
              className="bg-blue-50 p-2 border rounded outline-none text-sm"
            />
          </div>

          <div className="grid gap-1">
            <label className="font-medium text-sm">Link de Redirecionamento (Opcional):</label>
            <input
              type="text"
              name="redirectTo"
              placeholder="/caminho-do-produto-ou-categoria"
              value={data.redirectTo}
              onChange={handleChange}
              className="bg-blue-50 p-2 border rounded outline-none text-sm"
            />
          </div>

          {/* Grid para os dois uploads lado a lado em telas maiores 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Upload Desktop 
            <div className="grid gap-1">
              <label className="font-medium text-sm">Imagem Desktop (Horizontal):</label>
              <label className="bg-blue-50 h-36 border rounded flex justify-center items-center cursor-pointer overflow-hidden">
                {loadingUploadDesktop ? (
                  <Loading />
                ) : data.imageDesktop ? (
                  <img src={data.imageDesktop} alt="Banner Desktop" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center flex flex-col items-center">
                    <FaCloudUploadAlt size={25} />
                    <span className="text-sm">Carregar Desktop</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e, "imageDesktop")} />
              </label>
            </div>

            {/* Upload Mobile 
            <div className="grid gap-1">
              <label className="font-medium text-sm">Imagem Mobile (Vertical/Quadrada):</label>
              <label className="bg-blue-50 h-36 border rounded flex justify-center items-center cursor-pointer overflow-hidden">
                {loadingUploadMobile ? (
                  <Loading />
                ) : data.imageMobile ? (
                  <img src={data.imageMobile} alt="Banner Mobile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center flex flex-col items-center">
                    <FaCloudUploadAlt size={25} />
                    <span className="text-sm">Carregar Mobile</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e, "imageMobile")} />
              </label>
            </div>

          </div>

          <button type="submit" className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold text-white bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 cursor-pointer">
            Cadastrar Banner
          </button>
        </form>
      </div>

      {/* Listagem de Banners 
      <h3 className="font-semibold text-md mb-3">Banners Cadastrados</h3>

      {!bannersList[0] && !loading && <NoData />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bannersList.map((banner) => {
          const bannerImage = banner.imageDesktop || banner.imageMobile || banner.image;

          return (
            <div key={banner._id} className="bg-white p-3 border rounded shadow relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-neutral-500 truncate max-w-[80%]">ID: {banner._id}</span>
                  <button
                    onClick={() => {
                      setDeleteBanner(banner);
                      setOpenConfirmBoxDelete(true);
                    }}
                    className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded cursor-pointer"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>

                {banner.title && (
                  <p className="text-sm font-semibold mb-2 text-neutral-700">{banner.title}</p>
                )}
              </div>

              {/* Exibe prévia rápida no card com suporte a Desktop, Mobile e o campo antigo 'image' 
              <div className="h-32 bg-blue-50 border flex items-center justify-center overflow-hidden rounded mb-2">
                {bannerImage ? (
                  <img
                    src={bannerImage}
                    alt="Banner"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setViewImageURL(bannerImage)}
                  />
                ) : (
                  <span className="text-xs text-neutral-400">Sem imagem</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {/* Modal de Zoom 
      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
      )}

      {/* Modal de Exclusão 
      {openConfirmBoxDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-2">Excluir Banner</h3>
            <p className="text-sm text-neutral-600 mb-4">Tem certeza que deseja excluir este banner?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenConfirmBoxDelete(false)}
                className="px-4 py-2 bg-gray-200 rounded text-sm font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteBanner}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BannerAdmin; */
// codigo para ver se funciom
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";
import NoData from "../components/NoData";

const BannerAdmin = () => {
  const [data, setData] = useState({
    title: "",
    image: "",
    imageDesktop: "",
    imageMobile: "",
    redirectTo: "",
  });

  const [bannersList, setBannersList] = useState([]);
  const [loadingUploadDesktop, setLoadingUploadDesktop] = useState(false);
  const [loadingUploadMobile, setLoadingUploadMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  
  const [deleteBanner, setDeleteBanner] = useState({ _id: "" });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getBanner,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setBannersList(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fieldName === "imageDesktop") setLoadingUploadDesktop(true);
    if (fieldName === "imageMobile") setLoadingUploadMobile(true);

    try {
      const response = await uploadImage(file);
      const imageUrl = 
        response?.data?.url || 
        response?.url || 
        response?.secure_url || 
        response?.data?.secure_url;

      if (imageUrl) {
        setData((prev) => ({
          ...prev,
          [fieldName]: imageUrl,
        }));
        successAlert("Imagem carregada com sucesso!");
      } else {
        alert("O upload ocorreu, mas a URL da imagem não foi encontrada.");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingUploadDesktop(false);
      setLoadingUploadMobile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.addBanner,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          title: "",
          image: "",
          imageDesktop: "",
          imageMobile: "",
          redirectTo: "",
        });
        fetchBanners();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleDeleteBanner = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteBanner,
        url: `${SummaryApi.deleteBanner.url}/${deleteBanner._id}`,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        fetchBanners();
        setOpenConfirmBoxDelete(false);
        setDeleteBanner({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full">
      <div className="p-2 bg-white shadow-md flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Banners do Carrossel (Desktop & Mobile)</h2>
      </div>

      {/* Formulário de Cadastro */}
      <div className="bg-white p-4 shadow-md rounded mb-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          
          <div className="grid gap-1">
            <label className="font-medium text-sm">Título (Opcional):</label>
            <input
              type="text"
              name="title"
              placeholder="Digite o título do banner"
              value={data.title}
              onChange={handleChange}
              className="bg-blue-50 p-2 border rounded outline-none text-sm"
            />
          </div>

          <div className="grid gap-1">
            <label className="font-medium text-sm">Link de Redirecionamento (Opcional):</label>
            <input
              type="text"
              name="redirectTo"
              placeholder="/caminho-do-produto-ou-categoria"
              value={data.redirectTo}
              onChange={handleChange}
              className="bg-blue-50 p-2 border rounded outline-none text-sm"
            />
          </div>

          {/* Grid de Uploads (Desktop & Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Upload Desktop */}
            <div className="grid gap-1">
              <label className="font-medium text-sm">Imagem Desktop (Horizontal):</label>
              <label className="bg-blue-50 h-36 border rounded flex justify-center items-center cursor-pointer overflow-hidden">
                {loadingUploadDesktop ? (
                  <Loading />
                ) : data.imageDesktop ? (
                  <img src={data.imageDesktop} alt="Banner Desktop" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center flex flex-col items-center">
                    <FaCloudUploadAlt size={25} />
                    <span className="text-sm">Carregar Desktop</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e, "imageDesktop")} />
              </label>
            </div>

            {/* Upload Mobile */}
            <div className="grid gap-1">
              <label className="font-medium text-sm">Imagem Mobile (Vertical/Quadrada):</label>
              <label className="bg-blue-50 h-36 border rounded flex justify-center items-center cursor-pointer overflow-hidden">
                {loadingUploadMobile ? (
                  <Loading />
                ) : data.imageMobile ? (
                  <img src={data.imageMobile} alt="Banner Mobile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center flex flex-col items-center">
                    <FaCloudUploadAlt size={25} />
                    <span className="text-sm">Carregar Mobile</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadImage(e, "imageMobile")} />
              </label>
            </div>

          </div>

          <button type="submit" className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold text-white bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 cursor-pointer">
            Cadastrar Banner
          </button>
        </form>
      </div>

      {/* Listagem de Banners */}
      <h3 className="font-semibold text-md mb-3">Banners Cadastrados</h3>

      {!bannersList[0] && !loading && <NoData />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bannersList.map((banner) => {
          const bannerImage = banner.imageDesktop || banner.imageMobile || banner.image;

          return (
            <div key={banner._id} className="bg-white p-3 border rounded shadow relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-neutral-500 truncate max-w-[80%]">ID: {banner._id}</span>
                  <button
                    onClick={() => {
                      setDeleteBanner(banner);
                      setOpenConfirmBoxDelete(true);
                    }}
                    className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded cursor-pointer"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>

                {banner.title && (
                  <p className="text-sm font-semibold mb-2 text-neutral-700">{banner.title}</p>
                )}
              </div>

              <div className="h-32 bg-blue-50 border flex items-center justify-center overflow-hidden rounded mb-2">
                {bannerImage ? (
                  <img
                    src={bannerImage}
                    alt="Banner"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setViewImageURL(bannerImage)}
                  />
                ) : (
                  <span className="text-xs text-neutral-400">Sem imagem</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {/* Modal de Zoom */}
      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
      )}

      {/* Modal de Exclusão */}
      {openConfirmBoxDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-2">Excluir Banner</h3>
            <p className="text-sm text-neutral-600 mb-4">Tem certeza que deseja excluir este banner?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenConfirmBoxDelete(false)}
                className="px-4 py-2 bg-gray-200 rounded text-sm font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteBanner}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BannerAdmin;