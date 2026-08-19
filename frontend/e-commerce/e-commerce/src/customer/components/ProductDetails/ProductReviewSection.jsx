import React, { useState } from "react";
import {
  Box,
  Rating,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/apiConfig";

const ProductReviewSection = ({ productId }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      alert("Please log in to submit a review.");
      return;
    }

    if (!reviewText.trim() || ratingValue === 0) {
      alert(
        "Please write a review and give a rating before submitting."
      );
      return;
    }

    try {
      // CREATE REVIEW
      const reviewReq = {
        productId: productId,
        review: reviewText.trim(),
      };

      await api.post("/api/reviews/create", reviewReq, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // CREATE RATING
      const ratingReq = {
        productId: productId,
        rating: ratingValue,
      };

      await api.post("/api/ratings/create", ratingReq, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReviewText("");
      setRatingValue(0);

      alert(
        "Thank you! Your review and rating have been submitted."
      );

      navigate("/");
    } catch (error) {
      console.error("Error submitting review:", error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong while submitting. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
        boxSizing: "border-box",
        mt: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
     
    >
      {/* TITLE */}
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          fontFamily: "Sora, sans-serif",
          fontWeight: 700,
          fontSize: {
            xs: "18px",
            sm: "20px",
          },
          lineHeight: 1.4,
          mb: 1.5,
        }}
      >
        Write a Review for this Product
      </Typography>

      {/* RATING */}
      <Box
        sx={{
          display: "inline-flex",
          backgroundColor: "#fff",
          borderRadius: "4px",
          px: 0.5,
          mb: 1,
        }}
      >
        <Rating
          name="user-rating"
          value={ratingValue}
          onChange={(e, val) => setRatingValue(val || 0)}
          size="medium"
        />
      </Box>

      {/* REVIEW TEXT */}
      <TextField
        fullWidth
        multiline
        rows={4}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: "100%",
          boxSizing: "border-box",

          mt: 1,

          "& .MuiInputBase-root": {
            color: "#F4F6FB",
            width: "100%",
            boxSizing: "border-box",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.15)",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4F7CFF",
          },

          "& .MuiInputBase-input": {
            fontSize: {
              xs: "14px",
              sm: "15px",
            },
          },
        }}
      />

      {/* BUTTON */}
      <Button
        fullWidth={false}
        variant="contained"
        onClick={handleSubmit}
        sx={{
          mt: 2,
          px: 3,
          py: 1,
          bgcolor: "#4F7CFF",
          textTransform: "none",
          fontWeight: 700,
          width: {
            xs: "100%",
            sm: "auto",
          },
          "&:hover": {
            bgcolor: "#2F5CF0",
          },
        }}
      >
        Submit Review
      </Button>
    </Box>
  );
};

export default ProductReviewSection;