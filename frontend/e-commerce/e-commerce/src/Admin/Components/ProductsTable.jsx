import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Pagination,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../state/Product/Action';
import EditProductForm from './EditProductForm'; // New form component

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null); // store product to edit
  const rowsPerPage = 5;

  useEffect(() => {
    dispatch(findProducts({
      category: '',
      colors: [],
      size: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      stock: '',
      pageNumber: page - 1,
      pageSize: rowsPerPage,
    }));
  }, [dispatch, page, products?.deletedProduct]);

  const handlePageChange = (event, value) => setPage(value);

  const handleProductDelete = (productId) => dispatch(deleteProduct(productId));

  const handleEditClick = (product) => setEditingProduct(product); // Open edit form

  const allProducts = products?.content || [];
  const totalPages = products?.totalPages || 1;

  console.log("in  product table",allProducts)
  return (
    <div className="p-2 sm:p-6">
      <Card sx={{ bgcolor: '#111729', color: '#F4F6FB', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardHeader title="All Products" titleTypographyProps={{ sx: { fontFamily: 'Sora, sans-serif', fontWeight: 700 } }} />
        <TableContainer>
          <Table sx={{ minWidth: 650, '& .MuiTableCell-root': { color: '#D0D7E6', borderColor: 'rgba(255,255,255,0.08)' } }}>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { color: '#4F7CFF', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 } }}>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts.map((item) => (
                <TableRow key={item.id} sx={{ '&:hover': { bgcolor: 'rgba(79,124,255,0.06)' } }}>
                  <TableCell><Avatar src={item.imageUrl || null} /></TableCell>
                  <TableCell sx={{ color: '#fff !important' }}>{item.title}</TableCell>
                  <TableCell>{item.category?.name}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                  <IconButton onClick={() => handleEditClick(item)}>
                  <EditIcon sx={{ color: '#4F7CFF' }} />
</IconButton>
<IconButton onClick={() => handleProductDelete(item.id)}>
  <DeleteIcon sx={{ color: '#F87171' }} />
</IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Stack spacing={2} className="py-5 flex justify-center items-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              sx={{ '& .MuiPaginationItem-root': { color: '#D0D7E6', borderColor: 'rgba(255,255,255,0.15)' }, '& .Mui-selected': { bgcolor: '#4F7CFF !important', color: '#fff' } }}
            />
          </Stack>
        )}
      </Card>

      {/* Edit Form Modal */}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsTable;
