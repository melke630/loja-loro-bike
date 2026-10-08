import React from 'react';

const RatingStars = ({ rating = 0, numReviews = 0 }) => {
  // Gera 5 estrelas baseadas na nota média
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <span 
        key={index} 
        style={{ 
          color: index < Math.round(rating) ? '#f59e0b' : '#cbd5e1', // Amarelo dourado ou cinza claro
          fontSize: '14px' 
        }}
      >
        ★
      </span>
    );
  });

  return (
    <div className="flex items-center gap-1.5 my-1">
      <div className="flex">{stars}</div>
      <span className="text-xs text-slate-500">
        ({numReviews || 0})
      </span>
    </div>
  );
};

export default RatingStars;