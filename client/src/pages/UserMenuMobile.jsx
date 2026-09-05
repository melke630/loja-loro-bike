import React from "react";
import UserMenu from "../components/UserMenu";
import { IoClose } from "react-icons/io5";

const UserMenuMobile = ({ close }) => {
  return (
    <section className="h-full w-full py-8 py-2">
      {/* Botão de fechar */}
      <button
        onClick={close}
        className="text-neutral-800 block w-fit ml-auto mt-3"
      >
        <IoClose size={25} />
      </button>

      {/* Conteúdo do menu */}
      <div className="container mx-auto p-3 pb-8">
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 rounded-lg p-4 shadow-lg">
          <UserMenu close={close} />
        </div>
      </div>

    </section>
  );
}; 

export default UserMenuMobile;

/*import React from 'react';
import UserMenu from '.../components/UserMenu';
import { IoClose } from 'react-icons/io5';

const UserMenuMobile = () => {
  return
  <section className='h-full w-full py-8 py-2'>
    <button onClick={() => window.history.back()} className='text-neutral-800 block w-fit ml-auto mt-3'>
      <IoClose size={25} />
    </button>
    <div className='cointainer max-auto p-3 pb-8'>
      <UserMenu />
    </div>
  </section>

  export default UserMenuMobile;*/