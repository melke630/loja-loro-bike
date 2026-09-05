// src/components/AddToCartButton.jsx
import React from "react";

const AddToCartButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ padding: "8px 12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
      Adicionar ao Carrinho
    </button>
  );
};

export default AddToCartButton;