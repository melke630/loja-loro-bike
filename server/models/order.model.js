import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    productDetails: {
        type: Array,
        required: true
    },
    totalAmt: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: "CASH ON DELIVERY / PENDENTE" // ou "PAID"
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: "address" // se você tiver modelo de endereço, ou pode ser String
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;