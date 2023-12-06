import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "./useAuthStore";

const useSessionExpire = ( path ) => {
    const navigate = useNavigate();

    const { accountActive: accountActiveRaw } = useAuthStore();

    // Envuelve accountActive con useCallback
    const accountActive = useCallback(accountActiveRaw, []);
    
    useEffect(() => {
        const redirectExpireUser = async () => {
            const isLoggeIn = await accountActive();

            if ( !isLoggeIn ) {
                toast.info('Tu sesión ha caducado. Por favor, inicia sesión de nuevo.');
                navigate( path );
                return;
            }
        };

        redirectExpireUser();
    }, [navigate, path, accountActive]);
};

export default useSessionExpire;