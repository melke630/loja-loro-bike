import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { updatedAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";


const UserProfileAvatarEditar = ({close}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    if(!file){
      return
    }

    const formData = new FormData();
    formData.append('avatar', file);
  
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const {data: responseData} = response;
      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      AxiosToastError(error)
    } finally { 
    setLoading(false);
  }
};

return (
  <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800
   bg-opacity-60 p-4 flex items-center justify-center"
   >
    <div className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-100 via-yellow-100  max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
      <button onClick={close} className="text-neutral-800 w-fit block ml-auto">
        <IoClose size={20}/>
      </button>
      <div className="w-20 h-20 bg-gray-200 flex items-center justify-center
                       rounded-full overflow-hidden drop-shadow-sm"
      >
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="uploadProfile">
          <div
            className="text-sm font-bold cursor-pointer text-white min-w-20 border border-red-600 hover:border-green-600
                     hover:bg-yellow-600 px-3 py-1 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow"
          >
            {
              loading ? "Carregando ..." : "Upload"
            }
          </div>
        </label>
        <input onChange={handleUploadAvatarImage} type="file" id='uploadProfile' className="hidden" />
      </form>
    </div>
  </section>
);
};

export default UserProfileAvatarEditar;
//codigo do copilot
/*import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../utils/Axios";
import { setUserDetails } from "../store/userSlice.js";

const UserProfileAvatarEditar = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await Axios.post("/api/user/upload-avatar", formData);
      dispatch(setUserDetails(response.data.data));
      setLoading(false);
      close();
    } catch (error) {
      console.error("Erro ao enviar avatar:", error);
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-100 max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">

        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avatar ? (
            <img alt={user.name} src={user.avatar} className="w-full h-full" />
          ) : (
            <FaRegUserCircle />
          )}
        </div>

        <label htmlFor="uploadProfile">
          <div className="text-sm font-bold text-white min-w-20 border border-red-600 hover:border-green-600 hover:bg-yellow-600 px-3 py-1 rounded-full mt-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow">
            {loading ? "Carregando..." : "Upload"}
          </div>
        </label>

        <input
          onChange={handleUploadAvatarImage}
          type="file"
          id="uploadProfile"
          className="hidden"
        />
      </div>
    </section>
  );
};

export default UserProfileAvatarEditar;*/