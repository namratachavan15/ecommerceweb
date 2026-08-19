import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../state/Product/Action";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

// ----------------------------------------------------
// CATEGORY-WISE SIZE OPTIONS
// ----------------------------------------------------

const categorySizeOptions = {
  // Clothing
  top: ["S", "M", "L", "XL"],
  women_dress: ["S", "M", "L", "XL"],
  sweater: ["S", "M", "L", "XL"],
  "t-shirt": ["S", "M", "L", "XL"],
  jacket: ["S", "M", "L", "XL"],
  kurtas: ["S", "M", "L", "XL"],
  mens_kurta: ["S", "M", "L", "XL"],
  shirt: ["S", "M", "L", "XL"],

  // Jeans
  women_jeans: ["28", "30", "32", "34", "36", "38"],
  men_jeans: ["28", "30", "32", "34", "36", "38"],

  // Shoes
  shoes: ["6", "7", "8", "9", "10", "11"],
};

// Categories which require sizes
const sizeRequiredCategories = Object.keys(categorySizeOptions);

// ----------------------------------------------------
// PAPER ITEM
// ----------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111729",
  border: "1px solid rgba(255,255,255,0.08)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#F4F6FB",
}));

// ----------------------------------------------------
// CREATE PRODUCT FORM
// ----------------------------------------------------

