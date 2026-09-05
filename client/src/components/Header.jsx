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
import UserMenuMobile from "../pages/UserMenuMobile"; // 👈 importa o painel mobile

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openUserMenuMobile, setOpenUserMenuMobile] = useState(false); // 👈 novo estado

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
   }
   navigate("/login");
  };

  return (
    <header className="h-24 lg:h-20 bg-gradient-to-r from-red-400 via-yellow-300 to-yellow-100 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/* Logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              {/* Logo desktop */}
              <img
                src={logo}
                width={200}
                height={20}
                alt="logo"
                className="hidden lg:block "
              />
              {/* Logo mobile */}
              <img
                src={logo}
                width={50}
                height={20}
                alt="logo"
                className="lg:hidden "
              />
            </Link>
          </div>

          {/* Search desktop */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Área de usuário */}
          <div>
            {/* Botão mobile */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={() => {
                if(!user?._id) {
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

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex select-none items-center gap-1 cursor-pointer"
                  >
                    <p>Minha conta</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} className="text-black" />
                    ) : (
                      <GoTriangleDown size={25} className="text-black" />
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
                  className="text-lg px-2"
                >
                  Entrar
                </button>
              )}

              {/* Carrinho */}
              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 via-orange-600 to-yellow-500 px-3 py-2 rounded text-white"
              >
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold text-sm">Meu Carrinho</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search mobile */}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;