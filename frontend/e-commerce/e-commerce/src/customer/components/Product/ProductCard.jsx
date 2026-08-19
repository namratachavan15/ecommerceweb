import React from "react";
import "./ProductCard.css"
import { useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
  const navigate=useNavigate();
  return (
    <div onClick={() => navigate(`/product/${product.id}`)} className="productCard w-[15rem] m-3 transition-all cursor-pointer bg-ink-600 border border-white/10 rounded-xl overflow-hidden hover:border-volt-500/60">
      <div className="h-[15rem] bg-white/[0.03] flex items-center justify-center relative overflow-hidden">
        {product?.discountPercent > 0 && (
          <span className="absolute top-2 left-2 z-10 bg-amp-500 text-ink-900 text-[11px] font-bold px-2 py-0.5 rounded font-mono-tech">
            -{product.discountPercent}%
          </span>
        )}
        <img
          className="productImg h-full w-full object-contain p-4 transition-transform duration-300"
          src={product.imageUrl}
          alt=""
        >
        </img>
      </div>
      <div className="textPart p-4 border-t border-white/5">
        <p className="font-mono-tech text-[11px] uppercase tracking-wide text-volt-400">{product.brand}</p>
        <p className="text-sm text-ink-50 mt-1 line-clamp-2 min-h-[2.5rem]">{product.title}</p>
        <div className='flex items-baseline gap-2 mt-2'>
          <p className='font-display font-bold text-white text-lg'>₹{product.discountedPrice}</p>
          <p className='line-through opacity-40 text-xs text-ink-100'>₹{product.price}</p>
          <p className='text-amp-500 font-semibold text-xs'>{product?.discountPercent}% off</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
