// codigo funcional 22/09/26 se o outro não prestar eu vou usar ele
/*
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Axios from "../utils/Axios"; 
import SummaryApi from "../common/SummaryApi"; 

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory) || [];
  const subCategoryData = useSelector((state) => state.product.allSubCategory) || [];
  const navigate = useNavigate();

  // Estados para os banners dinâmicos do carrossel
  const [bannersList, setBannersList] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Buscar banners do backend ao carregar a página
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getBanner,
        });
        if (response.data.success && response.data.data.length > 0) {
          setBannersList(response.data.data);
        }
      } catch (error) {
        console.log("Erro ao carregar banners dinâmicos.", error);
      }
    };
    fetchBanners();
  }, []);

  // Efeito para passar os banners automaticamente a cada 4 segundos
  useEffect(() => {
    if (bannersList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannersList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannersList.length]);

  // Redirecionamento seguro para a página de produtos da categoria (100% INTOCADO)
  const handleRedirectProductListpage = (id, catName) => {
    if (!id || !catName) return;

    const subcategory = subCategoryData?.find((sub) => {
      return sub?.category?.some((c) => {
        const catId = typeof c === 'object' ? c?._id : c;
        return catId === id;
      });
    });

    const categoryNameConverted = valideURLConvert(catName);

    if (subcategory && subcategory._id && subcategory.name) {
      const subCategoryNameConverted = valideURLConvert(subcategory.name);
      navigate(`/${categoryNameConverted}-${id}/${subCategoryNameConverted}-${subcategory._id}`);
    } else {
      navigate(`/${categoryNameConverted}-${id}`);
    }
  };

  return (
    <section className="bg-white bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 pb-8 min-h-screen">
      // Carrossel / Banners Dinâmicos 
      <div className="container mx-auto px-4 my-2">
        <div className="relative w-full overflow-hidden rounded-lg shadow-md min-h-[160px] md:min-h-[300px] bg-slate-100 flex items-center justify-center">
          {bannersList.length > 0 ? (
            // Exibe apenas os banners cadastrados no painel
            bannersList.map((bannerItem, index) => {
              const bannerImg = bannerItem.image || bannerItem.imageDesktop;

              return (
                <div
                  key={bannerItem._id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={bannerImg}
                    className="w-full h-full object-cover cursor-pointer"
                    alt={bannerItem.title || "Banner"}
                    onClick={() => bannerItem.redirectTo && navigate(bannerItem.redirectTo)}
                  />
                </div>
              );
            })
          ) : (
            // Caso não tenha nenhum banner cadastrado, mostra um aviso leve ou deixa o espaço reservado
            <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
              Nenhum banner cadastrado
            </div>
          )}

          // Indicadores de bolinhas do carrossel 
          {bannersList.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
              {bannersList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentBanner ? "w-6 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      // Grid de Ícones das Categorias 
      <div className="container mx-auto px-4 my-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {loadingCategory ? (
          new Array(12).fill(null).map((_, index) => (
            <div
              key={index + "loadingcategory"}
              className="bg-white rounded p-3 min-h-40 grid gap-2 shadow animate-pulse"
            >
              <div className="bg-blue-100 min-h-28 rounded"></div>
              <div className="bg-blue-100 h-4 rounded"></div>
            </div>
          ))
        ) : (
          categoryData.map((cat) => (
            <div
              key={cat?._id + "displayCategory"}
              className="w-full h-full cursor-pointer bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              onClick={() => handleRedirectProductListpage(cat?._id, cat?.name)}
            >
              <div className="w-full h-28 lg:h-32 rounded-md bg-slate-50 flex items-center justify-center p-2 overflow-hidden">
                <img
                  src={cat?.image}
                  className="w-full h-full object-contain group-hover:scale-105 transition-all duration-300"
                  alt={cat?.name || "Categoria"}
                />
              </div>

              <p className="text-center text-xs font-semibold mt-2 text-gray-700 truncate group-hover:text-amber-600 transition-colors">
                {cat?.name}
              </p>
            </div>
          ))
        )}
      </div>

      // Exibição dos Produtos por Categoria (Carrosséis) 
      {categoryData?.map((c) => (
        <CategoryWiseProductDisplay
          key={c?._id + "CategorywiseProduct"}
          id={c?._id}
          name={c?.name}
        />
      ))}
    </section>
  );
};

export default Home; */

