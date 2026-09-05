import SubCategoryModel from "../models/subCategory.model.js"


export const AddSubCategoryController = async (request, response) => {
  try {
    const { name, image, category } = request.body
    //if(!name && !image && !category[0]){
    if (!name || !image || !category[0]) {
      return response.status(400).json({
        message: "DIGITE O NOME, ESCOLHA A FOTO E CATEGORIA",
        error: true,
        success: false
      })
    }

    const payload = {
      name,
      image,
      category
    }
    const createSubCategory = new SubCategoryModel(payload)
    const save = await createSubCategory.save()
    return response.json({
      message: "SUB_CATEGORIA SALVA COM SUCESSO",
      data: save,
      error: false,
      success: true
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
//É O CODIGO QUE A GENTE VAI BUSCAR A IMAGE NO BANCO DE DADOS E FAZER FICAR VISIVEL NA CATE GORIA
export const getSubCategoryController = async (request, response) => {
  try {

    const data = await SubCategoryModel.find().sort({ createdAt: -1 }).populate('category')

    return response.json({
      message: "DADOS DA CATEGORIA",
      data: data,
      error: false,
      success: true
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
//CODIGO DO COPILER
export const updateSubCategoryController = async (request, response) => {
  try {
    const { _id, name, image, category } = request.body;

    const updated = await SubCategoryModel.findByIdAndUpdate(
      _id,
      { name, image, category },
      { new: true } // retorna o documento atualizado
    );

    if (!updated) {
      return response.status(404).json({
        message: "Subcategoria não encontrada",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Subcategoria atualizada com sucesso",
      data: updated,
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

/*export const deleteSubCategoryController = async (request, response) => {
  try {
    const { _id } = request.body
    console.log("Id", _id)
    const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)

    return response.json({
      message: "DELETADO COM SUCESSO",
      data: deleteSub,
      error: false,
      success: true
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}*/
// codigo do copile
export const deleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const deleted = await SubCategoryModel.findByIdAndDelete(_id);

    if (!deleted) {
      return res.status(404).json({
        message: "Subcategoria não encontrada",
        success: false,
        error: true,
      });
    }

    return res.json({
      message: "Deletado com sucesso",
      data: deleted,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
