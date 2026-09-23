import React, { useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import UserMenuMobile from "../pages/UserMenuMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user?.user || state?.user);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openUserMenuMobile, setOpenUserMenuMobile] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  return (
    <header className="h-24 lg:h-20 bg-gradient-to-r from-red-400 via-yellow-300 to-yellow-100 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="w-full px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-3 items-center justify-between">
          
          {/* Coluna 1: Logo */}
          <div className="flex items-center">
            <Link to={"/"} className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="hidden lg:block h-16 w-auto object-contain -mt-1 contrast-125 drop-shadow-sm"
              />
              <img
                src={logo}
                alt="logo"
                className="lg:hidden h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Coluna 2: Search Desktop */}
          <div className="hidden lg:flex justify-center w-full">
            <div className="w-full max-w-md">
              <Search />
            </div>
          </div>

          {/* Coluna 3: Área de usuário e Carrinho */}
          <div className="flex items-center justify-end gap-4 lg:gap-6">
            
            {/* CARRINHO - Agora visível em todas as telas */}
            <Link
              to="/cart"
              className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 via-orange-600 to-yellow-500 px-3 py-2 lg:px-4 rounded-lg text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              <div className="animate-bounce">
                <BsCart4 size={20} className="lg:w-6 lg:h-6" />
              </div>
              <div className="font-semibold text-xs lg:text-sm">Meu Carrinho</div>
            </Link>

            {/* Botão mobile de usuário */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={() => {
                if (!user?._id) {
                  navigate("/login", { state: { openUserMenuAfterLogin: true } });
                  return;
                }
                setOpenUserMenuMobile(true);
              }}
            >
              <FaRegCircleUser size={26} />
            </button>

            {/* Painel mobile */}
            {openUserMenuMobile && (
              <div className="fixed inset-0 bg-white z-50">
                <UserMenuMobile close={() => setOpenUserMenuMobile(false)} />
              </div>
            )}

            {/* Desktop User (Apenas o menu de conta e botão Entrar ficam restritos ao desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex select-none items-center gap-1 cursor-pointer font-medium text-slate-800"
                  >
                    <p>Minha conta</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={22} className="text-black" />
                    ) : (
                      <GoTriangleDown size={22} className="text-black" />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 rounded-lg p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-base font-medium px-2 text-slate-800 hover:text-black"
                >
                  Entrar
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* Search mobile */}
      <div className="container mx-auto px-4 lg:hidden pb-1">
        <Search />
      </div>
    </header>
  );
};

export default Header;