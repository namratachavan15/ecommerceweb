import { StarIcon } from '@heroicons/react/20/solid';
import { Box, Button, Grid, Rating } from '@mui/material';
import ProductReviewCard from './ProductReviewCard';
import LinearProgress from '@mui/material/LinearProgress';
import { mens_kurta } from '../../../Data/mens_kurta';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  findProductById,
  findProducts
} from '../../../state/Product/Action';
import { addItemToCart } from '../../../state/Cart/Action';
import ProductReviewDisplay from './ProductReviewDisplay';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// Customer Login Modal
import AuthModel from '../../Auth/AuthModel';


const categorySizes = {

  top: ["S", "M", "L", "XL", "XXL"],

  "t-shirt": ["S", "M", "L", "XL", "XXL"],

  shirt: ["S", "M", "L", "XL", "XXL"],

  sweater: ["S", "M", "L", "XL", "XXL"],

  jacket: ["S", "M", "L", "XL", "XXL"],

  kurtas: ["S", "M", "L", "XL", "XXL"],

  mens_kurta: ["S", "M", "L", "XL", "XXL"],

  women_dress: ["S", "M", "L", "XL", "XXL"],

  men_jeans: ["28", "30", "32", "34", "36", "38", "40"],

  women_jeans: ["26", "28", "30", "32", "34", "36", "38"],

  shoes: ["6", "7", "8", "9", "10", "11", "12"],

  women_saree: [],

  lengha_choli: ["S", "M", "L", "XL", "XXL"],

  jeans: ["28", "30", "32", "34", "36", "38"],

  dress: ["S", "M", "L", "XL", "XXL"],
};


const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',

  breadcrumbs: [
    {
      id: 1,
      name: 'Men',
      href: '#'
    },
    {
      id: 2,
      name: 'Clothing',
      href: '#'
    },
  ],

  images: [
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],

  colors: [
    {
      id: 'white',
      name: 'White',
      classes: 'bg-white checked:outline-gray-400'
    },
    {
      id: 'gray',
      name: 'Gray',
      classes: 'bg-gray-200 checked:outline-gray-400'
    },
    {
      id: 'black',
      name: 'Black',
      classes: 'bg-gray-900 checked:outline-gray-900'
    },
  ],

  sizes: [
    {
      name: 'S',
      inStock: true
    },
    {
      name: 'M',
      inStock: true
    },
    {
      name: 'L',
      inStock: true
    },
    {
      name: 'XL',
      inStock: true
    },
  ],

  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};


