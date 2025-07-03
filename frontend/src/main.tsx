import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import store from "./redux/store"; // Ensure the correct path to your store
import { Toaster } from 'sonner';


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
)
