import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GroupIcon from '@mui/icons-material/Group';

import Achivement from './Achivement';
import MonthlyOverview from './MonthlyOverview';
import OrdersTable from '../view/OrderTableView';
import ProductTableView from '../view/ProductTableView';

import { styled } from '@mui/material/styles';
import { api } from '../../config/apiConfig';


// ----------------------------------------------------
// Dashboard Item
// ----------------------------------------------------
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#111729',
  border: '1px solid rgba(255,255,255,0.08)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#F4F6FB',
}));


// ----------------------------------------------------
// Stat Card
// ----------------------------------------------------
const StatCard = ({ icon, label, value, accent }) => (
  <Paper
    sx={{
      p: 2.5,
      bgcolor: '#111729',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      transition: 'all .2s',

      '&:hover': {
        borderColor: `${accent}66`,
        boxShadow: `0 0 0 1px ${accent}44, 0 12px 30px -12px ${accent}55`,
      },
    }}
  >
    <Box
      sx={{
        width: 46,
        height: 46,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: `${accent}1F`,
        color: accent,
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>

    <Box>
      <Typography
        sx={{
          color: '#8993AC',
          fontSize: 12,
          fontFamily: 'JetBrains Mono, monospace',
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color: '#fff',
          fontFamily: 'Sora, sans-serif',
          fontWeight: 800,
          fontSize: 22,
          mt: 0.3,
        }}
      >
        {value}
      </Typography>
    </Box>
  </Paper>
);


// ----------------------------------------------------
// Admin Dashboard
// ----------------------------------------------------
const AdminDashboard = () => {

  // Orders Redux मधून घेतो
  const { orders } = useSelector((store) => store.adminOrder);

  // Dashboard साठी independent product count
  const [productCount, setProductCount] = useState(null);

  // Dashboard साठी customer count
  const [customerCount, setCustomerCount] = useState(null);


  // ----------------------------------------------------
  // Fetch Product Count + Customer Count
  // ----------------------------------------------------
  useEffect(() => {

    const token = localStorage.getItem('jwt');

    Promise.all([

      // Get ALL products
      api.get('/api/admin/products/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      // Get ALL customers/users
      api.get('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    ])
      .then(([productsRes, usersRes]) => {

        console.log(
          'Total products from backend:',
          productsRes.data?.length
        );

        console.log(
          'Total customers from backend:',
          usersRes.data?.length
        );

        // Product count
        setProductCount(productsRes.data?.length ?? 0);

        // Customer count
        setCustomerCount(usersRes.data?.length ?? 0);
      })

      .catch((error) => {

        console.error(
          'Dashboard count error:',
          error
        );

        setProductCount(null);
        setCustomerCount(null);
      });

  }, []);


  // ----------------------------------------------------
  // Calculate Total Revenue
  // ----------------------------------------------------
  const totalRevenue = (orders || []).reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0
  );


  // ----------------------------------------------------
  // Dashboard Stats
  // ----------------------------------------------------
  const stats = [

    {
      icon: <TrendingUpIcon />,
      label: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      accent: '#4F7CFF',
    },

    {
      icon: <ReceiptLongIcon />,
      label: 'Total Orders',
      value: orders?.length ?? '—',
      accent: '#FFB13B',
    },

    {
      icon: <Inventory2Icon />,
      label: 'Total Products',

      // आता content.length नाही.
      // Direct admin API मधून आलेला actual count वापरतो.
      value: productCount ?? '—',

      accent: '#34D399',
    },

    {
      icon: <GroupIcon />,
      label: 'Total Customers',
      value: customerCount ?? '—',
      accent: '#F87171',
    },

  ];


  // ----------------------------------------------------
  // JSX
  // ----------------------------------------------------
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: {
          xs: 1,
          sm: 2,
        },
      }}
    >

      {/* -----------------------------------------------
          Dashboard Heading
      ------------------------------------------------ */}
      <Box sx={{ mb: 3 }}>

        <Typography
          sx={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            letterSpacing: 1.5,
            color: '#4F7CFF',
            textTransform: 'uppercase',
          }}
        >
          Overview
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 800,
            fontSize: 26,
            color: '#fff',
          }}
        >
          Dashboard
        </Typography>

      </Box>


      {/* -----------------------------------------------
          KPI STAT CARDS
      ------------------------------------------------ */}
      <Grid
        container
        spacing={2}
        sx={{ mb: 1 }}
      >

        {stats.map((s) => (
          <Grid
            key={s.label}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <StatCard {...s} />
          </Grid>
        ))}

      </Grid>


      {/* -----------------------------------------------
          Dashboard Sections
      ------------------------------------------------ */}
      <Grid
        container
        spacing={2}
        sx={{ mt: 1 }}
      >

        {/* Achievement */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Item className="shadow-lg shadow-gray-600">
            <Achivement />
          </Item>
        </Grid>


        {/* Monthly Overview */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Item>
            <MonthlyOverview />
          </Item>
        </Grid>


        {/* Orders Table */}
        <Grid
          size={{
            xs: 12,
            md: 12,
          }}
        >
          <Item>
            <OrdersTable />
          </Item>
        </Grid>


        {/* Products Table */}
        <Grid
          size={{
            xs: 12,
            md: 12,
          }}
        >
          <Item>
            <ProductTableView />
          </Item>
        </Grid>

      </Grid>

    </Box>
  );
};


export default AdminDashboard;