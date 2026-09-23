// Esse componente foi atualizado para persistir os pedidos no backend e MongoDB
/*
import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Address from './Address'; // <-- Importe o componente Address aqui (ajuste o caminho se necessário)

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddress, setOpenAddress] = useState(false); // <-- Estado para abrir/fechar o modal de endereço
  const { fetchCartItem } = useGlobalContext ? useGlobalContext() : {};
  const navigate = useNavigate();

  // Função para buscar os itens do carrinho
  const getCartItems = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCartItem
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setCartItems(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // Função para alterar a quantidade (Aumentar ou Diminuir)
  const handleUpdateQty = async (id, currentQty, type) => {
    let newQty = currentQty;
    if (type === 'increase') {
      newQty += 1;
    } else if (type === 'decrease' && currentQty > 1) {
      newQty -= 1;
    } else {
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: newQty
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        getCartItems(); // Recarrega a lista atualizada
        if (fetchCartItem) fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Função para deletar um item do carrinho
  const handleDeleteItem = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: id
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        getCartItems(); // Recarrega a lista
        if (fetchCartItem) fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Função disparada após preencher/escolher o endereço para finalizar a compra
  const handleCheckout = async (addressId) => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.createOrder,
        data: {
          list_items: cartItems,
          totalAmt: totalPrice,
          addressId: addressId // Passa o ID do endereço selecionado/criado
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message || "Pedido realizado com sucesso!");
        
        setCartItems(); 
        if (fetchCartItem) fetchCartItem();
        
        navigate('/dashboard/myorders');
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
      setOpenAddress(false); // Fecha o modal de endereço
    }
  };

  // Cálculos de Totais
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="bg-slate-100 min-h-screen py-6 px-4 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Meu Carrinho de Compras</h2>

        {loading && cartItems.length === 0 ? (
          <p className="text-center text-slate-500 py-10">Carregando carrinho...</p>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center shadow-md">
            <p className="text-slate-600 text-lg mb-4">Seu carrinho está vazio.</p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            /* Lista de Produtos 
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = item?.productId;
                if (!product) return null;

                return (
                  <div
                    key={item._id}
                    className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between gap-4"
                  >
                    /* Imagem do Produto 
                    <img
                      src={product.image?.[0] || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded border"
                    />

                    /* Detalhes 
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-slate-500 mb-2">{product.unit || 'Unidade'}</p>
                      <p className="font-bold text-green-600">
                        {DisplayPriceInBRL ? DisplayPriceInBRL(product.price) : `R$ ${product.price}`}
                      </p>
                    </div>

                    /* Controles de Quantidade 
                    <div className="flex items-center border rounded overflow-hidden">
                      <button
                        onClick={() => handleUpdateQty(item._id, item.quantity, 'decrease')}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQty(item._id, item.quantity, 'increase')}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        +
                      </button>
                    </div>

                    /* Botão de Excluir 
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-500 hover:text-red-700 p-2 transition-colors"
                      title="Remover item"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                );
              })}
            </div>

            /* Resumo do Pedido / Checkout 
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Resumo do Pedido</h3>
              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span>Quantidade total de itens:</span>
                  <span className="font-semibold text-slate-800">{totalQty}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-800 pt-2 border-t">
                  <span>Total a pagar:</span>
                  <span className="text-green-600">
                    {DisplayPriceInBRL ? DisplayPriceInBRL(totalPrice) : `R$ ${totalPrice}`}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpenAddress(true)} // <-- Abre o componente/modal de endereço ao invés de finalizar direto
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "Processando..." : "Finalizar Compra"}
              </button>
            </div>
          </div>
        )}

        /* Modal / Componente de Endereço 
        {openAddress && (
          <Address 
            onClose={() => setOpenAddress(false)}
            onSuccessAddress={(addressId) => handleCheckout(addressId)} 
          />
        )}
      </div>
    </div>
  );
};

export default Cart; */
// codigo do gemini
import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Address from './Address';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const { fetchCartItem } = useGlobalContext ? useGlobalContext() : {};
  const navigate = useNavigate();

  // Função para buscar os itens do carrinho
  const getCartItems = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCartItem
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setCartItems(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // Função para alterar a quantidade com validação de estoque
  const handleUpdateQty = async (id, currentQty, type, stockLimit) => {
    let newQty = currentQty;

    if (type === 'increase') {
      if (newQty >= stockLimit) {
        toast.error("Quantidade máxima disponível em estoque atingida!");
        return;
      }
      newQty += 1;
    } else if (type === 'decrease' && currentQty > 1) {
      newQty -= 1;
    } else {
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: newQty
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        getCartItems(); 
        if (fetchCartItem) fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Função para deletar um item do carrinho
  const handleDeleteItem = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: id
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        getCartItems(); 
        if (fetchCartItem) fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Função disparada após preencher/escolher o endereço para finalizar a compra
  const handleCheckout = async (addressId) => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.createOrder,
        data: {
          list_items: cartItems,
          totalAmt: totalPrice,
          addressId: addressId 
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message || "Pedido realizado com sucesso!");
        
        setCartItems([]); 
        if (fetchCartItem) fetchCartItem();
        
        navigate('/dashboard/myorders');
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
      setOpenAddress(false); 
    }
  };

  // Cálculos de Totais
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="bg-slate-100 min-h-screen py-6 px-4 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Meu Carrinho de Compras</h2>

        {loading && cartItems.length === 0 ? (
          <p className="text-center text-slate-500 py-10">Carregando carrinho...</p>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center shadow-md">
            <p className="text-slate-600 text-lg mb-4">Seu carrinho está vazio.</p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Produtos */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = item?.productId;
                if (!product) return null;

                const stock = product.stock ?? 0;

                return (
                  <div
                    key={item._id}
                    className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between gap-4"
                  >
                    {/* Imagem do Produto */}
                    <img
                      src={product.image?.[0] || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded border"
                    />

                    {/* Detalhes */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-slate-500 mb-1">{product.unit || 'Unidade'}</p>
                      
                      {/* Selo Dinâmico de Estoque */}
                      <div className="mb-2">
                        {stock === 0 ? (
                          <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded">
                            Esgotado
                          </span>
                        ) : stock === 1 ? (
                          <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded">
                            Última unidade em estoque!
                          </span>
                        ) : stock <= 5 ? (
                          <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded">
                            Apenas {stock} unidades disponíveis
                          </span>
                        ) : null}
                      </div>

                      <p className="font-bold text-green-600">
                        {DisplayPriceInBRL ? DisplayPriceInBRL(product.price) : `R$ ${product.price}`}
                      </p>
                    </div>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center border rounded overflow-hidden">
                      <button
                        onClick={() => handleUpdateQty(item._id, item.quantity, 'decrease', stock)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQty(item._id, item.quantity, 'increase', stock)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Botão de Excluir */}
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-500 hover:text-red-700 p-2 transition-colors"
                      title="Remover item"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Resumo do Pedido / Checkout */}
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Resumo do Pedido</h3>
              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span>Quantidade total de itens:</span>
                  <span className="font-semibold text-slate-800">{totalQty}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-800 pt-2 border-t">
                  <span>Total a pagar:</span>
                  <span className="text-green-600">
                    {DisplayPriceInBRL ? DisplayPriceInBRL(totalPrice) : `R$ ${totalPrice}`}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpenAddress(true)}
                disabled={loading || cartItems.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "Processando..." : "Finalizar Compra"}
              </button>
            </div>
          </div>
        )}

        {/* Modal / Componente de Endereço */}
        {openAddress && (
          <Address 
            onClose={() => setOpenAddress(false)}
            onSuccessAddress={(addressId) => handleCheckout(addressId)} 
          />
        )}
      </div>
    </div>
  );
};

export default Cart;