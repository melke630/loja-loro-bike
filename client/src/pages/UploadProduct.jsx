// codigo original
/*
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";
import { useEffect } from "react";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
/*
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;
    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl], // Corrigido de imageUr1 para imageUrl 
      };
    });
    setImageLoading(false);
  };*/
  //codigo do gemini
/*
  const handleUploadImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setImageLoading(true);

  try {
    const response = await uploadImage(file);
    
    // Acessa a URL diretamente
    const imageUrl = response?.data?.url;

    if (imageUrl) {
      setData((prev) => ({
        ...prev,
        image: [...prev.image, imageUrl],
      }));
    }
  } catch (error) {
    AxiosToastError(error);
  } finally {
    setImageLoading(false);
  }
};


  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);
    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }; */

  /*useEffect(()=> {
    successAlert("PRODUTO CADASTRADO COM SUCESSO",)
},[])*/
/*
  return (
    <section className="">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Carregar Produtos</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite o nome do produto"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
              Descricao
            </label>
            <textarea
              id="description"
              placeholder="Digite a descricao do produto"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>
          <div>
            <p className="font-medium">Foto</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
              >
                <div className="text-center flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p>Carregar Foto</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </label>
              <div className="flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                    >
                      <img
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageURL(img)}
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="font-medium">Categoria</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
              >
                <option value={""}>Selecione uma categoria</option>
                {allCategory.map((c, index) => {
                  return (
                    <option key={c?._id + index} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="font-medium">Sub Categoria</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (el) => el._id === value
                  ); // Corrigido fechamento de parênteses 
                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
              >
                <option value={""} className="text-neutral-600">
                  Selecione Sub Categoria
                </option>
                {allSubCategory.map((c, index) => {
                  return (
                    <option key={c?._id + index} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">
              Unidade
            </label>
            <input
              id="unit"
              type="text"
              placeholder="Digite a quantidade de unidades"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">
              Quantidades em estoque
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Digite a quantidade de estoques"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">
              Preco
            </label>
            <input
              id="price"
              type="number"
              placeholder="Digite o valor ou preco de cada produto"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">
              Discontos
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Digite a valor de desconto"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {Object.keys(data?.more_details)?.map((k, index) => {
            return (
              <div key={k + index} className="grid gap-1">
                <label htmlFor={k} className="font-medium"> // Corrigido classNamem para className  
                  {k}
                </label>
                <input
                  id={k}
                  type="text"
                  value={data?.more_details[k]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((preve) => {
                      return {
                        ...preve,
                        more_details: {
                          ...preve.more_details,
                          [k]: value,
                        },
                      };
                    });
                  }}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
            );
          })}
          <div
            onClick={() => setOpenAddField(true)}
            className="hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:bg-yellow-600 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 cursor-pointer"
          >
            Adicionar campos
          </div>
          <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold">
            Cadastrar
          </button>
        </form>
      </div>
      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
      )}
      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct; */
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { setAllCategory, setAllSubCategory } from "../store/productSlice";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

