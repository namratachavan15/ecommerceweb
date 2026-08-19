import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        group
        cursor-pointer
        flex
        flex-col
        items-center
        bg-ink-600
        rounded-xl
        overflow-hidden
        w-60
        mx-3
        border
        border-white/10
        h-[300px]
        transition-all
        duration-300
        hover:border-volt-500/60
        hover:shadow-glow
        hover:-translate-y-1
      "
    >
      {/* IMAGE */}
      <div
        className="
          w-full
          h-[210px]
          bg-white
          flex
          items-center
          justify-center
          overflow-hidden
          rounded-t-xl
          p-2
        "
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="
            max-w-full
            max-h-full
            w-auto
            h-auto
            object-contain
            block
          "
        />
      </div>

      {/* TEXT */}
      <div className="p-3 w-full text-center border-t border-white/5">
        <h3
          className="
            text-xs
            font-mono-tech
            uppercase
            tracking-wide
            text-volt-400
            truncate
          "
        >
          {product.brand}
        </h3>

        <p className="mt-1 text-xs text-ink-100 line-clamp-2">
          {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;