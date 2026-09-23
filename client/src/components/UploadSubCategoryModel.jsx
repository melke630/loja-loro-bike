/*
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadSubCategoryModel = ({ fetchData, closeModal }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file)return;

    try {
      const formData = new FormData();
      //formData.append("file", file);
      formData.append("image", file);

      const response = await Axios({
        ...SummaryApi.uploadImage,
        data: formData,
        //headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("Resposta upload:", response);

      const { data: ImageResponse } = response;

      setSubCategoryData((prev) => ({
        ...prev,
        image: ImageResponse.data.url, // backend deve retornar { url: "..." }
      }));
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    if (index > -1) {
      subCategoryData.category.splice(index, 1);
      setSubCategoryData((prev) => ({ ...prev }));
    }
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchData) fetchData();
        handleClose();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    setSubCategoryData({
      name: "",
      image: "",
      category: [],
    });
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Cadastrar Sub_Categoria</h1>
          <button onClick={handleClose}>
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
          // Nome 
          <div className="grid gap-1">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded"
            />
          </div>

          // Foto 
          <div className="grid gap-1">
            <p>Foto</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center">
                {!subCategoryData.image ?(
                  <p className="text-sm text-neutral-400">Sem Foto</p>
                ) : (
                  <img
                    alt="subCategory"
                    src={subCategoryData.image}
                    className="w-full h-full object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div className="text-sm font-bold text-white min-w-20 border border-red-600 hover:border-green-600 cursor-pointer px-3 py-2 bg-red-500 hover:bg-green-600 rounded">
                  Carregar Foto
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          // Categoria 
          <div className="grid gap-1">
            <label>Selecione categoria</label>
            <div className="border focus-within:border-primary-200 rounded">
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cat) => (
                  <p
                    key={cat._id + "selectedValue"}
                    className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                  >
                    {cat.name}
                    <div
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleRemoveCategorySelected(cat._id)}
                    >
                      <IoClose size={20} />
                    </div>
                  </p>
                ))}
              </div>

              <select
                className="w-full p-2 bg-transparent outline-none border"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id === value
                  );
                  if (categoryDetails) {
                    setSubCategoryData((prev) => ({
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    }));
                  }
                }}
              >
                <option value={""}>Categorias</option>
                {allCategory.map((category, index) => (
                  <option
                    value={category?._id}
                    key={category._id + "subcategory"}
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          //Botão 
          <button
            type="submit" //copilot
            className={`px-4 py-2 border ${
              subCategoryData?.name &&
              subCategoryData?.image &&
              subCategoryData?.category[0]
                ? "bg-gradient-to-r from-gray-700 via-yellow-600 to-red-500 hover:from-red-500 hover:to-yellow-600"
                : "bg-gradient-to-r from-gray-700 to-yellow-500"
            } font-semibold text-white rounded-xl`}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel; */
// codigo do gemini corrigido
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadSubCategoryModel = ({ fetchData, closeModal }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const allCategory = useSelector((state) => state.product.allCategory) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageLoading(true);
      const uploadResponse = await uploadImage(file);

      // Trata os diferentes formatos possíveis de retorno de URL
      const imageUrl =
        uploadResponse?.data?.data?.url ||
        uploadResponse?.data?.secure_url ||
        uploadResponse?.data?.url ||
        uploadResponse?.secure_url ||
        uploadResponse?.url;

      if (imageUrl) {
        setSubCategoryData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
        toast.success("Imagem enviada com sucesso!");
      } else {
        toast.error("Não foi possível obter a URL da imagem.");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData((prev) => ({
      ...prev,
      category: prev.category.filter((cat) => cat._id !== categoryId),
    }));
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();

    if (!subCategoryData.name || !subCategoryData.image || subCategoryData.category.length === 0) {
      toast.error("Preencha o nome, selecione uma imagem e pelo menos uma categoria.");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchData) fetchData();
        handleClose();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubCategoryData({
      name: "",
      image: "",
      category: [],
    });
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold text-lg">Cadastrar Subcategoria</h1>
          <button onClick={handleClose}>
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
          {/* Nome */}
          <div className="grid gap-1">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              placeholder="Digite o nome da subcategoria"
              value={subCategoryData.name}
              onChange={handleChange}
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Foto */}
          <div className="grid gap-1">
            <p>Foto</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center rounded overflow-hidden">
                {imageLoading ? (
                  <p className="text-sm text-neutral-500 animate-pulse">Carregando...</p>
                ) : !subCategoryData.image ? (
                  <p className="text-sm text-neutral-400">Sem Foto</p>
                ) : (
                  <img
                    alt="subCategory"
                    src={subCategoryData.image}
                    className="w-full h-full object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div
                  className={`text-sm font-bold text-white px-4 py-2 rounded cursor-pointer ${
                    imageLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-green-600 border border-red-600 hover:border-green-600"
                  }`}
                >
                  {imageLoading ? "Enviando..." : "Carregar Foto"}
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  accept="image/*"
                  disabled={imageLoading}
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          {/* Categoria */}
          <div className="grid gap-1">
            <label>Selecione a(s) Categoria(s)</label>
            <div className="border focus-within:border-primary-200 rounded p-2 bg-blue-50">
              <div className="flex flex-wrap gap-2 mb-2">
                {subCategoryData.category.map((cat) => (
                  <p
                    key={cat._id + "selectedValue"}
                    className="bg-white shadow-md px-2 py-1 rounded-md flex items-center gap-2 text-sm font-medium"
                  >
                    {cat.name}
                    <span
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleRemoveCategorySelected(cat._id)}
                    >
                      <IoClose size={18} />
                    </span>
                  </p>
                ))}
              </div>

              <select
                className="w-full p-2 bg-white outline-none border rounded cursor-pointer"
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value) return;

                  const categoryDetails = allCategory.find((el) => el._id === value);

                  if (categoryDetails) {
                    const alreadySelected = subCategoryData.category.some(
                      (el) => el._id === value
                    );

                    if (!alreadySelected) {
                      setSubCategoryData((prev) => ({
                        ...prev,
                        category: [...prev.category, categoryDetails],
                      }));
                    } else {
                      toast.error("Categoria já selecionada!");
                    }
                  }
                }}
                defaultValue=""
              >
                <option value="">Selecione uma categoria</option>
                {allCategory.map((category) => (
                  <option key={category._id + "subcategory"} value={category._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botão Salvar */}
          <button
            type="submit"
            disabled={
              loading ||
              imageLoading ||
              !subCategoryData.name ||
              !subCategoryData.image ||
              subCategoryData.category.length === 0
            }
            className={`px-4 py-2 text-white font-semibold rounded-xl ${
              subCategoryData?.name &&
              subCategoryData?.image &&
              subCategoryData?.category.length > 0 &&
              !loading &&
              !imageLoading
                ? "bg-gradient-to-r from-gray-700 via-yellow-600 to-red-500 hover:from-red-500 hover:to-yellow-600 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Cadastrando..." : "Cadastrar Subcategoria"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;