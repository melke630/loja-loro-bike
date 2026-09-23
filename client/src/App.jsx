/*
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

function App() {

const dispatch = useDispatch()
  const location = useLocation()

  const fetchUser = async()=>{
      const userData = await fetchUserDetails()
      dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    dispatch(setLoadingCategory(true))
      try {
      const response = await Axios({
      ...SummaryApi.getCategory,
      });
      const { data: responseData } = response

      if (responseData.success) {
         dispatch(setAllCategory(responseData.data.sort((a,b) => a.name.localeCompare(b.name))))
      }
    } catch (error) {
    } finally {
      dispatch(setLoadingCategory(false))    
    }
  }

  const fetchSubCategory = async () => {
    try {

        const response = await Axios({
        ...SummaryApi.getSubCategory,
        });
        const { data: responseData } = response

        if (responseData.success) {
          dispatch(setAllSubCategory(responseData.data.sort((a,b) => a.name.localeCompare(b.name))))
        }
    } catch (error) {
    } finally {
    
    }
  }

  useEffect(() => {
    fetchUser();
    fetchCategory()
    fetchSubCategory()
}, []);

  return (
    <>
      <Header />
        <main className="min-h-[85vh]">
        <Outlet />
        </main>
      <Footer />
      <Toaster />
    </>
  );
}  

export default App; */


// Codigo do copilote
/*
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // CORREÇÃO: Trata a busca do usuário para não quebrar a página quando for um visitante anônimo
  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.log("Usuário não logado ou sessão expirada.");
    }
  };

  const fetchCategory = async () => {
    dispatch(setLoadingCategory(true));
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData?.success) {
        dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData?.success) {
        dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
      }
    } catch (error) {
      console.error("Erro ao buscar subcategorias:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App; 

/*
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // 1. Busca os detalhes do usuário logado de forma segura
  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      // Garante que só altera o estado do Redux se a resposta for válida
      if (userData && userData.success && userData.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.log("Visitante anônimo ou sessão expirada.");
    }
  };

  // 2. Busca as categorias do e-commerce
  const fetchCategory = async () => {
    dispatch(setLoadingCategory(true));
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const responseData = response?.data;

      if (responseData?.success && Array.isArray(responseData?.data)) {
        const sortedCategories = [...responseData.data].sort((a, b) =>
          (a?.name || "").localeCompare(b?.name || "")
        );
        dispatch(setAllCategory(sortedCategories));
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  // 3. Busca as subcategorias
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const responseData = response?.data;

      if (responseData?.success && Array.isArray(responseData?.data)) {
        const sortedSubCategories = [...responseData.data].sort((a, b) =>
          (a?.name || "").localeCompare(b?.name || "")
        );
        dispatch(setAllSubCategory(sortedSubCategories));
      }
    } catch (error) {
      console.error("Erro ao carregar subcategorias:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App; */
// codigo gemini corrigido pela milesima vez
/*
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // 1. Busca os detalhes do usuário logado de forma segura
  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData?.success && userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.log("Visitante anônimo ou sessão expirada.");
    }
  };

  // 2. Busca as categorias do e-commerce
  const fetchCategory = async () => {
    dispatch(setLoadingCategory(true));
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const responseData = response?.data;

      if (responseData?.success && Array.isArray(responseData?.data)) {
        const sortedCategories = [...responseData.data].sort((a, b) =>
          (a?.name || "").localeCompare(b?.name || "")
        );
        dispatch(setAllCategory(sortedCategories));
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  // 3. Busca as subcategorias
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const responseData = response?.data;

      if (responseData?.success && Array.isArray(responseData?.data)) {
        const sortedSubCategories = [...responseData.data].sort((a, b) =>
          (a?.name || "").localeCompare(b?.name || "")
        );
        dispatch(setAllSubCategory(sortedSubCategories));
      }
    } catch (error) {
      console.error("Erro ao carregar subcategorias:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App; */
//codigo do gemini
/*
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // 1. Busca os detalhes do usuário logado de forma segura
  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData?.success && userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.log("Visitante anônimo ou sessão expirada.");
    }
  };

  // 2. Busca as categorias do e-commerce
  const fetchCategory = async () => {
    dispatch(setLoadingCategory(true));
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const responseData = response?.data;

      if (responseData?.success && Array.isArray(responseData?.data)) {
        const sortedCategories = [...responseData.data].sort((a, b) => {
          const nameA = a?.name || a?.category || "";
          const nameB = b?.name || b?.category || "";
          return nameA.localeCompare(nameB);
        });
        dispatch(setAllCategory(sortedCategories));
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  // 3. Busca as subcategorias de forma segura
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const responseData = response?.data;

      if (responseData?.success && Array.isArray(responseData?.data)) {
        const sortedSubCategories = [...responseData.data].sort((a, b) => {
          const nameA = a?.name || a?.subCategory || a?.title || "";
          const nameB = b?.name || b?.subCategory || b?.title || "";
          return nameA.localeCompare(nameB);
        });
        
        console.log("Subcategorias carregadas no App.jsx:", sortedSubCategories);
        dispatch(setAllSubCategory(sortedSubCategories));
      }
    } catch (error) {
      console.error("Erro ao carregar subcategorias:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App; */
// codigo do gemini corrigido pela milesima vez
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // 1. Busca os detalhes do usuário logado de forma segura
  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData?.success && userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.log("Visitante anônimo ou sessão expirada.");
    }
  };

  // 2. Busca as categorias do e-commerce
  const fetchCategory = async () => {
    dispatch(setLoadingCategory(true));
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const responseData = response?.data;

      if (responseData?.success && Array.isArray(responseData?.data)) {
        const sortedCategories = [...responseData.data].sort((a, b) => {
          const nameA = a?.name || a?.category || "";
          const nameB = b?.name || b?.category || "";
          return nameA.localeCompare(nameB);
        });
        dispatch(setAllCategory(sortedCategories));
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  // 3. Busca as subcategorias de forma segura
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const responseData = response?.data;

      if (responseData?.success && Array.isArray(responseData?.data)) {
        const sortedSubCategories = [...responseData.data].sort((a, b) => {
          const nameA = a?.name || a?.subCategory || a?.title || "";
          const nameB = b?.name || b?.subCategory || b?.title || "";
          return nameA.localeCompare(nameB);
        });
        
        dispatch(setAllSubCategory(sortedSubCategories));
      }
    } catch (error) {
      console.error("Erro ao carregar subcategorias:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;