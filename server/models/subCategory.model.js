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

export default SubCategoryModel






/*import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category", // referência ao modelo Category
      required: true,
    },
    image: {
      type: String, // pode ser URL da imagem
      default: "",
    },
  },
  {
    timestamps: true, // cria automaticamente createdAt e updatedAt
  }
);

const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

export default SubCategoryModel;*/