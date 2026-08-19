import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmOrder,
  deleteOrder,
  deliveredorder,
  getOrders,
  shipOrder,
} from '../../state/Admin/Order/Action';
import {
  Avatar,
  AvatarGroup,
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

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);

  const [page, setPage] = useState(1);
  const rowsPerPage = 2;

  useEffect(() => {
    dispatch(getOrders());
  }, [
    dispatch,
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deleteOrder,
  ]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const orders = adminOrder.orders || [];
  const totalPages = Math.ceil(orders.length / rowsPerPage);
  const paginatedOrders = orders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  console.log("paginated order",paginatedOrders)

  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredorder(orderId));
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <div className="p-2 sm:p-6">
      <Card sx={{ mt: 2, bgcolor: '#111729', color: '#F4F6FB', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardHeader title="Recent Orders" titleTypographyProps={{ sx: { fontFamily: 'Sora, sans-serif', fontWeight: 700 } }} />
        <TableContainer>
          <Table sx={{ minWidth: 650, '& .MuiTableCell-root': { color: '#D0D7E6', borderColor: 'rgba(255,255,255,0.08)' } }} aria-label="orders table">
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { color: '#4F7CFF', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 } }}>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((item, index) => (
                <TableRow key={item.id} sx={{ '&:hover': { bgcolor: 'rgba(79,124,255,0.06)' } }}>
                  <TableCell>
                    <AvatarGroup max={2} sx={{ justifyContent: 'start' }}>
                      {(Array.isArray(item.orderItems)
                        ? item.orderItems
                        : []
                      ).map((orderItem) => (
                        <Avatar
                          key={orderItem.id || orderItem.product.id}
                          src={orderItem.product.imageUrl}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell align="left">
                    {(Array.isArray(item.orderItems)
                      ? item.orderItems
                      : []
                    ).map((orderItem) => (
                      <p key={orderItem.id || orderItem.product.id}>
                        {orderItem.product.title}
                      </p>
                    ))}
                  </TableCell>

                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left">{item.totalPrice}</TableCell>
                  <TableCell align="left">
                    <span
                      className={`text-white px-5 py-2 rounded-full ${
                        item.orderStatus === 'CONFIRMED'
                          ? 'bg-[#369236]'
                          : item.orderStatus === 'SHIPPED'
                          ? 'bg-[#4141ff]'
                          : item.orderStatus === 'PLACED'
                          ? 'bg-[#02B290]'
                          : item.orderStatus === 'PENDING'
                          ? 'bg-[gray]'
                          : 'bg-[#025720]'
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {totalPages > 1 && (
          <Stack spacing={2} className="py-5 flex justify-center items-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#D0D7E6',
                  fontWeight: 'bold',
                  borderColor: 'rgba(255,255,255,0.15)',
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#4F7CFF',
                  color: '#fff',
                  borderColor: '#4F7CFF',
                },
                '& .MuiPaginationItem-root:hover': {
                  backgroundColor: 'rgba(79,124,255,0.15)',
                },
              }}
            />
          </Stack>
        )}
      </Card>
    </div>
  );
};

export default OrdersTable;
