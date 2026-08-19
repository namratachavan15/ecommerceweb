import React, { useEffect } from 'react'
import Cartitem from './Cartitem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../state/Cart/Action'

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleCheckOut = () => {
    navigate("/checkout?step=2")
  }

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch, cart.updateCartItem, cart.deleteCartItem]);

  if (!cart.cart?.cartItems || cart.cart.cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-ink-900">
        <div className="text-center">
          <p className="text-3xl font-display font-bold text-white">🛒 Your cart is empty</p>
          <p className="text-ink-200 mt-2">Looks like you haven't added anything yet.</p>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ mt: 4, px: "2rem", py: ".8rem", bgcolor: "#4F7CFF", textTransform: "none", fontWeight: 700, '&:hover': { bgcolor: '#2F5CF0' } }}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:grid grid-cols-3 lg:px-8 px-4 relative bg-ink-900 min-h-screen py-8 gap-6">
      <div className="col-span-2">
        <p className="font-mono-tech text-xs uppercase tracking-widest text-volt-400 mb-1">Cart</p>
        <h1 className="text-2xl font-display font-bold text-white mb-4">Your Items</h1>
        {cart.cart?.cartItems.map((item) => (
          <Cartitem key={item.id} item={item} isOrderSummary={false}/>
        ))}
      </div>

      <div className="px-2 sticky top-20 h-fit mt-5 lg:mt-0">
        <div className="border border-white/10 bg-ink-600 rounded-xl p-5 shadow-card">
          <p className="uppercase font-mono-tech text-xs tracking-widest text-volt-400 pb-4">Price details</p>
          <hr className="border-white/10" />
          <div className="space-y-3 font-semibold mb-6 mt-3">
            <div className="flex justify-between pt-3 text-ink-50">
              <span>Price</span>
              <span>₹{cart.cart?.totalPrice}</span>
            </div>
            <div className="flex justify-between pt-3 text-ink-100">
  <span>Discount</span>
  <span className="text-amp-500">
    ₹-{cart.cart?.discount}
  </span>
</div>
            <div className="flex justify-between pt-3 text-ink-100">
              <span>Delivery Charge</span>
              <span className="text-amp-500">Free</span>
            </div>
            <div className="flex justify-between pt-3 font-bold text-white border-t border-white/10 mt-2 pt-4">
              <span>Total Amount</span>
              <span className="text-volt-400">₹{cart.cart?.amount}</span>
            </div>
          </div>
          <Button
            onClick={handleCheckOut}
            variant="contained"
            className="w-full mt-5"
            sx={{ px: "2.5rem", py: ".8rem", bgcolor: "#4F7CFF", textTransform: "none", fontWeight: 700, width: "100%", boxShadow: "0 8px 20px -6px rgba(79,124,255,0.6)", '&:hover': { bgcolor: '#2F5CF0' } }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart
