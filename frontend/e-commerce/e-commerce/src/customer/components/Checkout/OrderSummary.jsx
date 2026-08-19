import React, { useEffect } from 'react';
import AddressCart from '../AddressCart/AddressCart';
import { Button } from '@mui/material';
import Cartitem from '../Cart/Cartitem';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment } from '../../../state/Payment/Action';
import { getCart } from '../../../state/Cart/Action';
import { getOrderById } from '../../../state/Order/Action';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  const { order } = useSelector((store) => store);
  // const address = useSelector((store) => store.order.savedAddress);

useEffect(() => {
  if (orderId) {
    dispatch(getOrderById(orderId));
  }
}, [dispatch, orderId]);

useEffect(() => {
  console.log("FULL ORDER FROM REDUX:", order.order);
  console.log("SHIPPING ADDRESS:", order.order?.shippingAddress);
}, [order.order]);

  const handleCheckout = () => {
    if (!orderId) {
      alert("Order not created yet!");
      return;
    }

    dispatch(createPayment(orderId)).then(() => {
      dispatch(getCart());
    });
  };

  return (
    <div className="bg-ink-900">
      <div className="p-5 bg-ink-600 rounded-xl border border-white/10">
        <AddressCart address={order.order?.shippingAddress} />
      </div>

      <div className="mt-5">
        <div className="lg:grid grid-cols-3 lg:px-6 relative gap-6">
          <div className="col-span-2">
            {order.order?.orderItems?.map((item) => (
              <Cartitem key={item.id} item={item} isOrderSummary={true} />
            ))}
          </div>

          <div className="px-2 sticky top-20 h-fit mt-5 lg:mt-0">
            <div className="border border-white/10 bg-ink-600 rounded-xl p-4">
              <p className="uppercase font-mono-tech text-xs tracking-widest text-volt-400 pb-4">Price details</p>
              <hr className="border-white/10" />
              <div className="space-y-3 font-semibold mb-6 mt-3">
                <div className="flex justify-between pt-3 text-ink-50">
                  <span>Price</span>
                  <span>₹{order.order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3 text-ink-100">
                  <span>Discount</span>
                  <span className="text-amp-500">₹-{order.order?.discount}</span>
                </div>
                <div className="flex justify-between pt-3 text-ink-100">
                  <span>Delivery Charge</span>
                  <span className="text-amp-500">Free</span>
                </div>
                <div className="flex justify-between pt-3 font-bold text-white border-t border-white/10 mt-2 pt-4">
                  <span>Total Amount</span>
                  <span className="text-volt-400">₹{order.order?.amount}</span>
                </div>
              </div>

              <Button
                variant="contained"
                className="w-full mt-5"
                sx={{ px: "2.5rem", py: ".8rem", bgcolor: "#4F7CFF", textTransform: 'none', fontWeight: 700, width: '100%', boxShadow: '0 8px 20px -6px rgba(79,124,255,0.6)', '&:hover': { bgcolor: '#2F5CF0' } }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
