import React from "react";
import AddressCart from "../AddressCart/AddressCart";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20 bg-ink-900 min-h-screen pb-16">
      <div>
        <h1 className="font-display font-bold text-xl text-white py-7">Delivery Address</h1>
        <div className="bg-ink-600 border border-white/10 rounded-xl p-5">
          <AddressCart />
        </div>
      </div>

      <div className="py-16">
        <OrderTracker activeStep={3} />
      </div>
      <Grid className="space-y-4 container">
        {[1, 1, 1, 1, 1].map((item, idx) => (
          <Grid
            key={idx}
            container
            className="rounded-xl p-5 bg-ink-600 border border-white/10 mb-4"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={6}>
              <div className="space-x-4 flex items-center">
                <div className="w-[5rem] h-[5rem] bg-white/[0.04] rounded flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-contain p-1"
                    src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl668-yellow-sg-leman-original-imagznqcrahgq9rf.jpeg?q=70"
                    alt=""
                  />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="font-semibold text-white">
                    Men Embroidered Jacquard Straight Kurta
                  </p>
                  <p className="space-x-5 text-ink-200 text-xs font-semibold">
                    <span>Color: black</span> <span>Size: M</span>
                  </p>
                  <p className="text-ink-200 text-sm">Seller: Linaria</p>
                  <p className="text-white font-semibold">₹1999</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  color: "#4F7CFF",
                  display: "flex",
                  alignItems: "center",
                  cursor: 'pointer',
                }}
              >
                <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2" />
                <span className="text-sm">Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
