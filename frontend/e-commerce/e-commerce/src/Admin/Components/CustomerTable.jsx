import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { api } from "../../config/apiConfig";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched customers:", data);
        setCustomers(data);
      } catch (err) {
        console.error("Error loading users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [token]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: { xs: 1, sm: 4 } }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff', fontFamily: 'Sora, sans-serif', fontWeight: 800 }}>
        All Customers
      </Typography>

      {customers.map((user, index) => (
        <Accordion key={user.id} defaultExpanded={index === 0} sx={{ bgcolor: '#111729', color: '#F4F6FB', border: '1px solid rgba(255,255,255,0.08)', mb: 1.5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#8993AC' }} />}
            sx={{ bgcolor: "#171F36" }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#fff' }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography sx={{ ml: 2, color: "#8993AC" }}>
              {user.email}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {/* Customer info */}
            <Typography sx={{ mb: 1, color: '#D0D7E6' }}>
              <strong style={{ color: '#4F7CFF' }}>Mobile:</strong> {user.mobile || "N/A"}
            </Typography>

            {/* Orders */}
            <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#fff', fontFamily: 'Sora, sans-serif' }}>
              Orders
            </Typography>

            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order) => (
                <Box key={order.id} sx={{ mb: 3 }}>
                  <Typography sx={{ color: '#D0D7E6' }}>
                    <strong style={{ color: '#4F7CFF' }}>Order ID:</strong> {order.orderId || order.id} <br />
                    <strong style={{ color: '#4F7CFF' }}>Status:</strong> {order.orderStatus} <br />
                    <strong style={{ color: '#4F7CFF' }}>Total Price:</strong> ₹{order.totalPrice} <br />
                    <strong style={{ color: '#4F7CFF' }}>Payment Method:</strong>{" "}
                    {order.paymentDetails?.paymentMethod || "N/A"} <br />
                    <strong style={{ color: '#4F7CFF' }}>Payment Status:</strong>{" "}
                    {order.paymentDetails?.status || "N/A"}
                  </Typography>

                  {/* Ordered Products */}
                  <Typography variant="subtitle1" sx={{ mt: 1, color: '#fff' }}>
                    Products:
                  </Typography>
                  <Grid container spacing={2}>
                    {order.orderItems.map((item) => (
                      <Grid
                        item
                        key={item.id}
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid rgba(255,255,255,0.1)",
                          p: 1,
                          borderRadius: 2,
                          bgcolor: '#171F36',
                        }}
                      >
                        <Avatar
                          src={item.product.imageUrl}
                          variant="square"
                          sx={{ width: 64, height: 64, mr: 2 }}
                        />
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: '#fff' }}>
                            {item.product.title}
                          </Typography>
                          <Typography sx={{ color: '#8993AC' }}>
                            Quantity: {item.quantity} | Price: ₹{item.price}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <hr />
                </Box>
              ))
            ) : (
              <Typography sx={{ ml: 2, color: "#8993AC" }}>
                No orders found.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CustomerTable;
