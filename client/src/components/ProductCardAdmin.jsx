//codigo original
/*
import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import ConfirmBox from './ConfirmBox'   // ❌ estava "CofirmBox"
import { IoClose } from 'react-icons/io5'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleDeleteCancel = () => {
    setOpenDelete(false)
  }

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,   // ❌ estava "CofirmBoxSummaryApi"
        data: { _id: data._id }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)   // ❌ estava "toast. success"
        if (fetchProductData) {
          fetchProductData()
        }
        setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className='w-36 p-4 bg-white rounded'>
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className='w-full h-full object-scale-down'
        />
      </div>
      <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
      <p className='text-slate-400'>{data?.unit}</p>

      <div className='grid grid-cols-2 gap-3 py-2'>
        <button
          onClick={() => setEditOpen(true)}
          className='border px-1 py-1 text-sm border-green-600 bg-green-100 hover:bg-green-200 rounded'
        >
          Editar
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className='border px-1 py-1 text-sm border-red-600 bg-red-100 hover:bg-red-200 rounded'
        >
          Deletar
        </button>
      </div>

      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {openDelete && (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex items-center justify-center'>
          <div className='bg-white p-4 w-full max-w-md rounded-md'>
            <div className='flex items-center justify-between gap-4'>
              <h3 className='font-semibold'>Deletar permanente</h3>
              <button onClick={() => setOpenDelete(false)}>
                <IoClose size={25} />
              </button>
            </div>
            <p className='my-2'>Tem certeza de deletar permanentemente?</p>
            <div className='flex justify-end gap-5 py-4'>
              <button
                onClick={handleDeleteCancel}
                className='border px-3 py-1 rounded bg-red-100 border-red-600 hover:bg-red-200'
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className='border px-3 py-1 rounded bg-green-100 border-green-600 hover:bg-green-200'
              >
                Confirmar
              </button>
            </div>
          </div>
        </section>  
      )}
    </div>
  )
}

export default ProductCardAdmin */
// codigo corrigido do gemini
/*
import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import ConfirmBox from './ConfirmBox'
import { IoClose } from 'react-icons/io5'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleDeleteCancel = () => {
    setOpenDelete(false)
  }

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: data._id }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchProductData) {
          fetchProductData()
        }
        setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  // Pega a URL da primeira imagem de forma segura
  const imageUrl = Array.isArray(data?.image) && data?.image?.length > 0 ? data.image[0] : ''

  return (
    <div className='w-36 p-4 bg-white rounded shadow-sm border flex flex-col justify-between'>
      <div>
        <div className='w-full h-24 bg-blue-50 rounded flex items-center justify-center overflow-hidden mb-2'>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={data?.name || "Produto"}
              className='w-full h-full object-scale-down'
              onError={(e) => {
                // Caso o link da imagem esteja quebrado/incessível no Cloudinary/S3
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Sem+Imagem';
              }}
            />
          ) : (
            <span className='text-xs text-slate-400'>Sem foto</span>
          )}
        </div>
        <p className='text-ellipsis line-clamp-2 font-medium text-sm'>{data?.name}</p>
        <p className='text-slate-400 text-xs'>{data?.unit}</p>
      </div>

      <div className='grid grid-cols-2 gap-2 py-2 mt-2'>
        <button
          onClick={() => setEditOpen(true)}
          className='border px-1 py-1 text-xs border-green-600 bg-green-100 hover:bg-green-200 rounded font-medium'
        >
          Editar
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className='border px-1 py-1 text-xs border-red-600 bg-red-100 hover:bg-red-200 rounded font-medium'
        >
          Deletar
        </button>
      </div>

      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {openDelete && (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex items-center justify-center'>
          <div className='bg-white p-4 w-full max-w-md rounded-md shadow-lg'>
            <div className='flex items-center justify-between gap-4'>
              <h3 className='font-semibold text-lg'>Deletar permanentemente</h3>
              <button onClick={() => setOpenDelete(false)}>
                <IoClose size={25} />
              </button>
            </div>
            <p className='my-2 text-slate-600'>Tem certeza de que deseja deletar este produto permanentemente?</p>
            <div className='flex justify-end gap-3 py-4'>
              <button
                onClick={handleDeleteCancel}
                className='border px-3 py-1 rounded bg-slate-100 border-slate-300 hover:bg-slate-200'
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className='border px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700'
              >
                Confirmar
              </button>
            </div>
          </div>
        </section>  
      )}
    </div>
  )
}

export default ProductCardAdmin; */
// codigo corrigido do gemini
import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import { IoClose } from 'react-icons/io5'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL'
import { pricewithDiscount } from '../utils/PriceWithDiscount'

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleDeleteCancel = () => {
    setOpenDelete(false)
  }

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: data._id }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchProductData) {
          fetchProductData()
        }
        setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const imageUrl = Array.isArray(data?.image) && data?.image?.length > 0 ? data.image[0] : ''

  return (
    <div className='w-40 p-3 bg-white rounded shadow-sm border flex flex-col justify-between'>
      <div>
        <div className='w-full h-24 bg-blue-50 rounded flex items-center justify-center overflow-hidden mb-2'>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={data?.name || "Produto"}
              className='w-full h-full object-scale-down'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Sem+Imagem';
              }}
            />
          ) : (
            <span className='text-xs text-slate-400'>Sem foto</span>
          )}
        </div>
        <p className='text-ellipsis line-clamp-2 font-medium text-xs'>{data?.name}</p>
        <p className='text-slate-400 text-[11px]'>{data?.unit}</p>

        {/* EXIBIÇÃO DO PREÇO E DESCONTO */}
        <div className='mt-1 flex flex-col'>
          {Boolean(data?.discount) && (
            <span className='text-[10px] text-gray-400 line-through'>
              {DisplayPriceInBRL(data?.price)}
            </span>
          )}
          <span className='font-bold text-green-700 text-xs'>
            {DisplayPriceInBRL(pricewithDiscount(data?.price, data?.discount))}
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2 py-2 mt-2'>
        <button
          onClick={() => setEditOpen(true)}
          className='border px-1 py-1 text-xs border-green-600 bg-green-100 hover:bg-green-200 rounded font-medium'
        >
          Editar
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className='border px-1 py-1 text-xs border-red-600 bg-red-100 hover:bg-red-200 rounded font-medium'
        >
          Deletar
        </button>
      </div>

      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {openDelete && (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex items-center justify-center'>
          <div className='bg-white p-4 w-full max-w-md rounded-md shadow-lg'>
            <div className='flex items-center justify-between gap-4'>
              <h3 className='font-semibold text-lg'>Deletar permanentemente</h3>
              <button onClick={() => setOpenDelete(false)}>
                <IoClose size={25} />
              </button>
            </div>
            <p className='my-2 text-slate-600'>Tem certeza de que deseja deletar este produto permanentemente?</p>
            <div className='flex justify-end gap-3 py-4'>
              <button
                onClick={handleDeleteCancel}
                className='border px-3 py-1 rounded bg-slate-100 border-slate-300 hover:bg-slate-200'
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className='border px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700'
              >
                Confirmar
              </button>
            </div>
          </div>
        </section>  
      )}
    </div>
  )
}

export default ProductCardAdmin