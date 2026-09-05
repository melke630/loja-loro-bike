/*import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

export const addCategoryController = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image) {
      return response.status(400).json({
        message: "Todos os campos obrigatórios",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({ name, image });
    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return response.status(500).json({
        message: "Não foi possível criar categoria",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Categoria cadastrada com sucesso",
      data: saveCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (request, response) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });
    return response.json({
      data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCategoryController = async (request, response) => {
  try {
    const { _id, name, image } = request.body;

    if (!_id || !name || !image) {
      return response.status(400).json({
        message: "Todos os campos são obrigatórios",
        error: true,
        success: false,
      });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      _id,
      { name, image },
      { new: true } // retorna o documento atualizado
    );

    if (!updatedCategory) {
      return response.status(404).json({
        message: "Categoria não encontrada",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Categoria atualizada com sucesso",
      success: true,
      error: false,
      data: updatedCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;

    const checkSubCategory = await SubCategoryModel.find({
      category: { $in: [_id] },
    }).countDocuments();

    const checkProduct = await ProductModel.find({
      category: { $in: [_id] },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return response.status(400).json({
        message: "Esta categoria não pode ser deletada pois está em uso",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id });

    return response.json({
      message: "Categoria deletada com sucesso",
      data: deleteCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};*/

import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

// ➕ Criar categoria
export const addCategoryController = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image || image.length === 0) {
      return response.status(400).json({
        message: "Todos os campos obrigatórios",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({ name, image });
    const saveCategory = await addCategory.save();

    return response.json({
      message: "Categoria cadastrada com sucesso",
      data: saveCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// 📥 Listar categorias
export const getCategoryController = async (request, response) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });
    return response.json({
      data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// ✏️ Atualizar categoria
export const updateCategoryController = async (request, response) => {
  try {
    const { _id, name, image } = request.body;

    if (!_id || !name || !image || image.length === 0) {
      return response.status(400).json({
        message: "Todos os campos são obrigatórios",
        error: true,
        success: false,
      });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      _id,
      { name, image },
      { new: true }
    );

    if (!updatedCategory) {
      return response.status(404).json({
        message: "Categoria não encontrada",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Categoria atualizada com sucesso",
      success: true,
      error: false,
      data: updatedCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// 🗑️ Deletar categoria
export const deleteCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;

    const checkSubCategory = await SubCategoryModel.find({
      category: { $in: [_id] },
    }).countDocuments();

    const checkProduct = await ProductModel.find({
      category: { $in: [_id] },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return response.status(400).json({
        message: "Esta categoria não pode ser deletada pois está em uso",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id });

    return response.json({
      message: "Categoria deletada com sucesso",
      data: deleteCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};