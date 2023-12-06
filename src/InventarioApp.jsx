import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import AppTheme from "./theme/AppTheme";
import { store } from "./store/store";
//import axios from "axios";
import { ToastContainer } from 'react-toastify';


//axios.defaults.withCredentials = true;  // Esto es para que axios pueda enviar cookies, que es lo que hace el token.


function InventarioApp() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppTheme>
                    <ToastContainer />
                    <AppRouter />
                </AppTheme>
            </BrowserRouter>
        </Provider>
    )
}

export default InventarioApp;
