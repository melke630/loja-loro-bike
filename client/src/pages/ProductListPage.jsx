// codigo antigo
/*
import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ");

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductdata();
  }, [params]);

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => el._id === categoryId);
      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [params, AllSubCategory]);

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
          {DisplaySubCatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link
                to={link}
                key={s._id + "subCategory" + index}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-100 cursor-pointer ${subCategoryId === s._id ? "bg-green-100" : ""}`}
              >
                <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border'>
                  <img
                    src={s.image}
                    alt='subCategory'
                    className='w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                  />
                </div>
                <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
              </Link>
            );
          })}
        </div>

        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>
            <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
                {data.map((p, index) => (
                  <CardProduct
                    data={p}
                    key={p._id + "productSubCategory" + index}
                  />
                ))}
              </div>
            </div>

            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage; */
// codigo do gemini funcional
/*
import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ");

  const categoryId = params?.category?.split("-").slice(-1)[0];
  const subCategoryId = params?.subCategory?.split("-").slice(-1)[0];

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData(prev => [...prev, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Zera a lista e busca novos produtos quando a URL/categoria mudar
  useEffect(() => {
    setPage(1);
    setData([]);
    if (categoryId && subCategoryId) {
      fetchProductdata();
    }
  }, [params.category, params.subCategory]);

  // ✅ Filtra as subcategorias da barra lateral
  useEffect(() => {
    if (AllSubCategory?.length > 0 && categoryId) {
      const sub = AllSubCategory.filter(s => {
        return s.category.some(el => el._id === categoryId);
      });
      setDisplaySubCategory(sub);
    }
  }, [params, AllSubCategory, categoryId]);

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        
        {/* Barra Lateral - Lista de Subcategorias 
        <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
          {DisplaySubCategory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
            
            // ✅ Trata a imagem da subcategoria garantindo protocolo seguro (https) ou fallback
            const subImg = s?.image 
              ? (s.image.startsWith('http') ? s.image.replace(/^http:\/\//i, 'https://') : `${baseURL}/${s.image.replace(/^\//, '')}`)
              : null;

            return (
              <Link
                to={link}
                key={s._id + "subCategory" + index}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-100 cursor-pointer ${subCategoryId === s._id ? "bg-green-100" : ""}`}
              >
                <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border flex items-center justify-center'>
                  {subImg ? (
                    <img
                      src={subImg}
                      alt={s.name}
                      referrerPolicy='no-referrer'
                      className='w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                    />
                  ) : (
                    <div className='w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-[10px] text-gray-400'>
                      Sem foto
                    </div>
                  )}
                </div>
                <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
              </Link>
            );
          })}
        </div>

        {/* Área Principal - Lista de Produtos 
        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>
            <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
              {data.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
                  {data.map((p, index) => (
                    <CardProduct
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                  ))}
                </div>
              ) : (
                !loading && (
                  <div className='flex items-center justify-center h-64 text-gray-500'>
                    Nenhum produto encontrado nesta categoria.
                  </div>
                )
              )}
            </div>

            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage; */
