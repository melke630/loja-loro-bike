import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";// talves vou ter que remover o useNavigate
import Divider from "./Divider";
import SummaryApi from '../common/SummaryApi'
import Axios from "../utils/Axios";
import { logout } from "../store/userSlice";
import AxiosToastError from '../utils/AxiosToastError'
import toast from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";



const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  console.log("User no Redux:", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        /*if (response.data.success) {
         close();
         dispatch(logout());
         toast.success(response.data.message)
        }*/
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close()
    }
  }

  return (
    <div>
      <div className="font-semibold">Minha conta</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile} <span>{user.role === "ADMIN" ? "[Admin]" : ""}</span>
        </span>
        <Link onClick={handleClose} to={"/dashboard/profile"} className="hover:text-green-600" >
          <HiOutlineExternalLink size={20} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-2 ">
        {isAdmin(user.role) && (
          <Link onClick={handleClose}
            to={"/dashboard/category"} className="px-2 hover:bg-gradient-to-r 
        from-orange-300 via-orange-600">
            categoria
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link onClick={handleClose}
            to={"/dashboard/subcategory"} className="px-2 hover:bg-gradient-to-r 
        from-orange-300 via-orange-600">
            Sub Categoria
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link onClick={handleClose}
            to={"/dashboard/upload-product"} className="px-2 hover:bg-gradient-to-r 
        from-orange-300 via-orange-600">
            Carregar Produtos
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link onClick={handleClose}
            to={"/dashboard/product"} className="px-2 hover:bg-gradient-to-r 
        from-orange-300 via-orange-600">
            Produto
          </Link>
        )}

        <Link onClick={handleClose}
          to={"/dashboard/myorders"} className="px-2 hover:bg-gradient-to-r 
        from-orange-300 via-orange-600">
          Meus Pedidos
        </Link>

        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-gradient-to-r 
        from-orange-300 via-orange-600">
          Salvar Endereço
        </Link>
        {
          user.role === "ADMIN" && (
            <Link
              to="/dashboard/banners"
              className="px-2 py-1 hover:bg-orange-200 rounded transition"
            >
              Banners do Carrossel
            </Link>
          )
        }
    

        <button
          onClick={handleLogout}
          className="text-left font-semibold bg-gradient-to-r  
        from-orange-300 via-orange-600 text-center text-white text-lg rounded-lg py-2 px-2"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default UserMenu;