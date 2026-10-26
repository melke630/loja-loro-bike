// comentado no dia 20/10/2026
/*
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    /*image: {
      type: String,
      required: true,
    },*/
    /*
    image: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true, // cria automaticamente createdAt e updatedAt
  }
);

const CategoryModel = mongoose.model("category", categorySchema);

export default CategoryModel; */
/*
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: [String],
      required: true,
    },
    // ✅ NOVO - Vindo da Medusa (product-category.ts)
    handle: {
      type: String,
      unique: true,
      sparse: true, // deixa vazio sem dar erro de duplicado
    },
    description: {
      type: String,
      default: "",
    },
    mpath: {
      type: String,
      default: "",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_internal: {
      type: Boolean,
      default: false,
    },
    rank: {
      type: Number,
      default: 0,
    },
    // ✅ Pai da categoria - igual Medusa
    parent_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: null,
    },
    category_children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  {
    timestamps: true, // cria automaticamente createdAt e updatedAt
  }
);

categorySchema.index({ mpath: 1 });
categorySchema.index({ handle: 1 });

const CategoryModel = mongoose.model("category", categorySchema);

export default CategoryModel; */

import mongoose from "mongoose";

const generateHandle = (name) => {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // tira acento: ferramentas -> ferramentas
    .replace(/[^a-z0-9]+/g, "-") // espaço vira -
    .replace(/^-+|-+$/g, ""); // tira - do começo e fim
};

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: [String], required: true },
    handle: { type: String, unique: true, sparse: true },
    description: { type: String, default: "" },
    mpath: { type: String, default: "" },
    is_active: { type: Boolean, default: true },
    is_internal: { type: Boolean, default: false },
    rank: { type: Number, default: 0 },
    parent_category: { type: mongoose.Schema.Types.ObjectId, ref: "category", default: null },
    category_children: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
  },
  { timestamps: true }
);

// ✅ Gera o handle sozinho quando você salvar
categorySchema.pre("save", async function (next) {
  if (!this.handle && this.name) {
    let baseHandle = generateHandle(this.name);
    let handle = baseHandle;
    let counter = 1;
    // Se já existir, coloca -1, -2
    while (await mongoose.model("category").findOne({ handle })) {
      handle = `${baseHandle}-${counter}`;
      counter++;
    }
    this.handle = handle;
  }
  next();
});

const CategoryModel = mongoose.model("category", categorySchema);
export default CategoryModel;