const reviews = {
  href: '#',
  average: 4,
  totalCount: 117
};


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default function ProductDetails() {

  const [selectedSize, setSelectedSize] = useState("");

  // Customer login modal state
  const [openAuthModel, setOpenAuthModel] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const dispatch = useDispatch();


  // --------------------------------------------------
  // Fetch Products For Similar Products
  // --------------------------------------------------

  useEffect(() => {

    dispatch(
      findProducts({
        category: '',
        colors: [],
        size: [],
        minPrice: 0,
        maxPrice: 100000,
        minDiscount: 0,
        sort: 'price_low',
        pageNumber: 0,
        pageSize: 100,
        stock: '',
      })
    );

  }, [dispatch]);


  // --------------------------------------------------
  // Product Redux State
  // --------------------------------------------------

  const productState = useSelector(
    (store) => store.product
  );

  const { products } = useSelector(
    (store) => store.product
  );


  // --------------------------------------------------
  // Current Product Category
  // --------------------------------------------------

  const currentCategory =
    productState.product?.category?.name;


  // --------------------------------------------------
  // Current Category Sizes
  // --------------------------------------------------

  const currentSizes =
    categorySizes[currentCategory] || [];


  // --------------------------------------------------
  // Similar Products
  // --------------------------------------------------

  const similarProducts =
    products?.content?.filter(
      (p) =>
        p.category?.name ===
          productState.product?.category?.name &&
        p.id !== productState.product?.id
    );


  // --------------------------------------------------
  // Add To Cart
  // --------------------------------------------------

  const handleAddToCart = () => {

    // -----------------------------------------------
    // Check Customer Login
    // -----------------------------------------------

    const jwt = localStorage.getItem('jwt');

    // If user is not logged in,
    // open CUSTOMER login modal.
    if (!jwt) {

      setOpenAuthModel(true);

      return;
    }


    // -----------------------------------------------
    // Size Validation
    // -----------------------------------------------

    if (
      currentSizes.length > 0 &&
      !selectedSize
    ) {

      alert("Please select a size");

      return;
    }


    // -----------------------------------------------
    // Add Product To Cart
    // -----------------------------------------------

    const data = {
      productId: params.productId,
      size: selectedSize || null,
      quantity: 1,
    };


    dispatch(
      addItemToCart(data)
    );


    // -----------------------------------------------
    // Navigate To Cart
    // -----------------------------------------------

    navigate("/cart");
  };


  // --------------------------------------------------
  // Fetch Product By ID
  // --------------------------------------------------

  useEffect(() => {

    if (params.productId) {

      dispatch(
        findProductById({
          productId: params.productId
        })
      );

    }

  }, [dispatch, params.productId]);


  return (

    <div className="bg-ink-900 lg:px-20">

      <div className="pt-6">

        {/* ==================================================
            PRODUCT MAIN SECTION
        ================================================== */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">


          {/* ==================================================
              IMAGE GALLERY
          ================================================== */}

          <div className="flex flex-col items-center">

            <div
              className="
                overflow-hidden
                rounded-xl
                max-w-[30rem]
                max-h-[35rem]
                bg-white/[0.03]
                border
                border-white/10
                flex
                items-center
                justify-center
                p-6
              "
            >

              <img
                alt={productState.product?.title}
                src={productState.product?.imageUrl}
                className="
                  h-full
                  w-full
                  object-contain
                  object-center
                "
              />

            </div>

          </div>


          {/* ==================================================
              PRODUCT INFORMATION
          ================================================== */}

          <div
            className="
              lg:col-span-1
              max-auto
              max-w-2xl
              px-4
              pb-16
              sm:px-6
              lg:max-w-7xl
              lg:px-8
              lg:pb-24
            "
          >

            <div className="lg:col-span-2">

              {/* Brand */}

              <h1
                className="
                  text-xs
                  font-mono-tech
                  uppercase
                  tracking-widest
                  text-volt-400
                "
              >
                {productState.product?.brand}
              </h1>


              {/* Product Title */}

              <h1
                className="
                  text-xl
                  lg:text-2xl
                  font-display
                  font-bold
                  text-white
                  pt-2
                "
              >
                {productState.product?.title}
              </h1>

            </div>


            {/* ==================================================
                OPTIONS
            ================================================== */}

            <div className="mt-4 lg:row-span-3 lg:mt-0">

              <h2 className="sr-only">
                Product information
              </h2>


              {/* ==================================================
                  PRICE
              ================================================== */}

              <div
                className="
                  flex
                  space-x-4
                  items-baseline
                  text-lg
                  lg:text-2xl
                  text-white
                  mt-6
                "
              >

                <p
                  className="
                    font-display
                    font-bold
                  "
                >
                  ₹{productState.product?.discountedPrice}
                </p>


                <p
                  className="
                    text-amp-500
                    font-semibold
                    text-sm
                  "
                >
                  {productState.product?.discountPercent}% off
                </p>

              </div>


              {/* ==================================================
                  REVIEWS
              ================================================== */}

              <div className="mt-6">

                <div
                  className="
                    flex
                    items-center
                    space-x-3
                  "
                >

                  <Rating
                    name="read-only"
                    value={
                      parseInt(
                        productState.product?.averageRating
                      ) || 0
                    }
                    precision={0.5}
                    readOnly
                    sx={{
                      color: '#FFB13B',
                      backgroundColor: '#fff'
                    }}
                  />


                  <p
                    className="
                      text-ink-200
                      text-sm
                    "
                  >
                    {productState.product?.averageRating || 0}
                    {' '}
                    Ratings
                  </p>


                  <p
                    className="
                      ml-3
                      text-sm
                      font-medium
                      text-volt-400
                      hover:text-volt-300
                    "
                  >
                    {productState.product?.reviewCount || 0}
                    {' '}
                    Reviews
                  </p>

                </div>

              </div>


              {/* ==================================================
                  FORM
              ================================================== */}

              <form className="mt-10">


                {/* ==================================================
                    SIZES
                ================================================== */}

                {currentSizes.length > 0 && (

                  <div className="mt-10">

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <h3
                        className="
                          text-sm
                          font-medium
                          text-white
                        "
                      >
                        Size
                      </h3>

                    </div>


                    <fieldset
                      aria-label="Choose a size"
                      className="mt-4"
                    >

                      <div
                        className="
                          grid
                          grid-cols-4
                          gap-3
                        "
                      >

                        {currentSizes.map(
                          (size) => (

                            <label
                              key={size}
                              aria-label={size}
                              className={`
                                group
                                relative
                                flex
                                items-center
                                justify-center
                                rounded-md
                                border
                                p-3
                                cursor-pointer
                                transition-colors

                                ${
                                  selectedSize === size

                                    ? "border-volt-500 bg-volt-500 text-white"

                                    : "border-white/15 bg-white/5 text-ink-100 hover:border-volt-500/50"
                                }
                              `}
                            >

                              <input
                                type="radio"
                                name="size"
                                value={size}
                                checked={
                                  selectedSize === size
                                }
                                onChange={() =>
                                  setSelectedSize(size)
                                }
                                className="sr-only"
                              />


                              <span
                                className="
                                  text-sm
                                  font-medium
                                  uppercase
                                "
                              >
                                {size}
                              </span>

                            </label>

                          )
                        )}

                      </div>

                    </fieldset>

                  </div>

                )}


                {/* ==================================================
                    ADD TO CART BUTTON
                ================================================== */}

                <Button
                  type="button"
                  onClick={handleAddToCart}
                  variant="contained"
                  startIcon={
                    <ShoppingCartOutlinedIcon />
                  }
                  sx={{
                    mt: '20px',
                    px: "2rem",
                    py: "1rem",
                    bgcolor: "#4F7CFF",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textTransform: "none",
                    boxShadow:
                      '0 8px 20px -6px rgba(79,124,255,0.6)',

                    "& .MuiButton-startIcon": {
                      marginRight: "0.5rem",
                    },

                    "&:hover": {
                      bgcolor: "#2F5CF0",
                    },
                  }}
                >
                  Add to Cart
                </Button>


              </form>

            </div>


            {/* ==================================================
                DESCRIPTION / HIGHLIGHTS / DETAILS
            ================================================== */}

            <div
              className="
                py-10
                lg:col-span-2
                lg:col-start-1
                lg:border
                lg:border-white/10
                lg:rounded-xl
                lg:p-6
                lg:pr-8
                lg:pb-16
                lg:mt-5
                lg:bg-ink-600/40
              "
            >

              {/* Description */}

              <div>

                <h3
                  className="
                    text-sm
                    font-mono-tech
                    uppercase
                    tracking-widest
                    text-volt-400
                  "
                >
                  Description
                </h3>


                <div className="space-y-6 mt-3">

                  <p
                    className="
                      text-base
                      text-ink-100
                    "
                  >
                    {productState.product?.description}
                  </p>

                </div>

              </div>


              {/* Highlights */}

              <div className="mt-10">

                <h3
                  className="
                    text-sm
                    font-mono-tech
                    uppercase
                    tracking-widest
                    text-volt-400
                  "
                >
                  Highlights
                </h3>


                <div className="mt-4">

                  <ul
                    role="list"
                    className="
                      list-disc
                      space-y-2
                      pl-4
                      text-sm
                    "
                  >

                    {[
                      ...new Set(
                        productState.product?.highlights || []
                      )
                    ].map(
                      (highlight, index) => (

                        <li
                          key={index}
                          className="text-ink-300"
                        >

                          <span className="text-ink-100">
                            {highlight}
                          </span>

                        </li>

                      )
                    )}

                  </ul>

                </div>

              </div>


              {/* Details */}

              <div className="mt-10">

                <h2
                  className="
                    text-sm
                    font-mono-tech
                    uppercase
                    tracking-widest
                    text-volt-400
                  "
                >
                  Details
                </h2>


                <div className="mt-4 space-y-6">

                  <p
                    className="
                      text-sm
                      text-ink-100
                    "
                  >
                    {product.details}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            PRODUCT REVIEWS
        ================================================== */}

        <section>

          <ProductReviewDisplay
            productId={productState.product?.id}
          />

        </section>


        {/* ==================================================
            SIMILAR PRODUCTS
        ================================================== */}

        <section className="pt-10">

          <h1
            className="
              py-5
              text-xl
              font-display
              font-bold
              text-white
            "
          >
            Similar Products
          </h1>


          <div className="flex flex-wrap -mx-3">

            {similarProducts?.length > 0 ? (

              similarProducts.map(
                (item, index) => (

                  <div
                    key={item.id || index}
                    className="
                      w-full
                      sm:w-1/2
                      md:w-1/3
                      lg:w-1/4
                      px-3
                      mb-6
                    "
                  >

                    <HomeSectionCard
                      product={item}
                    />

                  </div>

                )
              )

            ) : (

              <p className="text-ink-200">
                No similar products found.
              </p>

            )}

          </div>

        </section>


        {/* ==================================================
            CUSTOMER LOGIN MODAL
        ================================================== */}

        <AuthModel
          open={openAuthModel}
          handleClose={() =>
            setOpenAuthModel(false)
          }
        />

      </div>

    </div>

  );
}