// codigo original
/*
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: [String],
    default: []
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
    }
  ],
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory"
    }
  ],
  unit: {
    type: String,
    default: ""
  },
  stock: {
    type: Number,
    default: null
  },
  price: {
    type: Number,
    default: null
  },
  discount: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


productSchema.index({
  name: "text",
  description : 'text'
},{
  name: 10,
  description : 5
})

const ProductModel = mongoose.model("product", productSchema);
export default ProductModel; */
// codigo corrigido do gemini
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: [String],
    default: []
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
    }
  ],
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory"
    }
  ],
  unit: {
    type: String,
    default: ""
  },
  stock: {
    type: Number,
    default: null
  },
  price: {
    type: Number,
    default: null
  },
  discount: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// ✅ Sintaxe correta para criar o índice de busca com pesos (weights):
productSchema.index(
  {
    name: "text",
    description: "text"
  },
  {
    weights: {
      name: 10,
      description: 5
    }
  }
);

const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;