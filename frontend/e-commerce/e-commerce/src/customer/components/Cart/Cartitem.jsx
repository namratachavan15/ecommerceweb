import { Button, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../../state/Cart/Action";

const Cartitem = ({ item, isOrderSummary }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (num) => {
    const newQuantity = item.quantity + num;

    if (newQuantity < 1) return;

    const data = {
      data: {
        quantity: newQuantity,
      },
      cartItemId: item?.id,
    };

    dispatch(updateCartItem(data));
  };

  const handleRemoveCartItem = () => {
    if (!isOrderSummary) {
      dispatch(removeCartItem(item.id));
    }
  };

  return (
    <div
      className="
        w-full
        min-w-0
        p-4 sm:p-5 md:p-6
        bg-ink-600
        border border-white/10
        rounded-xl
        mt-5
        flex
        flex-col
        sm:flex-row
        items-start
        gap-4
        hover:border-volt-500/40
        transition-colors
        box-border
      "
    >
      {/* PRODUCT IMAGE */}
      <div
        className="
          w-20 h-20
          sm:w-24 sm:h-24
          flex-shrink-0
          bg-white/[0.04]
          rounded-lg
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >
        <img
          className="w-full h-full object-contain p-2"
          src={item.product.imageUrl}
          alt={item.product.title}
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="flex-1 min-w-0 w-full">
        {/* TOP SECTION */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:justify-between
            md:items-start
            gap-3
          "
        >
          {/* PRODUCT DETAILS */}
          <div className="min-w-0">
            <p
              className="
                font-semibold
                text-white
                break-words
                leading-6
              "
            >
              {item.product.title}
            </p>

            <p className="text-volt-400 text-xs font-mono-tech uppercase mt-1">
              {item.product.brand}
            </p>

            {item.size && (
              <p className="text-ink-200 text-sm mt-1">
                Size: {item.size}
              </p>
            )}
          </div>

          {/* QUANTITY CONTROLS */}
          {!isOrderSummary && (
            <div
              className="
                flex
                items-center
                flex-wrap
                gap-1
                flex-shrink-0
              "
            >
              <IconButton
                size="small"
                sx={{ color: "#8993AC" }}
                disabled={item.quantity <= 1}
                onClick={() => handleUpdateCartItem(-1)}
              >
                <RemoveCircleOutlineIcon fontSize="small" />
              </IconButton>

              <span
                className="
                  px-3
                  py-1
                  border
                  border-white/10
                  rounded
                  text-ink-50
                  bg-white/5
                  min-w-[40px]
                  text-center
                "
              >
                {item.quantity}
              </span>

              <IconButton
                size="small"
                sx={{ color: "#4F7CFF" }}
                onClick={() => handleUpdateCartItem(1)}
              >
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>

              <Button
                variant="text"
                size="small"
                color="error"
                onClick={handleRemoveCartItem}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        {/* PRICE */}
        <div
          className="
            flex
            flex-wrap
            gap-x-4
            gap-y-1
            items-center
            pt-3
          "
        >
          <p className="font-semibold text-white">
            ₹{item.discountedPrice}
          </p>

          <p className="opacity-50 line-through text-ink-100">
            ₹{item.price}
          </p>

          <p className="text-amp-500 font-semibold text-sm">
            {item.product?.discountPercent}% Off
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;