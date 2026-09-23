// AddToCartButton.jsx
/*
const AddToCartButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#007bff] hover:bg-blue-700 text-white font-semibold text-[9.5px] lg:text-[10px] px-0.5 py-1.5 rounded transition-colors whitespace-nowrap"
    >
      Adicionar ao Carrinho
    </button>
  );
};

export default AddToCartButton; */
// codigo do gemini 
import React, { useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider'; // Se tiver o provider global para atualizar o carrinho

const AddToCartButton = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItem } = useGlobalContext ? useGlobalContext() : {};

  const handleAddCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCartItem,
        data: {
          productId: data?._id
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem(); // Atualiza os itens do carrinho globalmente, se disponível
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddCart}
      disabled={loading}
      className="bg-[#007bff] hover:bg-blue-700 text-white font-semibold text-[9.5px] lg:text-[10px] px-2 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
    >
      {loading ? "Adicionando..." : "ADICIONAR AO CARRINHO"}
    </button>
  );
};

export default AddToCartButton;