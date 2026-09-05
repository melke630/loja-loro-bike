/*import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './route/index.jsx';
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);*/

// codigo do copile
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './route/index.jsx';
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { GlobalProvider } from "./provider/GlobalProvider"; // importa o contexto

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </Provider>
  </StrictMode>
);
