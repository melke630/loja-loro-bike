//codigo original
/*
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategoryModel = ({ close, fetchData }) => {
    const [data, setData] = useState({
        name: "",
        image: "",
        //image: [], // 👈 array
    });

    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.addCategory,
                data: data,
            });
            console.log("Resposta do backend:", response.data);// so pra teste
            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0]

        if (!file) {
            return;
        }

        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        console.log("ImageResponse:", ImageResponse) //codigo copile

        setData((preve) => {
            return {
                ...preve,
                //image: ImageResponse.data.url,
                //image: [ImageResponse.secure_url || ImageResponse.url], // ✅ pega direto
                image: ImageResponse.secure_url || ImageResponse.url,

            };
        });
    };


    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full p-4 rounded">
                // Cabeçalho 
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Categoria</h1>
                    <button onClick={close} className="w-fit block ml-auto">
                        <IoClose size={25} />
                    </button>
                </div>
                // Formulário 
                <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
                    // Nome da categoria 
                    <div className="grid gap-1">
                        <label id="categoryName">Nome</label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Digite o nome da categoria"
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
                        />
                    </div>
                    // Foto 
                    <div className="grid gap-1">
                        <p>Foto</p>
                        <div className="flex gap-4 flex-col lg:flex-row items-center">
                            // Preview da imagem 
                            <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                                {data.image ? (
                                    <img
                                        alt="category"
                                        src={data.image}
                                        className="w-full h-full object-scale-down"
                                    />
                                ) : (
                                    <p className="text-sm text-neutral-500">Sem Foto</p>
                                )}
                            </div>
                            // Botão de upload 
                            <label htmlFor="uploadCategoryImage">
                                <div
                                    className={`
                                ${!data.name
                                            ? " bg-gradient-to-r from-gray-700 to-yellow-500"
                                            : "bg-gradient-to-r from-gray-700 via-yellow-600 to-red-500 hover:from-red-500 hover:to-yellow-600"
                                        }
                                py-2
                                font-semibold text-white px-4 py-2 rounded-xl cursor-pointer border font-medium 
                               `}
                                >
                                    Carregar Foto
                                </div>
                                <input
                                    disabled={!data.name}
                                    onChange={handleUploadCategoryImage}
                                    type="file"
                                    id="uploadCategoryImage"
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                   // Botão de envio
                    <button
                        type="submit"//crescentei submit
                        className={`
                    ${data.name && data.image
                                ? "bg-gradient-to-r from-gray-700 via-yellow-500 to-red-500 hover:from-red-500 hover:to-yellow-600"
                                : "bg-gradient-to-r from-gray-700 to-yellow-500"
                            }
                    py-2
                    font-semibold text-white rounded-xl
                   `}
                    >
                        Adicionar Categoria
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UploadCategoryModel; */
// codigo do gemini corrigido
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.image) {
      toast.error("Por favor, preencha o nome e selecione uma imagem.");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        if (fetchData) fetchData();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setImageLoading(true);
      const uploadResponse = await uploadImage(file);

      // Tratamento para capturar a URL de diferentes formatos de retorno da API
      const imageUrl =
        uploadResponse?.data?.data?.url ||
        uploadResponse?.data?.secure_url ||
        uploadResponse?.data?.url ||
        uploadResponse?.secure_url ||
        uploadResponse?.url;

      if (imageUrl) {
        setData((preve) => ({
          ...preve,
          image: imageUrl,
        }));
        toast.success("Imagem enviada com sucesso!");
      } else {
        toast.error("Falha ao obter URL da imagem enviada.");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Categoria</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>

        {/* Formulário */}
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          {/* Nome da categoria */}
          <div className="grid gap-1">
            <label htmlFor="categoryName">Nome</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Digite o nome da categoria"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>

          {/* Foto */}
          <div className="grid gap-1">
            <p>Foto</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              {/* Preview da imagem */}
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded overflow-hidden">
                {imageLoading ? (
                  <p className="text-sm text-neutral-500 animate-pulse">Carregando...</p>
                ) : data.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">Sem Foto</p>
                )}
              </div>

              {/* Botão de upload */}
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                    ${
                      !data.name || imageLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-gray-700 via-yellow-600 to-red-500 hover:from-red-500 hover:to-yellow-600 cursor-pointer"
                    }
                    py-2 font-semibold text-white px-4 rounded-xl border font-medium
                  `}
                >
                  {imageLoading ? "Enviando..." : "Carregar Foto"}
                </div>
                <input
                  disabled={!data.name || imageLoading}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Botão salvar */}
          <button
            type="submit"
            disabled={loading || imageLoading || !data.name || !data.image}
            className={`
              ${
                data.name && data.image && !loading && !imageLoading
                  ? "bg-gradient-to-r from-gray-700 via-yellow-500 to-red-500 hover:from-red-500 hover:to-yellow-600 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }
              py-2 font-semibold text-white rounded-xl my-2
            `}
          >
            {loading ? "Salvando..." : "Adicionar Categoria"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;