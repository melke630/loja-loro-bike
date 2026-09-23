import UserModel from "../models/user.model.js";

const admin = async (request, response, next) => {
    try {
        const userId = request.userId;

        const user = await UserModel.findById(userId);

        if (!user || user.role !== 'ADMIN') {
            return response.status(403).json({
                message: "Acesso negado. Apenas administradores.",
                error: true,
                success: false
            });
        }

        next();
    } catch (error) {
        return response.status(500).json({
            message: "Erro ao verificar permissão de administrador.",
            error: true,
            success: false
        });
    }
};

export default admin ;