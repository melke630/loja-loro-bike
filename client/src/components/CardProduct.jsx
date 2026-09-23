import React from 'react';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from './AddToCartButton';
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL';

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data?.name)}-${data?._id}`;

  const rawImage = Array.isArray(data?.image) ? data?.image[0] : data?.image;
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  let productImage = null;

  if (rawImage) {
    if (rawImage.startsWith('http')) {
      productImage = rawImage.replace(/^http:\/\//i, 'https://');
    } else {
      productImage = `${baseURL}/${rawImage.replace(/^\//, '')}`;
    }
  }

  return (
    <Link
      to={url}
      className='border border-gray-100 p-3 flex flex-col justify-between gap-2 min-w-[260px] lg:min-w-[270px] max-w-[280px] w-full rounded-xl cursor-pointer bg-white shadow-sm hover:shadow-md transition-all overflow-hidden box-border h-full'
    >
      {/* Bloco Superior: Imagem Ampliada + Informações */}
      <div className='flex flex-col gap-1.5'>
        {/* Container da Imagem com Altura Aumentada (h-40 em mobile, h-48 em desktop) */}
        <div className='w-full h-40 lg:h-48 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center p-2 flex-shrink-0'>
          {productImage ? (
            <img
              src={productImage}
              alt={data?.name}
              referrerPolicy='no-referrer'
              crossOrigin='anonymous'
              className='w-full h-full object-contain hover:scale-105 transition-all duration-300'
              onError={(e) => {
                if (rawImage && rawImage.startsWith('http')) {
                  e.target.src = rawImage;
                }
              }}
            />
          ) : (
            <span className='text-xs text-gray-400'>Sem Imagem</span>
          )}
        </div>

        {/* Tag de Desconto */}
        <div className='flex items-center gap-1 min-h-[20px] mt-1'>
          {Boolean(data?.discount) && (
            <p className='text-green-600 bg-green-100 px-2 py-0.5 w-fit text-[11px] rounded-full font-medium whitespace-nowrap'>
              {data.discount}% Desconto
            </p>
          )}
        </div>

        {/* Nome do Produto e Unidade */}
        <div className='flex flex-col gap-0.5'>
          <div className='font-medium text-xs lg:text-sm line-clamp-1 text-gray-800 leading-snug'>
            {data?.name}
          </div>
          <div className='w-fit text-[11px] lg:text-xs text-gray-500'>
            {data?.unit}
          </div>
        </div>
      </div>

      {/* Bloco Inferior: Preços e Botão */}
      <div className='flex items-center justify-between gap-1 pt-2 border-t border-gray-100 w-full mt-1'> 
        {/* Preços */}
        <div className='flex flex-col flex-shrink-0'>
          {Boolean(data?.discount) && (
            <span className='text-[10px] lg:text-xs text-gray-400 line-through leading-tight'>
              {DisplayPriceInBRL(data?.price)}
            </span>
          )}
          <span className='font-bold text-green-700 text-xs lg:text-sm leading-tight'>
            {DisplayPriceInBRL(pricewithDiscount(data?.price, data?.discount))}
          </span>
        </div>

        {/* Botão de Adicionar ao Carrinho */}
        <div className='flex-shrink-0'>
          {data?.stock === 0 ? (
            <p className='text-red-500 text-[10px] font-semibold uppercase'>Fora de estoque</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;