import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct"; // Ou o componente de card que você usa

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pega o termo digitado na URL (ex: ?q=arroz)
  const params = new URLSearchParams(location.search);
  const searchText = params.get("q") || "";

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct, 
        data: {
          search: searchText,
        },
      });

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [location.search]);

  return (
    <section className="min-h-[75vh] py-6 bg-slate-50">
      <div className="container mx-auto px-4">
        <h3 className="font-semibold text-lg md:text-xl text-neutral-800 mb-4">
          {searchText ? `Resultados para: "${searchText}"` : "Pesquisar produtos"}
        </h3>

        {/* Indicador de carregamento em Tailwind (sem precisar de gif) */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
          </div>
        )}

        {/* Caso não encontre nenhum produto */}
        {!loading && data.length === 0 && (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-10 shadow-sm text-center">
            <p className="text-neutral-600 text-lg font-medium">Nenhum produto encontrado</p>
            <p className="text-neutral-400 text-sm mt-1">Tente buscar por outro termo.</p>
          </div>
        )}

        {/* Grade de produtos encontrados */}
        {!loading && data.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.map((p, index) => {
              return (
                // Se você tiver um componente de card pronto, descomente a linha abaixo:
                // <CardProduct data={p} key={p._id + index} />
                
                <div key={p._id || index} className="bg-white p-4 rounded-lg shadow-sm border">
                  <p className="font-semibold text-neutral-800">{p.name}</p>
                  <p className="text-green-600 font-bold mt-2">R$ {p.price}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;