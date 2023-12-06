import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useMemo, useState } from 'react';
import useProductStore from '../hooks/useProductStore';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import useTableProduct from '../hooks/useTableProduct';
import { FormControlLabel, LinearProgress, Switch, Typography, useMediaQuery } from '@mui/material';





const TableProduct = () => {
    const isTablet = useMediaQuery("(min-width: 768px)");
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { allProducts, startGetProducts, startDeleteProduct, startDeleteProducts } = useProductStore();
    const { getComparator, stableSort } = useTableProduct();
    const [searchValue, setSearchValue] = useState('');
    const [idToDelete, setIdToDelete] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        startGetProducts();
    }, []);


    // Obtener todos los productos
    let products = [];
    if (allProducts) {
        products = allProducts.products;
    };


    // Filtrar productos
    if (searchValue) {
        // No diferencia entre mayusculas y minusculas
        products = products.filter((product) =>
            product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            product.category.toLowerCase().includes(searchValue.toLowerCase())
        );
    };


    
    
    
    
    // Ordenar productos
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';  // Si el orden es ascendente
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    
    // Seleccionar todos los productos
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = products?.map((n) => n._id);    // Agrega todos los productos al array de productos seleccionados
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };



    // eliminar uno o varios productos, dependiendo de si se selecciono uno o varios
    const handleDeleteProduct = async () => {
        try {
            setLoading(true); // Establecer isLoading a true
            if (selected.length === 1) {
                await startDeleteProduct(idToDelete);
                await startGetProducts();
                setSelected([]);
                setIdToDelete(null);
            } else {
                await startDeleteProducts(selected);
                await startGetProducts();
                setSelected([]);
                setIdToDelete(null);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Establecer isLoading a false
        }
    };



    
    // Seleccionar un producto
    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);   // El indice del producto seleccionado
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);   // Agrega el producto seleccionado al array de productos seleccionados
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));    // Si el producto seleccionado es el primero, se elimina del array de productos seleccionados
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));    // Si el producto seleccionado es el ultimo, se elimina del array de productos seleccionados
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),    // Si el producto seleccionado esta en medio del array, se elimina del array de productos seleccionados
            );
        }
        setSelected(newSelected);
        setIdToDelete(_id);
    };




    // Paginacion
    const handleChangePage = (event, newPage) => {
        setSelected([]);
        setPage(newPage);
    };



    // Filas por pagina
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // Densidad de la tabla
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    const isSelected = (_id) => selected.indexOf(_id) !== -1;   // Si el producto esta seleccionado
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage) : 0;    // Aqui se puede cambiar el 1 por el numero de filas que se quieran mostrar


    const visibleRows = useMemo(() => {
        if (!products?.length) return [];

        return stableSort(products, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [products, order, orderBy, page, rowsPerPage]);



    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
            <Typography 
                variant={ isTablet ? "h2" : "h4" } 
                color="text.secondary">
                Inventory List
            </Typography>
            
            <Paper sx={{ width: '100%' }} elevation={5}>
                <TableToolbar
                    value={searchValue}
                    onChange={(evt) => setSearchValue(evt.target.value)}
                    numSelected={selected?.length || 0}
                    onDeleteProduct={ () => handleDeleteProduct() }
                    loading={ loading }
                    setLoading={ setLoading }
                    idSelected={ idToDelete }
                    setIdSelected={ setIdToDelete }
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 600 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}>
                        <TableHeader
                            numSelected={selected?.length || 0}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={products?.length}
                        />
                        <TableBody>
                                {
                                    products?.length > 0 ? (

                                    visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(row._id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row._id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align='right'>{row.category}</TableCell>
                                                <TableCell align='right'>{"$"} {parseFloat(row.price).toFixed(2)}</TableCell>
                                                <TableCell align='right'>{row.quantity}</TableCell>
                                                <TableCell align='right'>{"$"} {parseFloat(row.price * row.quantity).toFixed(2)}</TableCell>
                                            </TableRow>
                                        );
                                    })) :
                                        <TableRow style={{ height:'100px'  }}>
                                            <TableCell colSpan={6} align="center" >
                                                <Typography variant="h6" color="text.secondary">
                                                    No products found
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                            }
                            {
                                loading && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <LinearProgress />
                                        </TableCell>
                                    </TableRow> )
                            }
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,  // Aqui se puede cambiar el 33 por el numero de filas que se quieran mostrar
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
};

export default TableProduct;