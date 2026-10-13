/*
import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";

const Address = ({ onClose, onSuccessAddress }) => {
    const [data, setData] = useState({
        address_line: "",
        house_number: "", // Novo campo para o número
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: ""
    });

    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Se quiser juntar o número com a rua antes de mandar para o backend (caso o banco espere apenas address_line):
            // const fullAddress = `${data.address_line}, Nº ${data.house_number}`;
            
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: data
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message || "Endereço cadastrado com sucesso!");
                
                const createdAddressId = responseData.data?._id;

                if (onSuccessAddress) {
                    onSuccessAddress(createdAddressId); 
                }
                
                if (onClose) {
                    onClose(); 
                } else {
                    setData({
                        address_line: "",
                        house_number: "",
                        city: "",
                        state: "",
                        pincode: "",
                        country: "",
                        mobile: ""
                    });
                    window.location.reload(); 
                }
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black/60 fixed inset-0 flex justify-center items-center z-50 p-4 overflow-y-auto">
            {/* Aumentado de max-w-lg para max-w-2xl para ficar bem mais largo e confortável 
            <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-2xl relative my-8">
                
                {/* Botão de Fechar (X) no topo direito 
                <button 
                    onClick={onClose ? onClose : () => window.history.back()}
                    className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                    <IoClose size={24} />
                </button>

                <h2 className="font-bold text-xl mb-6 text-slate-800 border-b pb-2">Informe seu Endereço de Entrega</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Rua ocupa 2 colunas 
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Rua / Avenida / Bairro:</label>
                            <input
                                type="text"
                                id="address_line"
                                name="address_line"
                                value={data.address_line}
                                onChange={handleOnChange}
                                required
                                className="border p-3 rounded-lg w-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-800 text-sm"
                                placeholder="Ex: Rua das Flores, Centro"
                            />
                        </div>

                        {/* Campo Número da Casa 
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Número:</label>
                            <input
                                type="text"
                                id="house_number"
                                name="house_number"
                                value={data.house_number}
                                onChange={handleOnChange}
                                required
                                className="border p-3 rounded-lg w-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-800 text-sm"
                                placeholder="Ex: 123 ou S/N"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Cidade:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={data.city}
                                onChange={handleOnChange}
                                required
                                className="border p-3 rounded-lg w-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-800 text-sm"
                                placeholder="Ex: São Paulo"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Estado:</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={data.state}
                                onChange={handleOnChange}
                                required
                                className="border p-3 rounded-lg w-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-800 text-sm"
                                placeholder="Ex: SP"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">CEP:</label>
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                value={data.pincode}
                                onChange={handleOnChange}
                                required
                                className="border p-3 rounded-lg w-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-800 text-sm"
                                placeholder="Ex: 00000-000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Telefone de Contato:</label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={data.mobile}
                                onChange={handleOnChange}
                                required
                                className="border p-3 rounded-lg w-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-800 text-sm"
                                placeholder="Ex: (99) 99999-9999"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                        <button
                            type="button"
                            onClick={onClose ? onClose : () => window.history.back()}
                            className="px-5 py-2.5 bg-gray-200 text-slate-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors disabled:opacity-50 text-sm shadow-md"
                        >
                            {loading ? "Salvando..." : "Salvar Endereço"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Address; */