// 13/10/2026
//comentado no dia 20/10/2026
/*
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory) || [];
  const subCategoryData = useSelector((state) => state.product.allSubCategory) || [];
  const navigate = useNavigate();

  const [bannersList, setBannersList] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  const categoriasRef = useRef(null);

  const scrollCategorias = (dir) => {
    if (categoriasRef.current) {
      categoriasRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await Axios({...SummaryApi.getBanner });
        if (response.data.success && response.data.data.length > 0) {
          setBannersList(response.data.data);
        }
      } catch (error) {
        console.log("Erro ao carregar banners dinâmicos.", error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (bannersList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannersList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannersList.length]);

  const handleRedirectProductListpage = (id, catName) => {
    if (!id ||!catName) return;
    const subcategory = subCategoryData?.find((sub) => {
      return sub?.category?.some((c) => {
        const catId = typeof c === 'object'? c?._id : c;
        return catId === id;
      });
    });
    const categoryNameConverted = valideURLConvert(catName);
    if (subcategory && subcategory._id && subcategory.name) {
      const subCategoryNameConverted = valideURLConvert(subcategory.name);
      navigate(`/${categoryNameConverted}-${id}/${subCategoryNameConverted}-${subcategory._id}`);
    } else {
      navigate(`/${categoryNameConverted}-${id}`);
    }
  };

  return (
    <section className="bg-white bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 pb-8 min-h-screen">
      {/* Banners 
      <div className="container mx-auto px-4 my-2">
        <div className="relative w-full overflow-hidden rounded-lg shadow-md min-h-[160px] md:min-h-[300px] bg-slate-100 flex items-center justify-center">
          {bannersList.length > 0? (
            bannersList.map((bannerItem, index) => {
              const bannerImg = bannerItem.image || bannerItem.imageDesktop;
              return (
                <div key={bannerItem._id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBanner? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                  <img src={bannerImg} className="w-full h-full object-cover cursor-pointer" alt={bannerItem.title || "Banner"} onClick={() => bannerItem.redirectTo && navigate(bannerItem.redirectTo)} />
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400 text-sm">Nenhum banner cadastrado</div>
          )}
          {bannersList.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
              {bannersList.map((_, i) => (
                <button key={i} onClick={() => setCurrentBanner(i)} className={`h-2 rounded-full transition-all ${i === currentBanner? "w-6 bg-white" : "w-2 bg-white/50"}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Carrossel de Categorias - CORRIGIDO LADO ESQUERDO 
      <div className="relative flex items-center justify-center group my-4 overflow-hidden">
        <div ref={categoriasRef} className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 container mx-auto px-4 pl-4 scroll-pl-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {loadingCategory? (
            new Array(12).fill(null).map((_, index) => (
              <div key={index + "loadingcategory"} className="min-w-[140px] md:min-w-[160px] snap-start bg-white rounded p-3 min-h-40 grid gap-2 shadow animate-pulse shrink-0">
                <div className="bg-blue-100 min-h-28 rounded"></div>
                <div className="bg-blue-100 h-4 rounded"></div>
              </div>
            ))
          ) : (
            categoryData.map((cat) => (
              <div key={cat?._id + "displayCategory"} className="min-w-[140px] md:min-w-[160px] snap-start cursor-pointer bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all group/card flex flex-col justify-between shrink-0" onClick={() => handleRedirectProductListpage(cat?._id, cat?.name)}>
                <div className="w-full h-28 lg:h-32 rounded-md bg-slate-50 flex items-center justify-center p-2 overflow-hidden">
                  <img src={cat?.image} className="w-full h-full object-contain group-hover/card:scale-105 transition-all duration-300" alt={cat?.name || "Categoria"} />
                </div>
                <p className="text-center text-xs font-semibold mt-2 text-gray-700 truncate group-hover/card:text-amber-600 transition-colors">{cat?.name}</p>
              </div>
            ))
          )}
        </div>

        {/* Setas - IGUAL ao CategoryWiseProductDisplay, arredondadas 
        <div className="w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between pointer-events-none">
          <button onClick={() => scrollCategorias(-1)} className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full pointer-events-auto border border-gray-100">
            <FaAngleLeft />
          </button>
          <button onClick={() => scrollCategorias(1)} className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full pointer-events-auto border border-gray-100">
            <FaAngleRight />
          </button>
        </div>
      </div>

      {/* Produtos por Categoria 
      {categoryData?.map((c) => (
        <CategoryWiseProductDisplay key={c?._id + "CategorywiseProduct"} id={c?._id} name={c?.name} />
      ))}
    </section>
  );
};

export default Home; */

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory) || [];
  const subCategoryData = useSelector((state) => state.product.allSubCategory) || [];
  const navigate = useNavigate();

  const [bannersList, setBannersList] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  const categoriasRef = useRef(null);

  const scrollCategorias = (dir) => {
    if (categoriasRef.current) {
      categoriasRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await Axios({...SummaryApi.getBanner });
        if (response.data.success && response.data.data.length > 0) {
          setBannersList(response.data.data);
        }
      } catch (error) {
        console.log("Erro ao carregar banners dinâmicos.", error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (bannersList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannersList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannersList.length]);

  // ✅ CORRIGIDO: Agora usa o handle
  const handleRedirectProductListpage = (cat) => {
    if (!cat) return;
    
    // Se tem handle, usa ele: /ferramentas
    if (cat.handle) {
      const subcategory = subCategoryData?.find((sub) => {
        return sub?.category?.some((c) => {
          const catId = typeof c === 'object' ? c?._id : c;
          return catId === cat._id;
        });
      });

      if (subcategory && subcategory.handle) {
        navigate(`/${cat.handle}/${subcategory.handle}`);
      } else if (subcategory && subcategory._id) {
        // fallback pra subcategoria sem handle
        const subName = valideURLConvert(subcategory.name);
        navigate(`/${cat.handle}/${subName}-${subcategory._id}`);
      } else {
        navigate(`/${cat.handle}`);
      }
      return;
    }

    // Fallback para categoria antiga sem handle: /ferramentas-id
    const categoryNameConverted = valideURLConvert(cat.name);
    navigate(`/${categoryNameConverted}-${cat._id}`);
  };

  return (
    <section className="bg-white bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 pb-8 min-h-screen">
      {/* Banners */}
      <div className="container mx-auto px-4 my-2">
        <div className="relative w-full overflow-hidden rounded-lg shadow-md min-h-[160px] md:min-h-[300px] bg-slate-100 flex items-center justify-center">
          {bannersList.length > 0 ? (
            bannersList.map((bannerItem, index) => {
              const bannerImg = bannerItem.image || bannerItem.imageDesktop;
              return (
                <div key={bannerItem._id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                  <img src={bannerImg} className="w-full h-full object-cover cursor-pointer" alt={bannerItem.title || "Banner"} onClick={() => bannerItem.redirectTo && navigate(bannerItem.redirectTo)} />
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400 text-sm">Nenhum banner cadastrado</div>
          )}
          {bannersList.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
              {bannersList.map((_, i) => (
                <button key={i} onClick={() => setCurrentBanner(i)} className={`h-2 rounded-full transition-all ${i === currentBanner ? "w-6 bg-white" : "w-2 bg-white/50"}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Carrossel de Categorias */}
      <div className="relative flex items-center justify-center group my-4 overflow-hidden">
        <div ref={categoriasRef} className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 container mx-auto px-4 pl-4 scroll-pl-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {loadingCategory ? (
            new Array(12).fill(null).map((_, index) => (
              <div key={index + "loadingcategory"} className="min-w-[140px] md:min-w-[160px] snap-start bg-white rounded p-3 min-h-40 grid gap-2 shadow animate-pulse shrink-0">
                <div className="bg-blue-100 min-h-28 rounded"></div>
                <div className="bg-blue-100 h-4 rounded"></div>
              </div>
            ))
          ) : (
            categoryData.map((cat) => (
              <div key={cat?._id + "displayCategory"} className="min-w-[140px] md:min-w-[160px] snap-start cursor-pointer bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all group/card flex flex-col justify-between shrink-0" onClick={() => handleRedirectProductListpage(cat)}>
                <div className="w-full h-28 lg:h-32 rounded-md bg-slate-50 flex items-center justify-center p-2 overflow-hidden">
                  <img src={cat?.image} className="w-full h-full object-contain group-hover/card:scale-105 transition-all duration-300" alt={cat?.name || "Categoria"} />
                </div>
                <p className="text-center text-xs font-semibold mt-2 text-gray-700 truncate group-hover/card:text-amber-600 transition-colors">{cat?.name}</p>
              </div>
            ))
          )}
        </div>

        {/* Setas */}
        <div className="w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between pointer-events-none">
          <button onClick={() => scrollCategorias(-1)} className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full pointer-events-auto border border-gray-100">
            <FaAngleLeft />
          </button>
          <button onClick={() => scrollCategorias(1)} className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full pointer-events-auto border border-gray-100">
            <FaAngleRight />
          </button>
        </div>
      </div>

      {/* Produtos por Categoria */}
      {categoryData?.map((c) => (
        <CategoryWiseProductDisplay key={c?._id + "CategorywiseProduct"} id={c?._id} name={c?.name} handle={c?.handle} />
      ))}
    </section>
  );
};

export default Home;