//codigo funcional comentado no dia  08/10/2026
/*
import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ");

  const categoryId = params?.category?.split("-").slice(-1)[0];
  const subCategoryId = params?.subCategory?.split("-").slice(-1)[0];
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      const response = await Axios({
       ...SummaryApi.getProductByCategoryAndSubCategory,
        data: { categoryId, subCategoryId, page, limit: 12 }
      });
      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page === 1) setData(responseData.data);
        else setData(prev => [...prev,...responseData.data]);
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setData([]);
    if (categoryId && subCategoryId) fetchProductdata();
  }, [params.category, params.subCategory]);
  
  useEffect(() => {
    if (AllSubCategory?.length > 0 && categoryId) {
      const sub = AllSubCategory.filter(s => s.category.some(el => el._id === categoryId));
      setDisplaySubCategory(sub);
    }
  }, [params, AllSubCategory, categoryId]);
   
  return (
    <section className='w-full bg-gray-50 min-h-screen'>
      <div className='max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-0'>

        {/* Sidebar - DESKTOP FIXA SEM CORTAR 
        <div className='w-full lg:w-[280px] lg:shrink-0 bg-white lg:rounded-xl lg:shadow-sm lg:m-4 lg:h-fit lg:sticky lg:top-24'>
          <div className='p-4 font-semibold text-sm border-b lg:border-none'>Categorias</div>
          <div className='flex lg:flex-col overflow-x-auto lg:overflow-visible scrollbar-none gap-1 p-2'>
            {DisplaySubCategory.map((s, index) => {
              const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
              const subImg = s?.image? (s.image.startsWith('http')? s.image.replace(/^http:\/\//i, 'https://') : `${baseURL}/${s.image.replace(/^\//, '')}`) : null;
              const isActive = subCategoryId === s._id;

              return (
                <Link
                  to={link}
                  key={s._id + index}
                  className={`flex items-center gap-3 p-2.5 rounded-lg whitespace-nowrap lg:whitespace-normal transition-all
                    ${isActive? "bg-green-50 text-green-700 font-medium" : "hover:bg-gray-50 text-gray-700"}`}
                >
                  <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0'>
                    {subImg? <img src={subImg} alt={s.name} className='w-8 h-8 object-contain' /> : <div className='text-[9px] text-gray-400'>Sem foto</div>}
                  </div>
                  <p className='text-xs lg:text-sm'>{s.name}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Produtos - GRID QUE NÃO CORTA NO DESKTOP 
        <div className='flex-1 lg:p-4'>
          <div className='bg-white p-4 rounded-xl shadow-sm mb-4'>
            <h3 className='font-semibold capitalize'>{subCategoryName}</h3>
          </div>

          {data.length > 0? (
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 p-2 lg:p-0'>
              {data.map((p, index) => (
                <CardProduct data={p} key={p._id + index} />
              ))}
            </div>
          ) : (
           !loading && <div className='flex items-center justify-center h-64 text-gray-500 bg-white rounded-xl'>Nenhum produto encontrado.</div>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage; */

import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  const categoryId = params?.category?.split("-").slice(-1)[0];
  const subCategoryId = params?.subCategory?.split("-").slice(-1)[0];
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // PEGA O NOME REAL DO BANCO, NÃO DA URL
  const currentSubCategory = AllSubCategory.find(s => s._id === subCategoryId);
  const subCategoryName = currentSubCategory?.name || "";

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      const response = await Axios({
      ...SummaryApi.getProductByCategoryAndSubCategory,
        data: { categoryId, subCategoryId, page, limit: 12 }
      });
      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page === 1) setData(responseData.data);
        else setData(prev => [...prev,...responseData.data]);
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setData([]);
    if (categoryId && subCategoryId) fetchProductdata();
  }, [params.category, params.subCategory]);

  // ESSE USEEFFECT PRECISA ESTAR DESCOMENTADO PRA BARRA LATERAL APARECER
  useEffect(() => {
    if (AllSubCategory?.length > 0 && categoryId) {
      const sub = AllSubCategory.filter(s => s.category.some(el => el._id === categoryId));
      setDisplaySubCategory(sub);
    }
  }, [params, AllSubCategory, categoryId]);

  return (
    <section className='w-full bg-gray-50 min-h-screen'>
      <div className='max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-0'>
        <div className='w-full lg:w-[280px] lg:shrink-0 bg-white lg:rounded-xl lg:shadow-sm lg:m-4 lg:h-fit lg:sticky lg:top-24'>
          <div className='p-4 font-semibold text-sm border-b lg:border-none'>Categorias</div>
          <div className='flex lg:flex-col overflow-x-auto lg:overflow-visible scrollbar-none gap-1 p-2'>
            {DisplaySubCategory.map((s, index) => {
              const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
              const subImg = s?.image? (s.image.startsWith('http')? s.image.replace(/^http:\/\//i, 'https://') : `${baseURL}/${s.image.replace(/^\//, '')}`) : null;
              const isActive = subCategoryId === s._id;
              return (
                <Link
                  to={link}
                  key={s._id + index}
                  className={`flex items-center gap-3 p-2.5 rounded-lg whitespace-nowrap lg:whitespace-normal transition-all ${isActive? "bg-green-50 text-green-700 font-medium" : "hover:bg-gray-50 text-gray-700"}`}
                >
                  <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0'>
                    {subImg? <img src={subImg} alt={s.name} className='w-8 h-8 object-contain' /> : <div className='text-[9px] text-gray-400'>Sem foto</div>}
                  </div>
                  <p className='text-xs lg:text-sm'>{s.name}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className='flex-1 lg:p-4'>
          <div className='bg-white p-4 rounded-xl shadow-sm mb-4'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          {data.length > 0? (
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 p-2 lg:p-0'>
              {data.map((p, index) => (
                <CardProduct data={p} key={p._id + index} />
              ))}
            </div>
          ) : (
          !loading && <div className='flex items-center justify-center h-64 text-gray-500 bg-white rounded-xl'>Nenhum produto encontrado.</div>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;