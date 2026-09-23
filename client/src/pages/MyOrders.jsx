import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getOrder // Certifique-se de que essa rota existe no SummaryApi 
            
            });

            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <div className="p-4 text-center">Carregando pedidos...</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Meus Pedidos</h2>
            
            {orders.length === 0 ? (
                <div className="text-gray-500">Nenhum pedido encontrado.</div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order, index) => {
                        return (
                            <div key={order._id + index} className="border p-4 rounded shadow-sm bg-white">
                                <div className="flex justify-between border-b pb-2 mb-2 text-sm text-gray-600">
                                    <span><strong>Pedido ID:</strong> {order.orderId}</span>
                                    <span><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="mb-2">
                                    <p className="text-sm font-semibold">Status do Pagamento: <span className="text-green-600">{order.payment_status}</span></p>
                                    <p className="text-sm font-semibold">Valor Total: R$ {order.totalAmt?.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">Itens:</p>
                                    <div className="space-y-1">
                                        {order.productDetails.map((item, i) => (
                                            <div key={i} className="text-sm flex justify-between bg-gray-50 p-2 rounded">
                                                <span>{item.productId?.name || "Produto"} (Qtd: {item.quantity})</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyOrders;