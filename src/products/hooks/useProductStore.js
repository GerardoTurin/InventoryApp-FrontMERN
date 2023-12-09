import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import inventoryApi from "../../api/inventoryApi";
import { 
        createNewProduct, 
        getProducts, 
        getProductById,
        calcStoreValue, 
        calcTotalCategories, 
        calcTotalLowStock, 
        calcTotalProducts,
        updateProduct,
                            } from "../../store/features/product/productSlice";

const useProductStore = () => {
    const { 
            allProducts, 
            totalValue, 
            totalCategories, 
            totalLowStock, 
            totalProducts, 
            errorMenssage,
                            } = useSelector(state => state.product);
    const dispatch = useDispatch();

    




    const startCreateProduct = async ( formData ) => {
        try {
            const { data } = await inventoryApi.post("/product", formData,
            { withCredentials: true });

            dispatch( createNewProduct(data) );
            toast.success( `Producto creado con éxito.` );

        } catch (error) {
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al crear el producto: ${errorMenssage}`)
        }
    };





    const startGetProducts = async () => {
        try {
            const { data } = await inventoryApi.get("/product",
            { withCredentials: true });

            dispatch( getProducts(data) );
            dispatch( calcStoreValue(data) );
            dispatch( calcTotalCategories(data) );
            dispatch( calcTotalLowStock(data) );
            dispatch( calcTotalProducts(data) );

            return data;
        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            toast.error(`Error al obtener los productos: ${errorMenssage}`)
        }
    };






    const startGetProductById = async ( id ) => {
        try {
            const { data } = await inventoryApi.get(`/product/${id}`,
            { withCredentials: true });
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            toast.error(`Error al obtener el producto: ${errorMenssage}`)
        }
    };






    const startDeleteProduct = async ( id ) => {
        try {
            const { data } = await inventoryApi.delete(`/product/${id}`,
            { withCredentials: true });

            //dispatch( deleteProduct(data) );
            toast.success( `Producto eliminado con éxito.` );
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al eliminar el producto: ${errorMenssage}`)
        }
    };



    const startDeleteProducts = async ( ids ) => {
        try {
            const { data } = await inventoryApi.delete(`/product`,
            { withCredentials: true, data: { ids } });

            //dispatch( eliminarVariosProductos(ids) );
            toast.success( `Productos eliminados con éxito.` );
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al eliminar los productos: ${errorMenssage}`)
        }
    };




    const startUpdateProduct = async ( id, formData ) => {
        try {
            const { data } = await inventoryApi.patch(`/product/${id}`, formData,
            { withCredentials: true });

            dispatch( updateProduct(data) );
            toast.success( `Producto actualizado con éxito.` );

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al actualizar el producto: ${errorMenssage}`)
        }
    };



    return {
        allProducts,
        totalValue,
        totalCategories,
        totalLowStock,
        totalProducts,
        errorMenssage,



        //^ Actions
        startCreateProduct,
        startGetProducts,
        startGetProductById,
        startDeleteProduct,
        startDeleteProducts,
        startUpdateProduct,
    }
}

export default useProductStore;