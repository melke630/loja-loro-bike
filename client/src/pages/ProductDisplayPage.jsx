//codigo original
/*
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
//import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL';
import Divider from '../components/Divider';
import image1 from '../assets/minute_delivery.jpg';   
import image2 from '../assets/Best_Prices_Offers.jpg';
import image3 from '../assets/Wide_Assortment.jpg';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from '../components/AddToCartButton';

const ProductDisplayPage = () => {a
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: []
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

//
/*  codigo original
  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  console.log("product data", data); /*}

  codigo pra texte

  

  return (
  /*
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'> 
          <img
            src={data.image[image]}
            className='w-full h-full object-scale-down'
            alt='product'
          />
        </div> */
        // codigo do gemini
        
      /*
        <div className='flex items-center justify-center gap-3 my-2'>
          {data.image.map((img, index) => {
            return (
              <div
                key={img + index + "point"}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image ? "ring-2 ring-green-500" : ""}`} 
              />
            );
          })}
        </div>
        <div className='grid relative'>
          <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
            {data.image.map((img, index) => {
              return (
                <div className='w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md' key={img + index}>
                  <img
                    src={img}
                    alt='min-product'
                    onClick={() => setImage(index)}
                    className='w-full h-full object-scale-down'
                  />
                </div>
              );
            })}
          </div>
          <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute items-center'> 
            <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'> 
        <p className='bg-green-300 w-fit px-2 rounded-full'>10</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2> 
        <p>{data.unit}</p>
        <Divider />
        <div>
          <p>Preço</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>
                {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))} 
              </p>
            </div>
            {data.discount && (
              <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
            )}
            {data.discount && (
              <p className="font-bold text-green-600 lg:text-2xl">
                {data.discount}% <span className='text-base text-neutral-600'>OFF</span>
              </p>
            )}
          </div>
        </div>

        {data.stock === 0 ? (
          <p className='text-lg text-red-500 my-2'>Fora de estoque</p>
        ) : (
          <div className='my-4'>
            <AddToCartButton data={data} />
          </div>
        )}

        <h2 className='font-semibold'>Por que comprar em nossa loja?</h2>
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image1}
              alt='superfast delivery'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Entrega com responsabilidade</div>
              <p>Receba seu pedido na sua porta o mais breve possível em lojas online perto de você.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image2}
              alt='Best prices offers'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Melhores ofertas e preços</div>
              <p>Destino com melhor preço e ofertas diretamente dos fabricantes.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image3}
              alt='Wide Assortment'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Grande variedade</div>
              <p>Escolha entre mais de 5.000 produtos em alimentos, cuidados pessoais, casa e outras categorias.</p>
            </div>
          </div>
        </div>

        <div className='my-4 grid gap-3'>
          <div>
            <p className='font-semibold'>Descrição</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unidades</p>
            <p className='text-base'>{data.unit}</p> 
          </div>
          {data?.more_details && Object.keys(data?.more_details).map((element, index) => {
            return (
              <div key={element + index}>
                <p className='font-semibold'>{element}</p>
                <p className='text-base'>{data?.more_details[element]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
*/
// codigo do gemini
// vou simplicar temporariamente
/*
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL';
import Divider from '../components/Divider';
import image1 from '../assets/minute_delivery.jpg';   
import image2 from '../assets/Best_Prices_Offers.jpg';
import image3 from '../assets/Wide_Assortment.jpg';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from '../components/AddToCartButton';

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: []
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div>
        {/* Imagem Principal com proteção de carregamento */


        /*
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full flex items-center justify-center overflow-hidden'> 
          {data?.image?.[image] ? (
            <img
              src={data.image[image]}
              className='w-full h-full object-scale-down'
              alt={data?.name || 'product'}
            />
          ) : (
            <div className='text-gray-400 text-sm'>Carregando imagem...</div>
          )}
        </div>

        /* Indicadores de bolinhas */
        /*
        <div className='flex items-center justify-center gap-3 my-2'>
          {data?.image?.map((img, index) => {
            return (
              <div
                key={img + index + "point"}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image ? "ring-2 ring-green-500" : ""}`} 
              />
            );
          })}
        </div>

        /* Galeria de Miniaturas com Scroll */
        /*
        <div className='grid relative'>
          <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
            {data?.image?.map((img, index) => {
              return (
                <div 
                  className={`w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md rounded overflow-hidden border ${index === image ? 'border-green-600' : ''}`} 
                  key={img + index}
                >
                  <img
                    src={img}
                    alt='min-product'
                    onClick={() => setImage(index)}
                    className='w-full h-full object-scale-down'
                  />
                </div>
              );
            })}
          </div>

          <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute items-center'> 
            <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'> 
        <p className='bg-green-300 w-fit px-2 rounded-full text-sm font-semibold'>10 Minutos</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2> 
        <p className='text-slate-500'>{data.unit}</p>
        <Divider />
        <div>
          <p>Preço</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl text-green-700'>
                {DisplayPriceInBRL(pricewithDiscount(data.price, data.discount))} 
              </p>
            </div>
            {data.discount && (
              <p className='line-through text-gray-400'>{DisplayPriceInBRL(data.price)}</p>
            )}
            {data.discount && (
              <p className="font-bold text-green-600 lg:text-2xl">
                {data.discount}% <span className='text-base text-neutral-600'>OFF</span>
              </p>
            )}
          </div>
        </div>

        {data.stock === 0 ? (
          <p className='text-lg text-red-500 my-2 font-semibold'>Fora de estoque</p>
        ) : (
          <div className='my-4'>
            <AddToCartButton data={data} />
          </div>
        )}

        <h2 className='font-semibold mt-6'>Por que comprar em nossa loja?</h2>
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image1}
              alt='superfast delivery'
              className='w-16 h-16 object-contain'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Entrega com responsabilidade</div>
              <p className='text-gray-500'>Receba seu pedido na sua porta o mais breve possível.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image2}
              alt='Best prices offers'
              className='w-16 h-16 object-contain'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Melhores ofertas e preços</div>
              <p className='text-gray-500'>Preço justo e ofertas direto dos melhores fornecedores.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image3}
              alt='Wide Assortment'
              className='w-16 h-16 object-contain'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Grande variedade</div>
              <p className='text-gray-500'>Amplo catálogo com diversas categorias à sua escolha.</p>
            </div>
          </div>
        </div>

        <div className='my-4 grid gap-3'>
          <div>
            <p className='font-semibold'>Descrição</p>
            <p className='text-base text-gray-700'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unidades</p>
            <p className='text-base text-gray-700'>{data.unit}</p> 
          </div>
          {data?.more_details && Object.keys(data?.more_details).map((element, index) => {
            return (
              <div key={element + index}>
                <p className='font-semibold'>{element}</p>
                <p className='text-base text-gray-700'>{data?.more_details[element]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;  */

