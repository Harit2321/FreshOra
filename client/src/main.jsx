import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './route/index';
import { Provider } from 'react-redux';
import { store } from './store/store';
import GlobalProvider from './provider/GlobalProvider'; // ✅ Import here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalProvider>  {/* ✅ Now context will be available */}
        <RouterProvider router={router} />
      </GlobalProvider>
    </Provider>
  </StrictMode>
);
