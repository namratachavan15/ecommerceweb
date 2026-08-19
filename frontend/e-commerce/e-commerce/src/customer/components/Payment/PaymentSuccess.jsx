import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../state/Order/Action";
import { updatePayment } from "../../../state/Payment/Action";
import { Alert, AlertTitle, Container, Grid } from "@mui/material";
import OrderTracker from "../Order/OrderTracker";
import AddressCart from "../AddressCart/AddressCart";
import ProductReviewSection from "../ProductDetails/ProductReviewSection";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);

    const razorpayPaymentId = urlParam.get("razorpay_payment_id");
    const razorpayPaymentLinkId = urlParam.get("razorpay_payment_link_id");
    const razorpayStatus = urlParam.get("razorpay_payment_link_status");

    setPaymentId(razorpayPaymentId);
    setPaymentStatus(razorpayStatus);

    if (razorpayPaymentId && orderId) {
      const data = { orderId, paymentId: razorpayPaymentId };
      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);

  return (
    <div className="px-2 lg:px-36 bg-ink-900 min-h-screen pb-16">
      <div className="flex flex-col justify-center items-center pt-10">
        {paymentStatus === "paid" ? (
          <Alert
            variant="filled"
            severity="success"
            sx={{ mb: 6, width: "fit-content", bgcolor: '#1F7A4D' }}
          >
            <AlertTitle>Payment Success</AlertTitle>
            Congratulations 🎉 Your order has been placed!
          </Alert>
        ) : (
          <Alert
            variant="filled"
            severity="error"
            sx={{ mb: 6, width: "fit-content" }}
          >
            <AlertTitle>Payment Failed</AlertTitle>
            Oops! Something went wrong with your payment.
          </Alert>
        )}
      </div>

      <OrderTracker activeStep={1} />

      {order.order?.orderItems?.map((item) => (
  <Grid
    key={item.id}
    container
    className="space-y-5 py-5 pt-16"
  >
    <Grid
      container
      item
      className="rounded-xl p-5 bg-ink-600 border border-white/10"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
      style={{width:"100%"}}
    >
      <Grid item xs={12} md={6}>
        <div className="flex items-center">
          <div className="w-[5rem] h-[5rem] bg-white/[0.04] rounded flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-contain p-1"
              src={item.product.imageUrl}
              alt=""
            />
          </div>
          <div className="ml-5 space-y-1">
            <p className="text-white font-medium">{item.product.title}</p>
            <div className="text-ink-200 text-xs font-semibold space-x-5">
              <span>Color: {item.color}</span>
              <span>Size: {item.size}</span>
            </div>
            <p className="text-ink-200 text-sm">Seller: {item.product.brand}</p>
            <p className="text-white font-semibold">₹ {item.price}</p>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={5}>
        <AddressCart address={order.order?.shippingAddress} />
      </Grid>

      {/* REVIEW SECTION */}
      <Grid item xs={12} mt={2}>
      <ProductReviewSection
  productId={item.product.id}
  userId={order.order?.user?.id}
/>

      </Grid>
    </Grid>
  </Grid>
))}

    </div>

  );
};

export default PaymentSuccess;
