{/* codigo original  */}
/*

import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async () => {
    try {
        const response = await Axios ({
        ...SummaryApi.userDetails,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default fetchUserDetails; */
// codigo novo do gemini
import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do usuário:", error);
    // Retorna uma estrutura padrão indicando falha para evitar loops
    return {
      success: false,
      message: error?.response?.data?.message || "Erro no servidor",
      error: true,
    };
  }
};

export default fetchUserDetails;