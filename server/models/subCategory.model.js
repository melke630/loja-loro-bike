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
//cpmentado no dia 20/10/2026
/*
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

export default SubCategoryModel; */
/* 
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
    // ✅ NOVO - vindo da Medusa (product-category.ts)
    handle: {
      type: String,
      unique: true, // igual o da Medusa, não pode repetir
      sparse: true, // permite deixar vazio no começo sem dar erro
    },
    mpath: {
      type: String,
      default: "",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    rank: {
      type: Number,
      default: 0,
    },
    // ✅ SEU CÓDIGO ORIGINAL - mantém igual pra página não quebrar
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

subCategorySchema.index({ mpath: 1 });
subCategorySchema.index({ name: "text" });

const SubCategoryModel = mongoose.model("subCategory", subCategorySchema);

export default SubCategoryModel; */

import mongoose from "mongoose";

const generateHandle = (name) => {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    handle: { type: String, unique: true, sparse: true },
    mpath: { type: String, default: "" },
    is_active: { type: Boolean, default: true },
    rank: { type: Number, default: 0 },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
  },
  { timestamps: true }
);

subCategorySchema.pre("save", async function (next) {
  if (!this.handle && this.name) {
    let baseHandle = generateHandle(this.name);
    let handle = baseHandle;
    let counter = 1;
    while (await mongoose.model("subCategory").findOne({ handle })) {
      handle = `${baseHandle}-${counter}`;
      counter++;
    }
    this.handle = handle;
  }
  next();
});

const SubCategoryModel = mongoose.model("subCategory", subCategorySchema);
export default SubCategoryModel;