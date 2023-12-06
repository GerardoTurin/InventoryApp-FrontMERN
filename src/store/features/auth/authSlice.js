import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'no-registrado', // checking, autenticado, no-registrado, registrado
    user: {},
    errorMenssage: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkLogin: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMenssage = null;
        },
        checkRegister: (state) => {
            state.status = 'registrado';
            state.user = {};
            state.errorMenssage = null;
        },
        onLogin: (state, { payload }) => {
            state.status = 'autenticado';
            state.user = payload;
            state.errorMenssage = null;
        },
        onActiveAccount: (state, { payload }) => {
            state.status = 'active';
            state.user = payload;
            state.errorMenssage = null;
        },
        onLogout: (state, { payload }) => {
            state.status = 'no-registrado';
            state.user = {};
            if ( payload ) {    //^ Si el payload existe, es porque se está llamando a la acción onLogout desde el catch de una petición http.
                state.errorMenssage = payload;
            };
        },
        onUpdateUser: (state, { payload }) => {
            state.user = payload;
        },
        clearError: (state) => {
            state.errorMenssage = null;
        }
    },
});

export const { checkLogin, checkRegister, onLogin, onLogout, onActiveAccount, onUpdateUser ,clearError } = authSlice.actions;