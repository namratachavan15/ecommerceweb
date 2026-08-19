import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../../HomeCarosel/MainCarousel";
import HomeSectionCarosel from "../../HomeSectionCarosel/HomeSectionCarosel";
import { findProducts } from "../../../../state/Product/Action";

const perks = [
  { title: "Free Delivery", desc: "On orders above ₹999" },
  { title: "2-Year Warranty", desc: "On every device we sell" },
  { title: "Secure Checkout", desc: "256-bit encrypted payments" },
  { title: "7-Day Returns", desc: "No questions asked" },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(findProducts({
      category: '',
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      pageNumber: 0,
      pageSize: 100,
      stock: '',
    }));
  }, [dispatch]);

  return (
    <div className="bg-ink-900 min-h-screen">
      <MainCarousel />

      {/* Perk strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border-y border-white/10">
        {perks.map((p) => (
          <div key={p.title} className="bg-ink-900 px-4 py-4 text-center">
            <p className="font-display font-bold text-sm text-white">{p.title}</p>
            <p className="text-xs text-ink-200 mt-1">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-14 py-16 flex flex-col justify-center px-5 lg:px-10 max-w-[1600px] mx-auto">
        <HomeSectionCarosel
          data={products?.content.filter(p => p.category?.name === "mens_kurta")}
          sectionName={"Men's Kurta"}
        />
        <HomeSectionCarosel
          data={products?.content.filter(p => p.category?.name === "shoes")}
          sectionName={"Men's Shoes"}
        />
        <HomeSectionCarosel
          data={products?.content.filter(p => p.category?.name === "shirt")}
          sectionName={"Men's Shirt"}
        />
        <HomeSectionCarosel
          data={products?.content.filter(p => p.category?.name === "women_saree")}
          sectionName={"Women's Saree"}
        />
      </div>
    </div>
  );
};

export default HomePage;
