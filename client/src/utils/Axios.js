/*import axios from "axios";

import { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default Axios;*/

// src/utils/Axios.js
/*port axios from "axios";
import { baseURL } from "../common/SummaryApi";

// Cria uma instância do Axios com configuração padrão
const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true, // mantém cookies/session
});

// Interceptor de requisição (opcional)
// Adiciona token de autenticação se existir
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ou Redux, conforme seu projeto
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Axios;*/
// src/utils/Axios.js
import axios from "axios";
import { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL,
  withCredentials: true,
 // headers: {
    //"Content-Type": "application/json",
  //},
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Axios;
