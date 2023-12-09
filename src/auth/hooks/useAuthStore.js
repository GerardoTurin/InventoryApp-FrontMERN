import { useDispatch, useSelector } from "react-redux";
import inventoryApi from "../../api/inventoryApi";
import { checkLogin, checkRegister,  clearError, onActiveAccount, onLogin, onLogout, onUpdateUser } from "../../store/features/auth/authSlice";
import { toast } from "react-toastify";

const useAuthStore = () => {
    const { status, user, errorMenssage } = useSelector(state => state.auth);
    const dispatch = useDispatch();



    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    //^ Expresión regular para validar un email

        return re.test(email);  //^ Devuelve true o false
    };


    const validateCokkies = () => {
        if (!document.cookie.includes('token')) { //^ Si no existe la cookie token,
            return false
        } else {
            return true;
        }
    };



    const startRegister = async ({ name, email, password }) => {
        dispatch( checkRegister() );
        
        try {
            const { data } = await inventoryApi.post("/user/register", { name, email, password },
            { withCredentials: true });

            toast.success( `Gracias por registrarte ${ data.name }, ahora revisa tu correo para confirmar tu cuenta.` );

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            dispatch( onLogout( errorMenssage ) ); //^ Si el error tiene un mensaje, lo mostramos, sino, mostramos un mensaje genérico.
            toast.error(`Error de registro: ${ errorMenssage }`);
            
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };



    const startConfirmAccount = async (token) => {
        //dispatch(checkLogin());


        try {
            const { data } = await inventoryApi.get(`/user/register/confirm/${ token }`,
            { withCredentials: true });
            
            //dispatch( onLogin({ name: data.name, uid: data._id }) );
            //dispatch( onActiveAccount({ name: data.name, uid: data._id, email: data.email, phone: data.phone, photo: data.photo }) );
            toast.success( `Tu cuenta ha sido confirmada, ahora puedes iniciar sesión.` );
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            dispatch( onLogout( errorMenssage ) ); //^ Si el error tiene un mensaje, lo mostramos, sino, mostramos un mensaje genérico.
            toast.error(`Error al confirmar la cuenta: ${errorMenssage}`)
            
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };




    const startLogin = async ({ email, password }) => {
        dispatch( checkLogin() );
        
        try {
            const { data } = await inventoryApi.post("/user/login", { email, password },
            { withCredentials: true });
            
            dispatch( onLogin({ name: data.name, uid: data._id }) );
            dispatch( onActiveAccount({ name: data.name, uid: data._id, email: data.email, phone: data.phone, photo: data.photo }) );
            toast.success( `Bienvenido ${ data.name }.` );

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            dispatch( onLogout(errorMenssage) ); //^ Si el error tiene un mensaje, lo mostramos, sino, mostramos un mensaje genérico.
            toast.error(`Error al iniciar sesión: ${errorMenssage}`);
            
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };



    const accountActive = async () => {
        /* if (!document.cookie.includes('token')) { //^ Si no existe la cookie token,
            return false;
        } */

        try {
            
            const { data } = await inventoryApi.get(`/user/loggedin`,
            { withCredentials: true });
            
            if ( !data ) {
                dispatch( onLogout() );
                return false;
            }

            dispatch( onActiveAccount({ name: data.name, uid: data._id, email: data.email, phone: data.phone, photo: data.photo }) );
            return true;

            
            
        } catch (error) {
            console.log(error);
        }
    };




    const startGetUserById = async (uid) => {
        try {
            const { data } = await inventoryApi.get(`/user/${ uid }`,
            { withCredentials: true });

            return data;

        } catch (error) {
            console.log(error);
        }
    };






    const startUpdateUser = async ( formData ) => {
        try {
            const { data } = await inventoryApi.patch(`/user/updateuser`, formData,
            { withCredentials: true });

            toast.success('User updated successfully');
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';

            toast.error(`Error al actualizar los datos: ${errorMenssage}`);
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };



    const startChangePassword = async ( formData ) => {
        try {
            const { data } = await inventoryApi.patch(`/user/changepassword`, formData,
            { withCredentials: true });

            toast.success('Password changed successfully');
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            toast.error(`Error al actualizar los datos: ${errorMenssage}`);
            
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };







    const startLogout = async () => {

        try {
            await inventoryApi.get("/user/logout",{ withCredentials: true });
            dispatch( onLogout() );

        } catch (error) {
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al cerrar sesión: ${errorMenssage}`);
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };



    const startContact = async (formData) => {
        try {
            await inventoryApi.post("/contact", formData,
            { withCredentials: true });

            toast.success( `Gracias por contactarnos, te responderemos lo más pronto posible.` );

        } catch (error) {
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al enviar el mensaje: ${errorMenssage}`);
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };





    const forgotPassword = async (email) => {
            
            try {
                await inventoryApi.post("/user/forgot-password", { email },
                { withCredentials: true });
    
                toast.success( `Se ha enviado un correo a ${ email } para restablecer tu contraseña.` );
    
            } catch (error) {
                const errorMenssage = error.response?.data.msg || 'Error inesperado';
                
                toast.error(`Error al restablecer la contraseña: ${errorMenssage}`);
                setTimeout(() => {
                    dispatch( clearError() );
                }, 100);
            }
    };




    const startResetPassword = async (token, password) => {

        try {
            await inventoryApi.put(`/user/reset-password/${ token }`, { password },{ withCredentials: true });
            toast.success( `Tu contraseña ha sido restablecida.` );

        } catch (error) {
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al restablecer la contraseña: ${errorMenssage}`);
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };




    return {

        //^ Propiedades
        status,
        user,
        errorMenssage,


        //^ Métodos
        startRegister,
        validateEmail,
        startConfirmAccount,
        startLogout,
        startLogin,
        forgotPassword,
        startResetPassword,
        accountActive,
        startUpdateUser,
        startGetUserById,
        startContact,
        startChangePassword,
        validateCokkies,
        
    }
};

export default useAuthStore;