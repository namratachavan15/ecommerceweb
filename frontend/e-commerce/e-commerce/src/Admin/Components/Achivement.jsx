import { Button, Card, CardContent, Typography, styled } from '@mui/material';
import React from 'react';
import TrophyImage from '../../assests/tropy.png';

const TriangleImg = styled("img")({
    right: 0,
    bottom: 0,
    height: 170,
    position: "absolute"
});

const TropyImg = styled("img")({
    right: 5,
    bottom: 20,
    height: 80,
    position: 'absolute'
});

const Achivement = () => {
  return (
    <Card
      sx={{
        position: "relative",
        width: '100%',
        maxWidth: 394,
        m: 'auto',
        bgcolor: '#111729',
        color: '#F4F6FB',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px", fontFamily: 'Sora, sans-serif', fontWeight: 700 }}>
          NovaTech Sales
        </Typography>
        <Typography variant="body2" sx={{ color: '#8993AC' }}>Congratulations 🥳</Typography>
        <Typography variant="h5" sx={{ my: 3.1, fontFamily: 'JetBrains Mono, monospace', color: '#4F7CFF' }}>₹420.8k</Typography>
        <Button size="small" variant="contained" sx={{ bgcolor: '#4F7CFF', textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#2F5CF0' } }}>View Sales</Button>
        <TriangleImg src="" />
        <TropyImg src={TrophyImage} sx={{ width: { xs: 40, sm: 60 }, ml: { xs: 2, sm: 5 } }} />
      </CardContent>
    </Card>
  );
};

export default Achivement;
