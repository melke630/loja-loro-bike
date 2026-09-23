import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

// Função para adicionar o endereço
export async function addAddressController(req, res) {
    try {
        const userId = req.userId; // Pego pelo middleware de autenticação
        const { address_line, city, state, pincode, country, mobile } = req.body;

        // Validação básica
        if (!address_line || !city || !state || !pincode || !mobile) {
            return res.status(400).json({
                message: "Por favor, preencha todos os campos obrigatórios.",
                error: true,
                success: false
            });
        }

        // Cria e salva o novo endereço usando o AddressModel
        const newAddress = new AddressModel({
            userId,
            address_line,
            city,
            state,
            pincode,
            country: country || "Brasil",
            mobile
        });

        const saveAddress = await newAddress.save();

        // Opcional: Vincula o ID do endereço no modelo do usuário, se necessário
        await UserModel.updateOne({ _id: userId }, {
            $push: { address_details: saveAddress._id }
        });

        return res.json({
            message: "Endereço cadastrado com sucesso!",
            error: false,
            success: true,
            data: saveAddress // Importante: devolve o objeto criado (com o _id) para o front-end
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}