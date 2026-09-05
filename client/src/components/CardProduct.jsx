/*

import React from 'react'
//import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL'

const CardProduct = ({data}) => {
    const url = '/product/${valideURLConvert(data.name)}-${data._id}'
    const [loading, setLoading] = useState(false)

return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >
        <div className='min-h-20 w-full max-h-24 1g:max-h-32 rounded overflow-hidden'>
            <img
                src={data.image[0]}
                className='w-full h-full object-scale-down 1g:scale-125'
            />
        </div>
        <div className='flex items-center gap-1'>
            <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50'>
                10
            </div>
            <div>
                {
                    Boolean(data.discount) && (
                        <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{data.discount}% Discontos</p>
                    )
                }
            </div>
        </div>
        <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
            {data.name}
        </div>
        <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:tekt-base'>
            {data.unit}

        </div>

        <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
            <div className='flex items-center gap-1'>
                <div className='font-semibold'>
                    {DisplayPriceInBRL(pricewithDiscount(data.price,data.discount))}
                </div>


            </div>
            <div className=''>
              {
                data.stock == 0 ? (
                  <p className='text-red-500 text-sm text-center'>Fora de estoque</p>
                ) : (
                  <AddToCartButton data={data}/>
                )
              }
            </div>
        </div>

      </Link>
    )
}

export default CardProduct
*/ 
//codigo do gemini
import React from 'react';
import { Link } from 'react-router-dom';

const CardProduct = ({ data }) => {
  // 1. Pega a primeira imagem do array enviado pelo backend
  const productImage = data?.image?.[0];

  return (
    <Link 
      to={`/product/${data?._id}`} 
      className="border p-4 grid gap-3 min-w-36 max-w-52 bg-white rounded flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
    >
      {/* Container da Imagem */}
      <div className="min-h-20 max-h-32 h-32 w-full bg-slate-100 rounded overflow-hidden flex items-center justify-center">
        {productImage ? (
          <img
            src={productImage}
            alt={data?.name}
            className="w-full h-full object-scale-down hover:scale-105 transition-all"
          />
        ) : (
          <span className="text-xs text-gray-400">Sem Imagem</span>
        )}
      </div>

      {/* Informações do Produto */}
      <div className="flex flex-col gap-1">
        <div className="font-medium text-sm text-ellipsis line-clamp-2">
          {data?.name}
        </div>
        <div className="text-xs text-slate-500">
          {data?.unit}
        </div>
        <div className="font-semibold text-green-600 text-sm">
          R$ {data?.price}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;