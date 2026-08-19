import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../state/Product/Action';

const ProductTableView = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  const [page, setPage] = useState(1);
  const rowsPerPage = 2;

  // Fetch products whenever the page changes
  useEffect(() => {
    const data = {
      category: 'mens_kurta', // adjust if needed
      colors: [],
      size: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      stock: '',
      pageNumber: page - 1,
      pageSize: rowsPerPage,
    };
    dispatch(findProducts(data));
  }, [dispatch, page]);

  // Handle pagination click
  const handlePageChange = (event, value) => {
    if (value !== page) {
      setPage(value);
    }
  };

  // Safely access products data
  const allProducts = products?.content || [];
  const totalPages = products?.totalPages || 1;

  console.log('ProductTableView -> products:', products);

  return (
    <div className="p-2 sm:p-5">
      <Card sx={{ mt: 2, bgcolor: '#111729', color: '#F4F6FB', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardHeader title="Recent Products" titleTypographyProps={{ sx: { fontFamily: 'Sora, sans-serif', fontWeight: 700 } }} />
        <TableContainer>
          <Table sx={{ minWidth: 650, '& .MuiTableCell-root': { color: '#D0D7E6', borderColor: 'rgba(255,255,255,0.08)' } }} aria-label="product table">
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { color: '#4F7CFF', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 } }}>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts.map((item) => (
                <TableRow key={item.id} sx={{ '&:hover': { bgcolor: 'rgba(79,124,255,0.06)' } }}>
                  <TableCell align="left">
                    <Avatar src={item.imageUrl} />
                  </TableCell>
                  <TableCell align="left" sx={{ color: '#fff !important' }}>{item.title}</TableCell>
                  <TableCell align="left">{item.category?.name}</TableCell>
                  <TableCell align="left">₹{item.price}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <Stack spacing={2} className="py-5 flex justify-center items-center">
           <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" sx={{ '& .MuiPaginationItem-root': { color: '#D0D7E6', borderColor: 'rgba(255,255,255,0.15)' }, '& .Mui-selected': { bgcolor: '#4F7CFF !important', color: '#fff' } }} />
          </Stack>
        )}
      </Card>
    </div>
  );
};

export default ProductTableView;
