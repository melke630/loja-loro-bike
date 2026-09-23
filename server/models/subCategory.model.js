//codigo original
/*
import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name : {
        type: String,
        default:""
    },
    image : {
        type: String,
        default : ""
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
      }
    ]
} , {
    timestamps: true
})
const SubCategoryModel = mongoose.model('subCategory',subCategorySchema)

export default SubCategoryModel */




// codigo corrigido do gemini que funciona

import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category", // ✅ Corrigido para "category" em minúsculo
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SubCategoryModel = mongoose.model("subCategory", subCategorySchema);

export default SubCategoryModel; 

