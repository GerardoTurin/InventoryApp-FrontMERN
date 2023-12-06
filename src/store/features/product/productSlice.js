import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProducts: {},
    errorMenssage: null,
    totalValue: 0,
    totalCategories: 0,
    totalLowStock: 0,
    totalProducts: 0,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        calcStoreValue: (state, { payload }) => {
            state.totalValue = payload.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        },
        calcTotalCategories: (state, { payload }) => {
            state.totalCategories = [...new Set(payload.products.map((product) => product.category))].length;
        },
        calcTotalLowStock: (state, { payload }) => {
            state.totalLowStock = payload.products.filter((product) => product.quantity < 5).length;
        },
        calcTotalProducts: (state, { payload }) => {
            state.totalProducts = payload.products.length;
        },
        onActiveProduct: (state, { payload }) => {
            state.activeProduct = payload;
        },
        createNewProduct: (state, { payload }) => {
            state.allProducts.products.push(payload);
        },
        getProducts: (state, { payload }) => {
            state.allProducts = payload 
        },
        getProductById: (state, { payload }) => {
            state.allProducts = payload;
        },
        deleteProduct: (state, ) => {
            state.allProducts = state.allProducts.products.filter( product => product.id !== state.activeProduct.id );  //^ Se filtran todos los productos, excepto el de la nota activa.
        },
        eliminarVariosProductos: (state, { payload }) => {
            state.allProducts = state.allProducts.products.filter( product => !payload.includes(product.id) );  //^ Se filtran todos los productos, excepto los que estan en el payload.
        },
        updateProduct: (state, { payload }) => {
            state.allProducts = state.allProducts.products.map((product) => {
                if (product.id === payload.id) {
                    return payload;
                } else {
                    return product;
                }
            });
        },
    },
});

export const { 
                createNewProduct, 
                getProducts, 
                getProductById,
                onActiveProduct,
                calcStoreValue, 
                calcTotalCategories, 
                calcTotalLowStock, 
                calcTotalProducts,
                deleteProduct,
                updateProduct
                                } = productSlice.actions;