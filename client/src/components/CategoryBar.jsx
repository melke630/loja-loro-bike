/*
import { useState } from "react";
import { IoMenuOutline, IoPricetagOutline, IoStarOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { Link } from "react-router-dom";

const CategoryBar = () => {
  const [openCat, setOpenCat] = useState(false);

  return (
    <div className="w-full bg-[#f1f2f2] h-11 flex items-center border-b border-gray-200 sticky top-[64px] lg:top-[72px] z-40">
      <div className="w-full px-3 lg:px-24 flex items-center gap-6 lg:gap-10 text-[14px] font-semibold text-[#2b2b2b]">

        <div className="relative">
          <button onClick={() => setOpenCat(!openCat)} className="flex items-center gap-2 font-bold">
            <IoMenuOutline size={20} /> Categorias <span className="text-xs">▼</span>
          </button>
          {openCat && (
            <div className="absolute left-0 top-9 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-md w-60 py-2 border z-50">
              {["Cama, Mesa e Banho","Eletros","Ferramentas","Panhos e... Fânuta","Funtos Biko"].map(cat => (
                <Link key={cat} to={`/search?q=${cat}`} onClick={()=>setOpenCat(false)} className="block px-4 py-2.5 hover:bg-gray-100 text-[13px]">{cat}</Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/ofertas" className="hidden lg:flex items-center gap-1.5"><IoPricetagOutline /> Ofertas</Link>
        <Link to="/frete-gratis" className="hidden lg:flex items-center gap-1.5"><TbTruckDelivery size={18}/> Frete Grátis</Link>
        <Link to="/novidades" className="hidden lg:flex items-center gap-1.5"><VscSettings /> Novidades</Link>
        <Link to="/ferramentas" className="hidden lg:flex items-center gap-1.5"><IoStarOutline /> Firramentas</Link>
      </div>
    </div>
  )
}
export default CategoryBar; */
// codigo funcional
/*
import { useState } from "react";
import { IoMenuOutline, IoPricetagOutline, IoStarOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { Link } from "react-router-dom";

const CategoryBar = () => {
  const [openCat, setOpenCat] = useState(false);

  return (
    <div className="w-full bg-[#ff8c00] h-11 flex items-center sticky top-[60px] z-40 shadow-sm">
      <div className="w-full max-w-[1520px] mx-auto px-3 lg:px-4 flex items-center gap-6 lg:gap-8 text-[14px] font-bold text-black">

        <div className="relative">
          <button onClick={() => setOpenCat(!openCat)} className="flex items-center gap-2">
            <IoMenuOutline size={20} /> Categorias <span className="text-[10px]">▼</span>
          </button>
          {openCat && (
            <div className="absolute left-0 top-9 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-md w-60 py-2 border z-50 text-[#2b2b2b] font-semibold">
              {["Cama, Mesa e Banho","Eletros","Ferramentas","Papelaria","Cozinha"].map(cat => (
                <Link key={cat} to={`/search?q=${cat}`} onClick={()=>setOpenCat(false)} className="block px-4 py-2.5 hover:bg-gray-100 text-[13px]">{cat}</Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/ofertas" className="hidden lg:flex items-center gap-1.5"><IoPricetagOutline /> Ofertas</Link>
        <Link to="/frete-gratis" className="hidden lg:flex items-center gap-1.5"><TbTruckDelivery size={18}/> Frete Grátis</Link>
        <Link to="/novidades" className="hidden lg:flex items-center gap-1.5"><VscSettings /> Novidades</Link>
        <Link to="/ferramentas" className="hidden lg:flex items-center gap-1.5"><IoStarOutline /> Ferramentas</Link>
      </div>
    </div>
  )
}
export default CategoryBar; */

import { useState } from "react";
import { IoMenuOutline, IoPricetagOutline, IoStarOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { Link } from "react-router-dom";

const CategoryBar = () => {
  const [openCat, setOpenCat] = useState(false);

  return (
    <div className="w-full bg-[#ff8c00] h-11 flex items-center sticky top-[56px] lg:top-[60px] z-40 shadow-none border-0 outline-none -mt-[1px]">
      <div className="w-full max-w-[1520px] mx-auto px-3 lg:px-4 flex items-center gap-6 lg:gap-8 text-[14px] font-bold text-black">

        <div className="relative">
          <button onClick={() => setOpenCat(!openCat)} className="flex items-center gap-2">
            <IoMenuOutline size={20} /> Categorias <span className="text-[10px]">▼</span>
          </button>
          {openCat && (
            <div className="absolute left-0 top-9 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-md w-60 py-2 border z-50 text-[#2b2b2b] font-semibold">
              {["Cama, Mesa e Banho","Eletros","Ferramentas","Papelaria","Cozinha"].map(cat => (
                <Link key={cat} to={`/search?q=${cat}`} onClick={()=>setOpenCat(false)} className="block px-4 py-2.5 hover:bg-gray-100 text-[13px]">{cat}</Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/ofertas" className="hidden lg:flex items-center gap-1.5"><IoPricetagOutline /> Ofertas</Link>
        <Link to="/frete-gratis" className="hidden lg:flex items-center gap-1.5"><TbTruckDelivery size={18}/> Frete Grátis</Link>
        <Link to="/novidades" className="hidden lg:flex items-center gap-1.5"><VscSettings /> Novidades</Link>
        <Link to="/ferramentas" className="hidden lg:flex items-center gap-1.5"><IoStarOutline /> Ferramentas</Link>
      </div>
    </div>
  )
}
export default CategoryBar;