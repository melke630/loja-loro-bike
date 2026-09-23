const ProductModel = require('../models/product.model'); // Ajuste o caminho do seu model se necessário

const searchProduct = async (request, response) => {
    try {
        let { search } = request.body;

        // Cria um filtro de busca flexível (ignora maiúsculas/minúsculas)
        const query = search ? {
            name: { $regex: search, $options: "insensitive" }
        } : {};

        const products = await ProductModel.find(query);

        return response.json({
            message: "Produtos encontrados com sucesso",
            error: false,
            success: true,
            data: products
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = {
    searchProduct,
    // ... seus outros controllers existentes
};