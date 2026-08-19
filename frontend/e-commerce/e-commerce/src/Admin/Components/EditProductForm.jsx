import React, { useState, useEffect } from "react";
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
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../state/Product/Action";

// Default sizes (same as CreateProductForm)
const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111729",
  border: "1px solid rgba(255,255,255,0.08)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#F4F6FB",
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "#0C111F",
  border: "1px solid rgba(79,124,255,0.3)",
  borderRadius: "10px",
  boxShadow: "0 30px 80px -20px rgba(0,0,0,0.8)",
  p: 4,
};

const EditProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();

  console.log("editproduct form",product)
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    size: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
    highlights: [""],
  });

  // ✅ Pre-fill form with existing data
  useEffect(() => {
    if (product) {
      setProductData({
        imageUrl: product.imageUrl || "",
        brand: product.brand || "",
        title: product.title || "",
        color: product.color || "",
        discountedPrice: product.discountedPrice || "",
        price: product.price || "",
        discountPercent: product.discountPercent?.toString() || "", 

        quantity: product.quantity || "",
        description: product.description || "",
        highlights:
          product.highlights && product.highlights.length > 0
            ? product.highlights
            : [""],
  
        // ✅ Correctly use backend field name "sizes"
        size: product.sizes && product.sizes.length > 0 ? product.sizes : initialSizes,
  
        // ✅ Extract nested category levels
        topLevelCategory:
          product.category?.parentCategory?.parentCategory?.name || "",
        secondLevelCategory:
          product.category?.parentCategory?.name || "",
        thirdLevelCategory:
          product.category?.name || "",
      });
    }
  }, [product]);
  

  // Handle normal input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle size change (S/M/L quantities)
  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name = name === "size_quantity" ? "quantity" : name;
    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prev) => ({
      ...prev,
      size: sizes,
    }));
  };

  // Highlights logic
  const handleHighlightChange = (value, index) => {
    const updated = [...productData.highlights];
    updated[index] = value;
    setProductData((prev) => ({ ...prev, highlights: updated }));
  };

  const addHighlightField = () => {
    setProductData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  const removeHighlightField = (index) => {
    const updated = [...productData.highlights];
    updated.splice(index, 1);
    setProductData((prev) => ({
      ...prev,
      highlights: updated,
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      ...productData,
      price: Number(productData.price),
      discountedPrice: Number(productData.discountedPrice),
      discountPercent: Number(productData.discountPercent),
      quantity: Number(productData.quantity),
      sizes: productData.size.map((s) => ({
        name: s.name,
        quantity: Number(s.quantity),
      })),
      highlights: productData.highlights.filter((h) => h.trim() !== ""),
    };
  
    await dispatch(updateProduct(product.id, payload));
    alert("✅ Product updated successfully!");
    onClose();
  };
  

  return (
    <Modal open={!!product} onClose={onClose}>
      <Box sx={modalStyle} className="mui-dark-form">
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 2, fontWeight: 700, color: "#fff", fontFamily: "Sora, sans-serif" }}
        >
          Edit Product - {product?.title}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* Image URL + Preview */}
              <Grid size={3}>
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
                      alt="Preview"
                      style={{
                        marginTop: "10px",
                        maxHeight: "200px",
                        objectFit: "contain",
                        borderRadius: "4px",
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                </Item>
              </Grid>

              <Grid size={3}>
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

              <Grid size={3}>
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

              <Grid size={3}>
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

              <Grid size={3}>
                <Item>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={productData.price}
                    onChange={handleChange}
                  />
                </Item>
              </Grid>

              <Grid size={3}>
                <Item>
                  <TextField
                    fullWidth
                    label="Discounted Price"
                    name="discountedPrice"
                    type="number"
                    value={productData.discountedPrice}
                    onChange={handleChange}
                  />
                </Item>
              </Grid>

              <Grid size={3}>
                <Item>
                  <TextField
                    fullWidth
                    label="Discount Percent"
                    name="discountPercent" 
                    type="number"
                    value={productData.discountPercent}
                    onChange={handleChange}
                  />
                </Item>
              </Grid>

              <Grid size={3}>
                <Item>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={productData.quantity}
                    onChange={handleChange}
                  />
                </Item>
              </Grid>

              {/* Categories */}
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

              <Grid size={4}>
                <Item>
                  <FormControl fullWidth>
                    <InputLabel>Second Level Category</InputLabel>
                    <Select
                      name="secondLevelCategory"
                      value={productData.secondLevelCategory}
                      onChange={handleChange}
                    >
                      <MenuItem value="clothing">Clothing</MenuItem>
                      <MenuItem value="accessories">Accessories</MenuItem>
                      <MenuItem value="shoes">Shoes</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Grid>

              <Grid size={4}>
                <Item>
                  <FormControl fullWidth>
                    <InputLabel>Third Level Category</InputLabel>
                    <Select
                      name="thirdLevelCategory"
                      value={productData.thirdLevelCategory}
                      onChange={handleChange}
                    >
                      <MenuItem value="t_shirts">T-Shirts</MenuItem>
                      <MenuItem value="shirt">Shirts</MenuItem>
                      <MenuItem value="saree">Saree</MenuItem>
                      <MenuItem value="kurta">Kurta</MenuItem>
                      <MenuItem value="mens_shoes">Mens Shoes</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Grid>

              {/* Highlights */}
              <Grid size={6}>
                <Item>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 600, textAlign: "left", color: "#4F7CFF", fontFamily: "Sora, sans-serif" }}
                  >
                    Highlights
                  </Typography>

                  {productData.highlights.map((highlight, index) => (
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
                          handleHighlightChange(e.target.value, index)
                        }
                      />
                      <Button
                        variant="outlined"
                        onClick={() => removeHighlightField(index)}
                        disabled={productData.highlights.length === 1}
                        sx={{ color: '#F87171', borderColor: 'rgba(248,113,113,0.4)', '&:hover': { borderColor: '#F87171', bgcolor: 'rgba(248,113,113,0.08)' } }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}

                  <Button
                    variant="contained"
                    onClick={addHighlightField}
                    sx={{ mt: 1, bgcolor: '#4F7CFF', textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#2F5CF0' } }}
                  >
                    + Add Highlight
                  </Button>
                </Item>
              </Grid>

              {/* Description */}
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

              {/* Size & Quantity (S, M, L) */}
             {productData.size.map((size, index) => (
  <React.Fragment key={index}>
    <Grid size={6}>
      <Item>
        <TextField
          fullWidth
          label="Size Name"
          name="name"
          value={size.name}
          onChange={(e) => handleSizeChange(e, index)}
          required
        />
      </Item>
    </Grid>
    <Grid size={6}>
      <Item>
        <TextField
          fullWidth
          label="Quantity"
          name="size_quantity"
          type="number"
          value={size.quantity}
          onChange={(e) => handleSizeChange(e, index)}
          required
        />
      </Item>
    </Grid>
  </React.Fragment>
))}


              {/* Submit */}
              <Grid item xs={12}>
                <Item>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    size="large"
                    sx={{ bgcolor: '#4F7CFF', textTransform: 'none', fontWeight: 700, py: 1.3, boxShadow: '0 8px 20px -6px rgba(79,124,255,0.6)', '&:hover': { bgcolor: '#2F5CF0' } }}
                  >
                    Save Changes
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProductForm;