const UploadProduct = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");

  const allCategory = useSelector((state) => state.product?.allCategory || []);
  const allSubCategory = useSelector((state) => state.product?.allSubCategory || []);

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const fetchCategoryAndSubCategory = async () => {
    try {
      if (allCategory.length === 0 && SummaryApi?.getCategory) {
        const responseCat = await Axios(SummaryApi.getCategory);
        if (responseCat.data?.success || responseCat.data?.data) {
          dispatch(setAllCategory(responseCat.data.data || responseCat.data));
        }
      }

      if (allSubCategory.length === 0 && SummaryApi?.getSubCategory) {
        const responseSub = await Axios(SummaryApi.getSubCategory);
        if (responseSub.data?.success || responseSub.data?.data) {
          dispatch(setAllSubCategory(responseSub.data.data || responseSub.data));
        }
      }
    } catch (error) {
      console.error("Erro ao carregar categorias/subcategorias:", error);
    }
  };

  useEffect(() => {
    fetchCategoryAndSubCategory();
  }, []);

  useEffect(() => {
    if (data.category.length === 0) {
      setFilteredSubCategories(allSubCategory);
      return;
    }

    const selectedCategoryIds = data.category.map((c) => String(c._id || c));

    const subCats = allSubCategory.filter((sub) => {
      if (!sub.category) return false;
      if (Array.isArray(sub.category)) {
        return sub.category.some((cat) =>
          selectedCategoryIds.includes(String(cat._id || cat))
        );
      }
      return selectedCategoryIds.includes(String(sub.category._id || sub.category));
    });

    setFilteredSubCategories(subCats.length > 0 ? subCats : allSubCategory);
  }, [data.category, allSubCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manipulador exclusivo do Desconto que impede duplicação e restringe de 0 a 100
  const handleDiscountChange = (e) => {
    const rawValue = e.target.value;

    // Se estiver vazio, limpa o campo
    if (rawValue === "") {
      setData((prev) => ({ ...prev, discount: "" }));
      return;
    }

    // Filtra para manter SOMENTE números (remove qualquer letra ou símbolo)
    const onlyDigits = rawValue.replace(/\D/g, "");

    if (onlyDigits === "") {
      setData((prev) => ({ ...prev, discount: "" }));
      return;
    }

    // Se o valor for menor ou igual a 100, salva no estado
    const num = Number(onlyDigits);
    if (num <= 100) {
      setData((prev) => ({ ...prev, discount: String(num) }));
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const response = await uploadImage(file);
      const imageUrl =
        response?.data?.data?.url || response?.data?.url || response?.url;

      if (imageUrl) {
        setData((prev) => ({
          ...prev,
          image: [...prev.image, imageUrl],
        }));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (index) => {
    setData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleSelectCategory = (e) => {
    const value = e.target.value;
    if (!value) return;

    const categoryObj = allCategory.find((c) => String(c._id) === String(value));
    if (
      categoryObj &&
      !data.category.some((c) => String(c._id) === String(value))
    ) {
      setData((prev) => ({
        ...prev,
        category: [...prev.category, categoryObj],
      }));
    }
  };

  const handleRemoveCategory = (index) => {
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((_, i) => i !== index),
    }));
  };

  const handleSelectSubCategory = (e) => {
    const value = e.target.value;
    if (!value) return;

    const subCategoryObj = allSubCategory.find(
      (s) => String(s._id) === String(value)
    );
    if (
      subCategoryObj &&
      !data.subCategory.some((s) => String(s._id) === String(value))
    ) {
      setData((prev) => ({
        ...prev,
        subCategory: [...prev.subCategory, subCategoryObj],
      }));
    }
  };

  const handleRemoveSubCategory = (index) => {
    setData((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.category.length === 0) {
      alert("Por favor, selecione ao menos uma Categoria.");
      return;
    }

    if (data.subCategory.length === 0) {
      alert("Por favor, selecione ao menos uma Subcategoria.");
      return;
    }

    const payload = {
      ...data,
      category: data.category.map((c) => c._id || c),
      subCategory: data.subCategory.map((s) => s._id || s),
      price: Number(data.price),
      stock: Number(data.stock),
      discount: data.discount !== "" ? Number(data.discount) : 0,
    };

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: payload,
      });

      if (response.data?.success) {
        successAlert(response.data.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const subCategoriesToDisplay =
    filteredSubCategories.length > 0 ? filteredSubCategories : allSubCategory;

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload de Produto</h2>
      </div>

      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite o nome do produto"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Descrição */}
          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
              Descrição
            </label>
            <textarea
              id="description"
              placeholder="Digite a descrição do produto"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>

          {/* Upload de Imagem */}
          <div>
            <p className="font-medium">Imagem</p>
            <div>
              <label
                htmlFor="uploadImage"
                className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
              >
                <div className="text-center flex justify-center items-center flex-col">
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p className="text-sm">Enviar Imagem</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </label>

              <div className="flex flex-wrap gap-4 mt-2">
                {data.image.map((img, index) => (
                  <div key={img + index} className="h-20 w-20 bg-blue-50 border relative group">
                    <img
                      src={img}
                      alt="produto"
                      className="w-full h-full object-scale-down cursor-pointer"
                      onClick={() => setViewImageURL(img)}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute bottom-1 right-1 p-1 bg-red-600 hover:bg-red-700 rounded text-white hidden group-hover:block"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categoria */}
          <div className="grid gap-1">
            <label className="font-medium">Categoria</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded text-neutral-600 outline-none"
                onChange={handleSelectCategory}
                value=""
              >
                <option value="">Selecione a Categoria</option>
                {allCategory.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name || c.category}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2 mt-2">
                {data.category.map((c, index) => (
                  <div key={c._id + index} className="text-xs flex items-center gap-1 bg-blue-100 p-1 rounded">
                    <p>{c.name || c.category}</p>
                    <button
                      type="button"
                      className="hover:text-red-600"
                      onClick={() => handleRemoveCategory(index)}
                    >
                      <IoClose size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subcategoria */}
          <div className="grid gap-1">
            <label className="font-medium">Subcategoria</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded text-neutral-600 outline-none"
                onChange={handleSelectSubCategory}
                value=""
              >
                <option value="">Selecione a Subcategoria</option>
                {subCategoriesToDisplay.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name || c.subCategory || c.title}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2 mt-2">
                {data.subCategory.map((c, index) => (
                  <div key={(c._id || index) + index} className="text-xs flex items-center gap-1 bg-blue-100 p-1 rounded">
                    <p>{c.name || c.subCategory || c.title}</p>
                    <button
                      type="button"
                      className="hover:text-red-600"
                      onClick={() => handleRemoveSubCategory(index)}
                    >
                      <IoClose size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unidade */}
          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">
              Unidade
            </label>
            <input
              id="unit"
              type="text"
              placeholder="Ex: 1kg, 500ml, Pacote"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Estoque */}
          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">
              Quantidade em Estoque
            </label>
            <input
              id="stock"
              type="text"
              inputMode="numeric"
              placeholder="Digite a quantidade em estoque"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Preço */}
          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">
              Preço
            </label>
            <input
              id="price"
              type="text"
              inputMode="decimal"
              placeholder="Digite o preço do produto"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Desconto (%) - Corrigido com type="text" + inputMode="numeric" */}
          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">
              Desconto (%)
            </label>
            <input
              id="discount"
              type="text"
              inputMode="numeric"
              placeholder="Digite a porcentagem de desconto (0-100)"
              name="discount"
              value={data.discount}
              onChange={handleDiscountChange}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Botão Cadastrar */}
          <button
            type="submit"
            className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold border cursor-pointer mt-2"
          >
            Cadastrar
          </button>
        </form>
      </div>

      {/* Modal da imagem */}
      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
      )}
    </section>
  );
};

export default UploadProduct;