// codigo do dia 09/10/2026 pagina funcional
/*
import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";

const Address = ({ onClose, onSuccessAddress }) => {
    const [data, setData] = useState({
        address_line: "",
        house_number: "",
        city: "",
        state: "",
        pincode: "",
        country: "Brasil",
        mobile: ""
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({...prev, [name]: value }));
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            window.history.back();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
              ...SummaryApi.createAddress,
                data: data
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message || "Endereço cadastrado com sucesso!");
                if (onSuccessAddress) onSuccessAddress(responseData.data?._id);
                handleClose();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-white md:bg-black/60 z-[9999] flex flex-col md:justify-center md:items-center md:p-4">
            <div className="bg-white w-full h-[100dvh] md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-xl flex flex-col shadow-2xl">
                <div className="flex justify-between items-center p-4 border-b shrink-0">
                    <h2 className="font-bold text-lg text-slate-800">Endereço de Entrega</h2>
                    <button type="button" onClick={handleClose} className="p-2 bg-slate-100 rounded-full">
                        <IoClose size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5" id="address-form">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold mb-1">Rua / Avenida / Bairro:</label>
                                <input type="text" name="address_line" value={data.address_line} onChange={handleOnChange} autoComplete="off" required className="border-2 p-4 rounded-lg w-full bg-white text-[16px] focus:border-green-500 outline-none" placeholder="Rua das Flores" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Número:</label>
                                <input type="text" name="house_number" value={data.house_number} onChange={handleOnChange} autoComplete="off" required className="border-2 p-4 rounded-lg w-full bg-white text-[16px] focus:border-green-500 outline-none" placeholder="123" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-bold mb-1">Cidade:</label>
                                <input type="text" name="city" value={data.city} onChange={handleOnChange} autoComplete="off" required className="border-2 p-4 rounded-lg w-full bg-white text-[16px] focus:border-green-500 outline-none" placeholder="Tucuruí" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Estado:</label>
                                <input type="text" name="state" value={data.state} onChange={handleOnChange} autoComplete="off" required className="border-2 p-4 rounded-lg w-full bg-white text-[16px] focus:border-green-500 outline-none" placeholder="PA" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-bold mb-1">CEP:</label>
                                <input type="text" name="pincode" value={data.pincode} onChange={handleOnChange} autoComplete="off" required className="border-2 p-4 rounded-lg w-full bg-white text-[16px] focus:border-green-500 outline-none" placeholder="68458-000" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Telefone:</label>
                                <input type="tel" name="mobile" value={data.mobile} onChange={handleOnChange} autoComplete="off" required className="border-2 p-4 rounded-lg w-full bg-white text-[16px] focus:border-green-500 outline-none" placeholder="(94) 99999-9999" />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t bg-white shrink-0 pb-8 md:pb-4 fixed bottom-0 left-0 right-0 md:static">
                    <div className="flex gap-3 max-w-2xl mx-auto w-full">
                        <button type="button" onClick={handleClose} className="flex-1 py-4 bg-gray-200 rounded-xl font-bold">
                            Cancelar
                        </button>
                        <button form="address-form" type="submit" disabled={loading} className="flex-[2] py-4 bg-green-600 text-white rounded-xl font-bold disabled:opacity-50">
                            {loading? "Salvando..." : "Salvar Endereço"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address; */

import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";

const Address = ({ onClose, onSuccessAddress, editData = null }) => {
    const [data, setData] = useState({
        address_line: editData?.address_line || "",
        house_number: editData?.house_number || "",
        city: editData?.city || "",
        state: editData?.state || "",
        pincode: editData?.pincode || "",
        country: "Brasil",
        mobile: editData?.mobile || ""
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({...prev, [name]: value }));
    };

    const handleClose = () => {
        if (onClose) onClose();
        else window.history.back();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const api = editData? SummaryApi.updateAddress : SummaryApi.createAddress;
            const payload = editData? {...data, _id: editData._id } : data;

            const response = await Axios({...api, data: payload });
            if (response.data.success) {
                toast.success(editData? "Endereço atualizado!" : "Endereço cadastrado!");
                if (onSuccessAddress) onSuccessAddress();
                handleClose();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-white md:bg-black/60 z-[9999] flex flex-col md:justify-center md:items-center md:p-4">
            <div className="bg-white w-full h-[100dvh] md:h-auto md:max-w-2xl md:rounded-xl flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="font-bold text-lg">{editData? "Editar Endereço" : "Novo Endereço"}</h2>
                    <button type="button" onClick={handleClose} className="p-2 bg-slate-100 rounded-full"><IoClose size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <form onSubmit={handleSubmit} className="space-y-4" id="address-form">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold mb-1">Rua / Bairro:</label>
                                <input type="text" name="address_line" value={data.address_line} onChange={handleOnChange} required className="border-2 p-4 rounded-lg w-full text-[16px]" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Número:</label>
                                <input type="text" name="house_number" value={data.house_number} onChange={handleOnChange} required className="border-2 p-4 rounded-lg w-full text-[16px]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-sm font-bold mb-1">Cidade:</label><input type="text" name="city" value={data.city} onChange={handleOnChange} required className="border-2 p-4 rounded-lg w-full text-[16px]" /></div>
                            <div><label className="block text-sm font-bold mb-1">Estado:</label><input type="text" name="state" value={data.state} onChange={handleOnChange} required className="border-2 p-4 rounded-lg w-full text-[16px]" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-sm font-bold mb-1">CEP:</label><input type="text" name="pincode" value={data.pincode} onChange={handleOnChange} required className="border-2 p-4 rounded-lg w-full text-[16px]" /></div>
                            <div><label className="block text-sm font-bold mb-1">Telefone:</label><input type="tel" name="mobile" value={data.mobile} onChange={handleOnChange} required className="border-2 p-4 rounded-lg w-full text-[16px]" /></div>
                        </div>
                    </form>
                </div>
                <div className="p-4 border-t fixed bottom-0 left-0 right-0 md:static bg-white">
                    <div className="flex gap-3 max-w-2xl mx-auto">
                        <button type="button" onClick={handleClose} className="flex-1 py-4 bg-gray-200 rounded-xl font-bold">Cancelar</button>
                        <button form="address-form" type="submit" disabled={loading} className="flex-[2] py-4 bg-green-600 text-white rounded-xl font-bold">{loading? "Salvando..." : editData? "Atualizar" : "Salvar"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Address;