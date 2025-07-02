import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import store from "./redux/store"; // Ensure the correct path to your store
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner';

const persistor = persistStore(store); 
//To maintain different levels of states changes that takes place


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
)