// codigo do novo do gemini para testar
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.jpg'
import image2 from '../assets/Best_Prices_Offers.jpg'
import image3 from '../assets/Wide_Assortment.jpg'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [image, setImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProductDetails()
    }
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 gap-4'>
      <div>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full flex items-center justify-center overflow-hidden border p-4'>
          {data?.image?.length > 0 && data?.image[image] ? (
            <img
              src={data.image[image]}
              className='w-full h-full object-scale-down'
              alt={data?.name || 'product'}
            />
          ) : (
            <div className='text-gray-400 text-sm flex items-center justify-center h-full'>
              {loading ? "Carregando imagem..." : "Sem imagem disponível"}
            </div>
          )}
        </div>

        <div className='flex items-center justify-center gap-3 my-3'>
          {data?.image?.map((img, index) => {
            return (
              <div
                key={img + index + "point"}
                className={`bg-slate-200 w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all ${index === image ? "ring-2 ring-green-500 bg-green-200" : ""}`}
              />
            )
          })}
        </div>

        <div className='grid relative'>
          <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none scroll-smooth p-1'>
            {data?.image?.map((img, index) => {
              return (
                <div 
                  className={`w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md rounded overflow-hidden border-2 transition-all ${index === image ? 'border-green-600' : 'border-transparent hover:border-slate-300'}`}
                  key={img + index}
                  onClick={() => setImage(index)}
                >
                  <img
                    src={img}
                    alt={data?.name || 'product thumbnail'}
                    className='w-full h-full object-scale-down'
                  />
                </div>
              )
            })}
          </div>

          {data?.image?.length > 1 && (
            <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute items-center'>
              <button onClick={handleScrollLeft} className='z-10 bg-white relative p-2 rounded-full shadow-lg hover:bg-slate-50 border'>
                <FaAngleLeft />
              </button>
              <button onClick={handleScrollRight} className='z-10 bg-white relative p-2 rounded-full shadow-lg hover:bg-slate-50 border'>
                <FaAngleRight />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-100 text-green-800 w-fit px-3 py-0.5 rounded-full text-sm font-semibold'>Entrega Rápida</p>
        <h2 className='text-xl font-semibold lg:text-3xl mt-2'>{data.name}</h2>
        <p className='text-slate-500'>{data.unit}</p>
        
        <Divider />
        
        <div>
          <p className='text-sm text-slate-600'>Preço</p>
          <div className='flex items-center gap-2 lg:gap-4 mt-1'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-bold text-lg lg:text-2xl text-green-700'>
                {DisplayPriceInBRL(pricewithDiscount(data.price, data.discount))}
              </p>
            </div>
            
            {data.discount > 0 && (
              <p className='line-through text-gray-400'>{DisplayPriceInBRL(data.price)}</p>
            )}
            
            {data.discount > 0 && (
              <p className="font-bold text-green-600 lg:text-2xl">
                {data.discount}% <span className='text-base text-neutral-600 font-normal'>OFF</span>
              </p>
            )}
          </div>
        </div>

        {data.stock === 0 ? (
          <div className='bg-red-100 text-red-700 p-3 rounded-md w-fit my-6 font-semibold border border-red-200'>
            Temporariamente fora de estoque
          </div>
        ) : (
          <div className='my-6 max-w-xs'>
            <AddToCartButton data={data} />
          </div>
        )}

        <h2 className='font-semibold mt-8 text-lg'>Por que comprar conosco?</h2>
        <div className='space-y-4 mt-4'>
          <div className='flex items-center gap-4 border p-3 rounded-lg bg-white'>
            <img src={image1} alt='superfast delivery' className='w-14 h-14 object-contain'/>
            <div className='text-sm'>
              <div className='font-semibold'>Entrega Rápida</div>
              <p className='text-gray-500'>Receba seus produtos com rapidez.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 border p-3 rounded-lg bg-white'>
            <img src={image2} alt='Best prices offers' className='w-14 h-14 object-contain'/>
            <div className='text-sm'>
              <div className='font-semibold'>Melhores Preços</div>
              <p className='text-gray-500'>Ofertas imbatíveis e os melhores preços.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 border p-3 rounded-lg bg-white'>
            <img src={image3} alt='Wide Assortment' className='w-14 h-14 object-contain'/>
            <div className='text-sm'>
              <div className='font-semibold'>Ampla Variedade</div>
              <p className='text-gray-500'>Tudo o que você precisa em um só lugar.</p>
            </div>
          </div>
        </div>

        <div className='my-8 grid gap-5 border-t pt-6'>
          <div>
            <p className='font-semibold text-lg'>Descrição</p>
            <p className='text-base text-gray-700 mt-1 whitespace-pre-line'>{data.description}</p>
          </div>
          
          {data.unit && (
            <div>
              <p className='font-semibold'>Unidades</p>
              <p className='text-base text-gray-700'>{data.unit}</p>
            </div>
          )}

          {data?.more_details && Object.keys(data?.more_details).map((element, index) => {
            return (
              <div key={element + index}>
                <p className='font-semibold text-capitalize'>{element.replace('_', ' ')}</p>
                <p className='text-base text-gray-700'>{data?.more_details[element]}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage;