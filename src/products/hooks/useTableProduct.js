
const useTableProduct = () => {

    // Funciones para ordenar los productos, se usa en la funcion de abajo
    const getComparator = (order, orderBy) => {
        return (a, b) => {
            if (orderBy === 'category') {
                return order === 'asc'
                    ? a.category.localeCompare(b.category)
                    : b.category.localeCompare(a.category);
            } else if (orderBy === 'price') {
                return order === 'asc'
                    ? a.price - b.price
                    : b.price - a.price;
            } else if (orderBy === 'name') {
                return order === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (orderBy === 'quantity') {
                return order === 'asc'
                    ? a.quantity - b.quantity
                    : b.quantity - a.quantity;
            } else if (orderBy === 'value') {
                return order === 'asc'
                    ? (a.price * a.quantity) - (b.price * b.quantity)
                    : (b.price * b.quantity) - (a.price * a.quantity);
            }
        };
    };
    
    


    // Funciones para ordenar los productos, se usa en la funcion de abajo
    const stableSort = (array, comparator) => {
        const stabilizedThis = array?.map((el, index) => [el, index]);
        stabilizedThis?.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }

            return a[1] - b[1];
        });

        return stabilizedThis?.map((el) => el[0]);
    };

    


    return { getComparator, stableSort }
};

export default useTableProduct;