const CreateProductForm = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",

    price: "",
    discountPercent: "",
    discountedPrice: "",

    quantity: "",

    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",

    description: "",

    highlights: [""],

    sizes: [],
  });

  // ----------------------------------------------------
  // CHECK WHETHER SELECTED CATEGORY REQUIRES SIZE
  // ----------------------------------------------------

  const requiresSize = sizeRequiredCategories.includes(
    productData.thirdLevelCategory
  );

  // ----------------------------------------------------
  // GET SIZE OPTIONS
  // ----------------------------------------------------

  const getSizeOptions = (category) => {
    return categorySizeOptions[category] || [];
  };

  // ----------------------------------------------------
  // TOTAL SIZE QUANTITY
  // ----------------------------------------------------

  const totalSizeQuantity = productData.sizes.reduce(
    (total, size) => total + Number(size.quantity || 0),
    0
  );

  // ----------------------------------------------------
  // DISCOUNT CALCULATION
  // ----------------------------------------------------

  const calculateDiscountedPrice = (price, discountPercent) => {
    if (price === "" || discountPercent === "") {
      return "";
    }

    const p = Number(price);
    const d = Number(discountPercent);

    if (isNaN(p) || isNaN(d)) {
      return "";
    }

    return Math.round(p - (p * d) / 100);
  };

  // ----------------------------------------------------
  // HANDLE NORMAL INPUT CHANGE
  // ----------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // ----------------------------------------------
      // PRICE + DISCOUNT
      // ----------------------------------------------

      if (name === "price" || name === "discountPercent") {
        const price = name === "price" ? value : prev.price;

        const discountPercent =
          name === "discountPercent"
            ? value
            : prev.discountPercent;

        updated.discountedPrice = calculateDiscountedPrice(
          price,
          discountPercent
        );
      }

      // ----------------------------------------------
      // THIRD LEVEL CATEGORY CHANGE
      // ----------------------------------------------

      if (name === "thirdLevelCategory") {
        const sizeOptions = getSizeOptions(value);

        if (sizeOptions.length > 0) {
          // Category requires sizes
          updated.sizes = sizeOptions.map((size) => ({
            name: size,
            quantity: 0,
          }));

          // Normal quantity should be cleared
          updated.quantity = "";
        } else {
          // Category does NOT require sizes
          updated.sizes = [];

          // User will enter normal quantity
          updated.quantity = "";
        }
      }

      return updated;
    });
  };

  // ----------------------------------------------------
  // HANDLE SIZE QUANTITY CHANGE
  // ----------------------------------------------------

  const handleSizeQuantityChange = (e, index) => {
    const { value } = e.target;

    setProductData((prev) => {
      const updatedSizes = [...prev.sizes];

      updatedSizes[index] = {
        ...updatedSizes[index],
        quantity: value,
      };

      return {
        ...prev,
        sizes: updatedSizes,
      };
    });
  };

  // ----------------------------------------------------
  // HANDLE HIGHLIGHT CHANGE
  // ----------------------------------------------------

  const handleHighlightChange = (value, index) => {
    const updatedHighlights = [...productData.highlights];

    updatedHighlights[index] = value;

    setProductData((prev) => ({
      ...prev,
      highlights: updatedHighlights,
    }));
  };

  // ----------------------------------------------------
  // ADD HIGHLIGHT
  // ----------------------------------------------------

  const addHighlightField = () => {
    setProductData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  // ----------------------------------------------------
  // REMOVE HIGHLIGHT
  // ----------------------------------------------------

  const removeHighlightField = (index) => {
    const updatedHighlights = [...productData.highlights];

    updatedHighlights.splice(index, 1);

    setProductData((prev) => ({
      ...prev,
      highlights: updatedHighlights,
    }));
  };

  // ----------------------------------------------------
  // SUBMIT
  // ----------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalProductData = {
      ...productData,

      // Size category -> sum of all size quantities
      // Non-size category -> normal quantity
      quantity: requiresSize
        ? totalSizeQuantity
        : Number(productData.quantity),

      // Size category -> sizes
      // Non-size category -> empty array
      sizes: requiresSize
        ? productData.sizes.map((size) => ({
            name: size.name,
            quantity: Number(size.quantity || 0),
          }))
        : [],
    };

    console.log("Final Product:", finalProductData);

    dispatch(createProduct(finalProductData));
  };

  // ----------------------------------------------------
  // JSX
  // ----------------------------------------------------

  return (
    <div className="p-4 sm:p-10 bg-ink-900 min-h-screen mui-dark-form">

      {/* --------------------------------------------- */}
      {/* TITLE */}
      {/* --------------------------------------------- */}

      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#fff",
          fontFamily: "Sora, sans-serif",
          fontWeight: 800,
        }}
        className="py-6 text-center"
      >
        Add New Product
      </Typography>

      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>

            {/* --------------------------------------- */}
            {/* IMAGE URL */}
            {/* --------------------------------------- */}

            <Grid size={6}>
              <Item>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  value={productData.imageUrl}
                  onChange={handleChange}
                />

                {productData.imageUrl && (
                  <img
                    src={productData.imageUrl}
                    alt="Product Preview"
                    style={{
                      marginTop: "10px",
                      maxHeight: "200px",
                      maxWidth: "100%",
                      objectFit: "contain",
                      borderRadius: "4px",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* BRAND */}
            {/* --------------------------------------- */}

            <Grid size={6}>
              <Item>
                <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                />
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* TITLE */}
            {/* --------------------------------------- */}

            <Grid size={6}>
              <Item>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                />
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* COLOR */}
            {/* --------------------------------------- */}

            <Grid size={6}>
              <Item>
                <TextField
                  fullWidth
                  label="Color"
                  name="color"
                  value={productData.color}
                  onChange={handleChange}
                />
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* NORMAL QUANTITY */}
            {/* --------------------------------------- */}

            {!requiresSize && (
              <Grid size={6}>
                <Item>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={productData.quantity}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                  />
                </Item>
              </Grid>
            )}

            {/* --------------------------------------- */}
            {/* PRICE */}
            {/* --------------------------------------- */}

            <Grid size={6}>
              <Item>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={productData.price}
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
                />
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* DISCOUNT PERCENT */}
            {/* --------------------------------------- */}

            <Grid size={6}>
              <Item>
                <TextField
                  fullWidth
                  label="Discount Percent"
                  name="discountPercent"
                  type="number"
                  value={productData.discountPercent}
                  onChange={handleChange}
                  inputProps={{
                    min: 0,
                    max: 100,
                  }}
                />
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* DISCOUNTED PRICE */}
            {/* --------------------------------------- */}

            <Grid size={6}>
              <Item>
                <TextField
                  fullWidth
                  label="Discounted Price"
                  name="discountedPrice"
                  type="number"
                  value={productData.discountedPrice}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* TOP LEVEL CATEGORY */}
            {/* --------------------------------------- */}

            <Grid size={4}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel>Top Level Category</InputLabel>

                  <Select
                    name="topLevelCategory"
                    value={productData.topLevelCategory}
                    onChange={handleChange}
                  >
                    <MenuItem value="men">Men</MenuItem>
                    <MenuItem value="women">Women</MenuItem>
                    <MenuItem value="kids">Kids</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* SECOND LEVEL CATEGORY */}
            {/* --------------------------------------- */}

            <Grid size={4}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel>Second Level Category</InputLabel>

                  <Select
                    name="secondLevelCategory"
                    value={productData.secondLevelCategory}
                    onChange={handleChange}
                  >
                    <MenuItem value="clothing">
                      Clothing
                    </MenuItem>

                    <MenuItem value="accessories">
                      Accessories
                    </MenuItem>

                    <MenuItem value="brands">
                      Brands
                    </MenuItem>

                    <MenuItem value="shoes">
                      Shoes
                    </MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* THIRD LEVEL CATEGORY */}
            {/* --------------------------------------- */}

            <Grid size={4}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel>Third Level Category</InputLabel>

                  <Select
                    name="thirdLevelCategory"
                    value={productData.thirdLevelCategory}
                    onChange={handleChange}
                  >
                    <MenuItem value="top">
                      Tops
                    </MenuItem>

                    <MenuItem value="women_dress">
                      Women Dresses
                    </MenuItem>

                    <MenuItem value="t-shirt">
                      T-Shirts
                    </MenuItem>

                    <MenuItem value="women_saree">
                      Women Saree
                    </MenuItem>

                    <MenuItem value="lengha_choli">
                      Lengha Choli
                    </MenuItem>

                    <MenuItem value="sweater">
                      Sweater
                    </MenuItem>

                    <MenuItem value="jacket">
                      Jacket
                    </MenuItem>

                    <MenuItem value="kurtas">
                      Kurtas
                    </MenuItem>

                    <MenuItem value="mens_kurta">
                      Men's Kurta
                    </MenuItem>

                    <MenuItem value="shirt">
                      Men's Shirt
                    </MenuItem>

                    <MenuItem value="women_jeans">
                      Women's Jeans
                    </MenuItem>

                    <MenuItem value="men_jeans">
                      Men's Jeans
                    </MenuItem>

                    <MenuItem value="shoes">
                      Shoes
                    </MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* HIGHLIGHTS */}
            {/* --------------------------------------- */}

            <Grid size={6}>
              <Item>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    textAlign: "left",
                    color: "#4F7CFF",
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  Highlights
                </Typography>

                {productData.highlights.map(
                  (highlight, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <TextField
                        fullWidth
                        label={`Highlight ${index + 1}`}
                        value={highlight}
                        onChange={(e) =>
                          handleHighlightChange(
                            e.target.value,
                            index
                          )
                        }
                      />

                      <Button
                        variant="outlined"
                        onClick={() =>
                          removeHighlightField(index)
                        }
                        disabled={
                          productData.highlights.length === 1
                        }
                        sx={{
                          color: "#F87171",
                          borderColor:
                            "rgba(248,113,113,0.4)",
                          "&:hover": {
                            borderColor: "#F87171",
                            bgcolor:
                              "rgba(248,113,113,0.08)",
                          },
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  )
                )}

                <Button
                  variant="contained"
                  onClick={addHighlightField}
                  sx={{
                    mt: 1,
                    bgcolor: "#4F7CFF",
                    textTransform: "none",
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: "#2F5CF0",
                    },
                  }}
                >
                  + Add Highlight
                </Button>
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* DESCRIPTION */}
            {/* --------------------------------------- */}

            <Grid size={6}>
              <Item>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={productData.description}
                  onChange={handleChange}
                />
              </Item>
            </Grid>

            {/* --------------------------------------- */}
            {/* CATEGORY-WISE SIZES */}
            {/* --------------------------------------- */}

            {requiresSize && (
              <>
                <Grid size={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#4F7CFF",
                      fontWeight: 700,
                      fontFamily: "Sora, sans-serif",
                      mt: 2,
                    }}
                  >
                    Size & Quantity
                  </Typography>
                </Grid>

                {productData.sizes.map((size, index) => (
                  <React.Fragment key={size.name}>
                    {/* SIZE */}
                    <Grid size={6}>
                      <Item>
                        <TextField
                          fullWidth
                          label="Size"
                          value={size.name}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Item>
                    </Grid>

                    {/* SIZE QUANTITY */}
                    <Grid size={6}>
                      <Item>
                        <TextField
                          fullWidth
                          label={`Quantity for ${size.name}`}
                          type="number"
                          value={size.quantity}
                          onChange={(e) =>
                            handleSizeQuantityChange(
                              e,
                              index
                            )
                          }
                          inputProps={{
                            min: 0,
                          }}
                        />
                      </Item>
                    </Grid>
                  </React.Fragment>
                ))}

                {/* TOTAL QUANTITY */}
                <Grid size={6}>
                  <Item>
                    <TextField
                      fullWidth
                      label="Total Quantity"
                      value={totalSizeQuantity}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Item>
                </Grid>
              </>
            )}

            {/* --------------------------------------- */}
            {/* SUBMIT BUTTON */}
            {/* --------------------------------------- */}

            <Grid size={3}>
              <Item>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{
                    bgcolor: "#4F7CFF",
                    textTransform: "none",
                    fontWeight: 700,
                    py: 1.3,
                    boxShadow:
                      "0 8px 20px -6px rgba(79,124,255,0.6)",

                    "&:hover": {
                      bgcolor: "#2F5CF0",
                    },
                  }}
                >
                  Add New Product
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default CreateProductForm;