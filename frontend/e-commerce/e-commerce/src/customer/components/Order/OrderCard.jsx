import React from "react";
import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const item = order.orderItems[0];

  return (
    <div
      onClick={() => navigate(`/account/order/${order.id}`)}
      className="p-5 bg-ink-600 border border-white/10 rounded-xl hover:border-volt-500/50 transition-colors cursor-pointer"
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>

        {/* Product Info */}
        <Grid item xs={12} sm={6}>
          <div className="flex">
            <div className="w-[5rem] h-[5rem] bg-white/[0.04] rounded flex items-center justify-center overflow-hidden">
              <img
                className="w-full h-full object-contain p-1"
                src={item.product.imageUrl}
                alt={item.product.title}
              />
            </div>
            <div className="ml-5 space-y-1">
              <p className="mb-1 font-semibold text-white">{item.product.title}</p>
              <p className="text-ink-200 text-xs font-semibold">Size: {item.size}</p>
              <p className="text-ink-200 text-xs font-semibold">Color: {item.product.color}</p>
            </div>
          </div>
        </Grid>

        {/* Price */}
        <Grid item xs={6} sm={2}>
          <p className="text-white font-semibold">₹{item.discountedPrice}</p>
        </Grid>

        {/* Status */}
        <Grid item xs={6} sm={4}>
          {order.orderStatus === "DELIVERED" ? (
            <div>
              <p className="text-ink-50 text-sm">
                <AdjustIcon sx={{ width: "15px", height: "15px" }} className="text-green-500 mr-2 text-sm" />
                Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-ink-200">Your item has been delivered</p>
            </div>
          ) : order.orderStatus === "PLACED" ? (
            <p className="text-ink-50 text-sm">
              <span>Expected Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</span>
            </p>
          ) : (
            <p className="text-amp-500 text-sm font-medium">Status: {order.orderStatus}</p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
