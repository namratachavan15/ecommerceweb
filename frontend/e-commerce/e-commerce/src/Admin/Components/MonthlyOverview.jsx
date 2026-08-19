import React from 'react';
import { Card, CardHeader, CardContent, Grid, Avatar, Typography, Box, IconButton } from '@mui/material';
import { TrendingUp, AccountCircle, SettingsCell, AttachMoney, MoreVert } from '@mui/icons-material';

const salesData = [
  { states: '245k', title: "Sales", color: "#E5D68A", icon: <TrendingUp /> },
  { states: '12.5k', title: "Customers", color: "#22CB5C", icon: <AccountCircle /> },
  { states: '1.54k', title: "Products", color: "#DE4839", icon: <SettingsCell /> },
  { states: '88k', title: "Revenue", color: "#12B0E8", icon: <AttachMoney /> },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Box sx={{ display: "flex", alignItems: 'center', mb: 2 }}>
        <Avatar variant='rounded' sx={{ mr: 2, width: 44, height: 44, color: "common.white", backgroundColor: item.color }}>
          {item.icon}
        </Avatar>
        <Box>
          <Typography variant='caption' sx={{ color: '#8993AC' }}>{item.title}</Typography>
          <Typography variant='h6' sx={{ color: '#F4F6FB', fontFamily: 'JetBrains Mono, monospace' }}>{item.states}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
}

const MonthlyOverview = () => {
  return (
    <Card sx={{ width: '100%', bgcolor: '#111729', color: '#F4F6FB', border: '1px solid rgba(255,255,255,0.08)' }}>
      <CardHeader
        title="Monthly Overview"
        titleTypographyProps={{ sx: { fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#fff' } }}
        action={<IconButton size='small' sx={{ color: '#8993AC' }}><MoreVert /></IconButton>}
        subheader={
          <Typography variant="body2" sx={{ color: '#8993AC' }}>
            <Box component="span" sx={{ fontWeight: 600, mx: 0, color: '#4F7CFF' }}>Total 48.5% growth</Box> this month
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MonthlyOverview;
