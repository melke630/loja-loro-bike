import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios"

const uploadImage = async (image) => {
    try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await Axios({
    ...SummaryApi.uploadImage,
    data: formData,
    });
    //return response;
    return response.data;
  } catch (error) {
    return error;
  }
};

export default uploadImage; 

/*const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await Axios({
      ...SummaryApi.uploadImage,
      data: formData,
    });

    return response.data; // ✅ retorna só os dados
  } catch (error) {
    throw error;
  }
};
export default uploadImage;*/