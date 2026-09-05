import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserProfileAvatarEditar from "../components/UserProfileAvatarEditar";
//import { useEffect } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";
import toast from "react-hot-toast";

const Profile = () => {
    const user = useSelector((state) => state.user);
    const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
    const [userData,setUserData]= useState({
        name:user.name,
        email:user.email,
        mobile:user.mobile,
    });
    
    const [loading,setLoading]= useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
         name:user.name,
        email:user.email,
        mobile:user.mobile,   
        })
    },[user])

    const handleOnChange = (e)=>{
        const {name,value} = e.target
        setUserData((preve)=>{
            return{
                ...preve,
                [name]:value
            };
        });
    };

    const handleSubmit= async (e) => {
        e.preventDefault()
        try {
          setLoading(true)
          const response =await Axios({
           ...SummaryApi.updateUserDetails,
           data: userData
          })

          const {data: responseData} = response

          if(responseData.success){
            toast.success(responseData.message)
            const userData = await fetchUserDetails()
            dispatch(setUserDetails(userData.data))
          }

        } catch (error) {
          AxiosToastError(error)

        }finally{
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center
            rounded-full overflow-hidden drop-shadow-sm">
                {
                    user.avatar ? (
                        <img alt={user.name} src={user.avatar} className="w-full h-full" />
                    ) : (
                        <FaRegUserCircle />
                    )}
            </div>
            <button onClick={()=>setProfileAvatarEdit(true)}
            className="text-sm font-bold text-white min-w-20 border border-red-600 hover:border-green-600
            hover:bg-yellow-600 px-3 py-1 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow"
            >
            Editar
            </button>
            {
                openProfileAvatarEdit &&(
                    <UserProfileAvatarEditar close={()=>setProfileAvatarEdit(false)}/>// aqui ele colocou (false)
                )
            }
            <form onSubmit={handleSubmit} className="my-4 grid gap-4">
                <div className="grid">
                    <label htmlFor="name"> Nome:</label>
                    <input type="text"
                    id="name"
                    placeholder="Digite seu name"
                    className="py-2 bg-gray-200 outline-none border border-green-600 rounded focus-with:border-red-600 rounded"
                    value={userData.name}
                    name='name'
                    onChange={handleOnChange}
                    required
                    />
                </div>
                <div className="grid">
                    <label htmlFor="mobile"> Email:</label>
                    <input type="text"
                    id="email"
                    placeholder="Digite seu Telefone"
                    className="py-2 bg-gray-200 outline-none border border-green-600 rounded focus-with:border-red-600 rounded"
                    value={userData.email}
                    name='email'
                    onChange={handleOnChange}
                    required
                    />
                </div>
                <div className="grid">
                    <label htmlFor="mobile"> Telefone:</label>
                    <input type="text"
                    id="mobile"
                    placeholder="Digite seu Telefone"
                    className="py-2 bg-gray-200 outline-none border border-green-600 rounded focus-with:border-red-600 rounded"
                    value={userData.mobile}
                    name='mobile'
                    onChange={handleOnChange}
                    required
                    />
                </div>
                 <button 
                className="text-sm font-bold text-white min-w-20 border border-red-600 hover:border-green-600
                hover:bg-yellow-600 px-3 py-1 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow"
                >
                {
                    loading? "Carregando...":"Atualizar Detalhes"
                }
                
            </button>
            </form>
        </div>
    );
};

export default Profile;
