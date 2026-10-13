// 10/10/2026 
/* 
import React, { useEffect, useState } from "react";
import MyAddress from "../pages/MyAddress";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Address from "../components/Address"; // seu formulário
import toast from "react-hot-toast";

const MyAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchAddress = async () => {
        try {
            const res = await Axios({...SummaryApi.getAddress });
            if (res.data.success) setAddresses(res.data.data);
        } catch (error) { console.log(error) }
    };

    useEffect(() => { fetchAddress() }, []);

    const handleDelete = async (id) => {
        if (!confirm("Excluir esse endereço?")) return;
        try {
            await Axios({...SummaryApi.deleteAddress, data: { _id: id } });
            toast.success("Excluído");
            fetchAddress();
        } catch (error) { toast.error("Erro ao excluir") }
    };

    const handleEdit = (addr) => {
        setEditData(addr);
        setOpen(true);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Meus Endereços</h2>
                <button onClick={() => { setEditData(null); setOpen(true) }} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">+ Novo</button>
            </div>

            <div className="grid gap-3">
                {addresses.map((addr) => (
                    <div key={addr._id} className="border p-4 rounded-xl bg-white flex justify-between">
                        <div className="text-sm">
                            <p className="font-bold">{addr.address_line}, {addr.house_number}</p>
                            <p>{addr.city} - {addr.state} - CEP {addr.pincode}</p>
                            <p>{addr.mobile}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(addr)} className="text-sm bg-gray-100 px-3 py-1 rounded">Editar</button>
                            <button onClick={() => handleDelete(addr._id)} className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded">Excluir</button>
                        </div>
                    </div>
                ))}
            </div>

            {open && (
                <Address
                    editData={editData}
                    onClose={() => { setOpen(false); setEditData(null) }}
                    onSuccessAddress={fetchAddress}
                />
            )}
        </div>
    );
};
export default MyAddress; */

import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Address from "../pages/Address"; // 👈 Aponta diretamente para o Address.jsx das pages
import toast from "react-hot-toast";

const MyAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchAddress = async () => {
        try {
            const res = await Axios({...SummaryApi.getAddress});
            if (res.data.success) setAddresses(res.data.data);
        } catch (error) { 
            console.log(error); 
        }
    };

    useEffect(() => { 
        fetchAddress(); 
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Excluir esse endereço?")) return;
        try {
            await Axios({...SummaryApi.deleteAddress, data: { _id: id } });
            toast.success("Excluído com sucesso");
            fetchAddress();
        } catch (error) { 
            toast.error("Erro ao excluir"); 
        }
    };

    const handleEdit = (addr) => {
        setEditData(addr);
        setOpen(true);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Meus Endereços</h2>
                <button 
                    onClick={() => { setEditData(null); setOpen(true); }} 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition cursor-pointer"
                >
                    + Novo Endereço
                </button>
            </div>

            <div className="grid gap-3">
                {addresses.map((addr) => (
                    <div key={addr._id} className="border p-4 rounded-xl bg-white shadow-sm flex justify-between items-center">
                        <div className="text-sm">
                            <p className="font-bold">{addr.address_line}, {addr.house_number}</p>
                            <p>{addr.city} - {addr.state} - CEP {addr.pincode}</p>
                            <p className="text-gray-600">Tel: {addr.mobile}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(addr)} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded cursor-pointer transition">Editar</button>
                            <button onClick={() => handleDelete(addr._id)} className="text-sm bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded cursor-pointer transition">Excluir</button>
                        </div>
                    </div>
                ))}
            </div>

            {open && (
                <Address
                    editData={editData}
                    onClose={() => { setOpen(false); setEditData(null); }}
                    onSuccessAddress={fetchAddress}
                />
            )}
        </div>
    );
};

export default MyAddress;