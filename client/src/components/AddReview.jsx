import React, { useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';

const AddReview = ({ productId, refreshDetails }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Por favor, selecione ao menos uma estrela!");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addProductReview,
        data: {
          productId,
          rating,
          comment
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setRating(0);
        setComment('');
        if (refreshDetails) refreshDetails(); // Atualiza os dados da página automaticamente
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='border p-5 rounded-lg bg-white shadow-sm mt-6'>
      <h3 className='font-semibold text-lg mb-3 text-slate-800'>Avalie este produto</h3>
      <form onSubmit={handleSubmitReview} className='flex flex-col gap-3'>
        {/* Estrelas interativas para o cliente clicar */}
        <div className='flex gap-1'>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type='button'
              key={star}
              className='text-3xl focus:outline-none transition-transform hover:scale-110'
              style={{ color: (hover || rating) >= star ? '#f59e0b' : '#cbd5e1' }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          placeholder='Escreva seu comentário sobre o produto (opcional)...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='border p-3 rounded text-sm w-full outline-none focus:border-green-600 resize-none'
          rows='3'
        />

        <button
          type='submit'
          disabled={loading}
          className='bg-green-600 text-white py-2 px-5 rounded font-semibold text-sm hover:bg-green-700 transition-colors w-fit disabled:bg-gray-400'
        >
          {loading ? "Enviando..." : "Enviar Avaliação"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;