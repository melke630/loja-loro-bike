// codigo funcional
/*
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import CartProductModel from "../models/cartproduct.model.js"; // auterei de cartproduct.model.js para exportar o modelo corretamente

// Função para simular o pagamento fake e limpar o carrinho corretamente
export async function cashOnDeliveryOrderController(req, res) {
    try {
        const userId = req.userId; // Pego pelo middleware auth
        const { list_items, totalAmt, addressId } = req.body;

        // Validações básicas
        if (!list_items || list_items.length === 0) {
            return res.status(400).json({
                message: "O carrinho está vazio.",
                error: true,
                success: false
            });
        }

        // Gera um ID de pedido fictício
        const fakePaymentId = `FAKED_PAYMENT_${new Date().getTime()}`;
        const fakeOrderId = `ORD_${Math.floor(Math.random() * 1000000)}`;

        // Cria o pedido no banco de dados
        const newOrder = new OrderModel({
            userId: userId,
            orderId: fakeOrderId,
            productDetails: list_items,
            totalAmt: totalAmt,
            paymentId: fakePaymentId,
            payment_status: "PAID (FAKE)", 
            delivery_address: addressId
        });

        const saveOrder = await newOrder.save();

        // 1. Limpa os itens do carrinho na coleção CartProductModel
        await CartProductModel.deleteMany({ userId: userId }); 
        
        // 2. Limpa também no UserModel (caso o projeto use)
        await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

        return res.json({
            message: "Pedido realizado com sucesso! (Pagamento Falso)",
            error: false,
            success: true,
            data: saveOrder
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Função para listar os pedidos do usuário
export async function getOrderController(req, res) {
    try {
        const userId = req.userId; // Pego do token pelo middleware auth

        const orderList = await OrderModel.find({ userId: userId }).sort({ createdAt: -1 });

        return res.json({
            message: "Lista de pedidos obtida com sucesso",
            data: orderList,
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}  */
// codigo do gemine
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import CartProductModel from "../models/cartproduct.model.js";
import ProductModel from "../models/product.model.js"; // <-- Importado para gerenciar o estoque

// Função para simular o pagamento fake, validar/atualizar o estoque e limpar o carrinho
export async function cashOnDeliveryOrderController(req, res) {
    try {
        const userId = req.userId; // Pego pelo middleware auth
        const { list_items, totalAmt, addressId } = req.body;

        // Validações básicas
        if (!list_items || list_items.length === 0) {
            return res.status(400).json({
                message: "O carrinho está vazio.",
                error: true,
                success: false
            });
        }

        // 1. Validação prévia de estoque para todos os itens do carrinho
        for (const item of list_items) {
            // Descobre o ID do produto (dependendo de como o item do carrinho guarda, pode ser item.productId._id ou item.productId)
            const productId = item.productId?._id || item.productId;
            const productName = item.productId?.name || "Produto";

            const product = await ProductModel.findById(productId);

            if (!product) {
                return res.status(404).json({
                    message: `O produto '${productName}' não foi encontrado no sistema.`,
                    error: true,
                    success: false
                });
            }

            // Verifica se a quantidade desejada é maior que o estoque atual
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Estoque insuficiente para '${product.name}'. Disponível: ${product.stock} un.`,
                    error: true,
                    success: false
                });
            }
        }

        // Gera um ID de pedido fictício
        const fakePaymentId = `FAKED_PAYMENT_${new Date().getTime()}`;
        const fakeOrderId = `ORD_${Math.floor(Math.random() * 1000000)}`;

        // Cria o pedido no banco de dados
        const newOrder = new OrderModel({
            userId: userId,
            orderId: fakeOrderId,
            productDetails: list_items,
            totalAmt: totalAmt,
            paymentId: fakePaymentId,
            payment_status: "PAID (FAKE)", 
            delivery_address: addressId
        });

        const saveOrder = await newOrder.save();

        // 2. Dar baixa (descontar) no estoque de cada produto no MongoDB
        for (const item of list_items) {
            const productId = item.productId?._id || item.productId;
            
            await ProductModel.findByIdAndUpdate(productId, {
                $inc: { stock: -item.quantity } // Subtrai a quantidade comprada do estoque
            });
        }

        // 3. Limpa os itens do carrinho na coleção CartProductModel
        await CartProductModel.deleteMany({ userId: userId }); 
        
        // 4. Limpa também no UserModel (caso o projeto use)
        await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

        return res.json({
            message: "Pedido realizado com sucesso! Estoque atualizado.",
            error: false,
            success: true,
            data: saveOrder
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Função para listar os pedidos do usuário
export async function getOrderController(req, res) {
    try {
        const userId = req.userId; // Pego do token pelo middleware auth

        const orderList = await OrderModel.find({ userId: userId }).sort({ createdAt: -1 });

        return res.json({
            message: "Lista de pedidos obtida com sucesso",
            data: orderList,
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}