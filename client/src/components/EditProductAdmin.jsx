import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { FaCloudUploadAlt } from 'react-icons/fa'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import uploadImage from '../utils/UploadImage'
import Loading from '../components/Loading'
import ViewImage from './ViewImage'
import { MdDelete } from 'react-icons/md'

const EditProductAdmin = ({ close, data, fetchProductData }) => {
  const [formData, setFormData] = useState({
    _id: data?._id,
    name: data?.name || "",
    image: data?.image || [],
    category: data?.category || [],
    subCategory: data?.subCategory || [],
    unit: data?.unit || "",
    stock: data?.stock || "",
    price: data?.price || "",
    discount: data?.discount || "",
    description: data?.description || "",
    more_details: data?.more_details || {},
  })

  const [viewImageURL, setViewImageURL] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploadingImage(true)
      const uploadResponse = await uploadImage(file)
      const imageUrl = uploadResponse?.data?.url

      setFormData((prev) => ({
        ...prev,
        image: [...prev.image, imageUrl]
      }))
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleDeleteImage = (index) => {
    const newImages = [...formData.image]
    newImages.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      image: newImages
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateProductDetails, // Garanta que essa rota exista no seu SummaryApi
        data: formData
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message || "Produto atualizado com sucesso!")
        if (fetchProductData) {
          fetchProductData()
        }
        close()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 overflow-y-auto'>
      <div className='bg-white w-full max-w-2xl rounded-lg p-6 shadow-lg max-h-[90vh] overflow-y-auto'>
        
        {/* Cabeçalho */}
        <div className='flex justify-between items-center pb-3 border-b'>
          <h2 className='font-semibold text-lg text-slate-800'>Editar Produto</h2>
          <button onClick={close} className='text-slate-500 hover:text-red-600'>
            <IoClose size={25} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className='grid gap-4 mt-4'>
          
          {/* Nome */}
          <div>
            <label className='block font-medium text-sm text-slate-700 mb-1'>Nome do Produto</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full p-2 border rounded focus:outline-none focus:border-primary-200'
            />
          </div>

          {/* Descrição */}
          <div>
            <label className='block font-medium text-sm text-slate-700 mb-1'>Descrição</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className='w-full p-2 border rounded focus:outline-none focus:border-primary-200 resize-none'
            />
          </div>

          {/* Imagens */}
          <div>
            <p className='font-medium text-sm text-slate-700 mb-1'>Imagens do Produto</p>
            <div className='flex flex-wrap gap-3 items-center'>
              {formData.image.map((img, index) => (
                <div key={index} className='relative w-20 h-20 border rounded bg-slate-50 flex items-center justify-center overflow-hidden group'>
                  <img src={img} alt={`img-${index}`} className='w-full h-full object-scale-down' />
                  <button
                    type='button'
                    onClick={() => handleDeleteImage(index)}
                    className='absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <MdDelete size={14} />
                  </button>
                </div>
              ))}

              <label className='w-20 h-20 border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-500'>
                <FaCloudUploadAlt size={22} />
                <span className='text-[10px] mt-1'>{uploadingImage ? "Enviando..." : "Upload"}</span>
                <input type='file' accept='image/*' onChange={handleUploadImage} className='hidden' />
              </label>
            </div>
          </div>

          {/* Unidade, Preço, Desconto e Estoque */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div>
              <label className='block font-medium text-sm text-slate-700 mb-1'>Unidade (ex: kg, un)</label>
              <input
                type='text'
                name='unit'
                value={formData.unit}
                onChange={handleChange}
                className='w-full p-2 border rounded focus:outline-none focus:border-primary-200'
              />
            </div>

            <div>
              <label className='block font-medium text-sm text-slate-700 mb-1'>Preço (R$)</label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleChange}
                required
                className='w-full p-2 border rounded focus:outline-none focus:border-primary-200'
              />
            </div>

            <div>
              <label className='block font-medium text-sm text-slate-700 mb-1'>Desconto (%)</label>
              <input
                type='number'
                name='discount'
                value={formData.discount}
                onChange={handleChange}
                className='w-full p-2 border rounded focus:outline-none focus:border-primary-200'
              />
            </div>

            <div>
              <label className='block font-medium text-sm text-slate-700 mb-1'>Estoque</label>
              <input
                type='number'
                name='stock'
                value={formData.stock}
                onChange={handleChange}
                required
                className='w-full p-2 border rounded focus:outline-none focus:border-primary-200'
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className='flex justify-end gap-3 mt-4 pt-3 border-t'>
            <button
              type='button'
              onClick={close}
              className='px-4 py-2 border rounded text-slate-600 hover:bg-slate-100'
            >
              Cancelar
            </button>
            <button
              type='submit'
              disabled={loading}
              className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50'
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>

        </form>
      </div>
    </section>
  )
}

export default EditProductAdmin