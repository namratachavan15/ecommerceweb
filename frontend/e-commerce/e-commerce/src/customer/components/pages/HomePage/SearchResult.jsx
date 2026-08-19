import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomeSectionCard from '../../HomeSectionCard/HomeSectionCard';
import { searchProductsForNavbar } from '../../../../state/Product/Action';

export default function SearchResults() {

  const location = useLocation();
  const dispatch = useDispatch();

  const { products, loading } = useSelector(
    (store) => store.product
  );

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query?.trim()) {
      dispatch(searchProductsForNavbar(query));
    }
  }, [query, dispatch]);

  const productList = products?.content || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center">
        <p className="text-ink-200 text-sm">
          Searching for products...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 px-5 py-12 lg:px-10">

      {/* Header */}
      <div className="mb-8">

        <p className="font-mono-tech text-xs uppercase tracking-widest text-volt-400 mb-2">
          Search Results
        </p>

        <h2 className="text-2xl lg:text-3xl font-display font-bold text-white">
          Results for "{query}"
        </h2>

        <p className="text-sm text-ink-300 mt-2">
          {productList.length} product
          {productList.length !== 1 ? 's' : ''} found
        </p>

      </div>

      {/* Products */}
      {productList.length > 0 ? (

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-4
            lg:gap-5
          "
        >

          {productList.map((product) => (

            <HomeSectionCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      ) : (

        /* No Results */
        <div className="flex flex-col items-center justify-center py-24 text-center">

          <div className="text-5xl mb-4">
            🔍
          </div>

          <h3 className="text-xl font-display font-bold text-white">
            No products found
          </h3>

          <p className="text-sm text-ink-300 mt-2">
            We couldn't find anything matching "{query}".
          </p>

        </div>

      )}

    </div>
  );
}