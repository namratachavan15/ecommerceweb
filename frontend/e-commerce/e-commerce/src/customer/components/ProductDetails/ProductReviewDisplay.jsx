import React, { useEffect, useState } from "react";
import {
  Box,
  Rating,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { api } from "../../../config/apiConfig";

const ProductReviewDisplay = ({ productId }) => {

  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // ============================
  // FETCH REVIEWS
  // ============================
  const fetchReviews = async () => {
    try {

      const res = await api.get(
        `/api/reviews/product/${productId}`
      );

      console.log("REVIEWS:", res.data);

      setReviews(res.data);

    } catch (error) {

      console.error("Error fetching reviews:", error);

    }
  };


  // ============================
  // FETCH RATINGS
  // ============================
  const fetchRatings = async () => {

    try {

      const res = await api.get(
        `/api/ratings/product/${productId}`
      );

      console.log("RATINGS:", res.data);

      const ratingData = res.data || [];

      setRatings(ratingData);

      // Average rating
      if (ratingData.length > 0) {

        const avg =
          ratingData.reduce(
            (acc, curr) => acc + Number(curr.rating),
            0
          ) / ratingData.length;

        setAvgRating(avg);

      } else {

        setAvgRating(0);

      }

    } catch (error) {

      console.error("Error fetching ratings:", error);

    }
  };


  // ============================
  // FETCH DATA
  // ============================
  useEffect(() => {

    if (productId) {

      fetchReviews();
      fetchRatings();

    }

  }, [productId]);


  // ============================
  // FIND RATING FOR REVIEW
  // ============================
  const getRatingForReview = (review) => {

    if (!review?.user?.id) {
      return 0;
    }

    const matchingRating = ratings.find((rating) => {

      const sameUser =
        Number(rating.userId) === Number(review.user.id);

      const sameTime =
        rating.createdAt === review.createdAt;

      return sameUser && sameTime;
    });

    return matchingRating
      ? Number(matchingRating.rating)
      : 0;
  };


  // ============================
  // VISIBLE REVIEWS
  // ============================
  const visibleReviews = showAll
    ? reviews
    : reviews.slice(0, 4);


  return (

    <Box
      sx={{
        width: "100%",
        mt: { xs: 3, sm: 4, md: 5 },
        px: { xs: 1, sm: 2, md: 0 },
        boxSizing: "border-box",
      }}
    >

      {/* ============================= */}
      {/* HEADING */}
      {/* ============================= */}

      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          fontFamily: "Sora, sans-serif",
          fontWeight: 700,
          fontSize: {
            xs: "18px",
            sm: "20px",
            md: "22px",
          },
          mb: 2,
        }}
      >
        Customer Reviews & Ratings
      </Typography>


      {/* ============================= */}
      {/* AVERAGE RATING */}
      {/* ============================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: { xs: 0.5, sm: 1 },
          mb: 3,
        }}
      >

        <Rating
          value={avgRating}
          precision={0.5}
          readOnly
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#FFB13B",
            },

            "& .MuiRating-iconEmpty": {
              color: "#4B5563",
            },
          }}
        />


        <Typography
          sx={{
            color: "#F4F6FB",
            fontSize: {
              xs: "13px",
              sm: "14px",
            },
          }}
        >
          {avgRating.toFixed(1)} / 5
        </Typography>


        <Typography
          sx={{
            color: "#8993AC",
            fontSize: {
              xs: "13px",
              sm: "14px",
            },
          }}
        >
          ({ratings.length} Ratings)
        </Typography>

      </Box>


      {/* ============================= */}
      {/* REVIEWS */}
      {/* ============================= */}

      {reviews.length > 0 ? (

        <>

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },

              gap: {
                xs: 1.5,
                sm: 2,
                md: 2.5,
              },

              width: "100%",
            }}
          >

            {visibleReviews.map((r) => {

              // ⭐ Get matching rating
              const userRating = getRatingForReview(r);

              console.log(
                "Review:",
                r.id,
                "User:",
                r.user?.firstName,
                "Rating:",
                userRating
              );


              return (

                <Box
                  key={r.id}
                  sx={{
                    width: "100%",
                    minWidth: 0,
                    boxSizing: "border-box",

                    border:
                      "1px solid rgba(255,255,255,0.1)",

                    borderRadius: "10px",

                    p: {
                      xs: 1.5,
                      sm: 2,
                    },

                    backgroundColor: "#171F36",

                    overflow: "hidden",
                  }}
                >

                  {/* ============================= */}
                  {/* USER */}
                  {/* ============================= */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: 0,
                      mb: 1.5,
                    }}
                  >

                    <Avatar
                      sx={{
                        bgcolor: "#4F7CFF",
                        mr: 1,

                        width: {
                          xs: 36,
                          sm: 40,
                        },

                        height: {
                          xs: 36,
                          sm: 40,
                        },

                        flexShrink: 0,
                      }}
                    >
                      {r.user?.firstName?.[0] || "U"}
                    </Avatar>


                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#F4F6FB",
                        minWidth: 0,

                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.user?.firstName || "Anonymous"}
                    </Typography>

                  </Box>


                  {/* ============================= */}
                  {/* USER RATING */}
                  {/* ============================= */}

                  <Rating
                    value={userRating}
                    precision={0.5}
                    readOnly
                    size="small"

                    sx={{
                      mb: 1,

                      "& .MuiRating-iconFilled": {
                        color: "#FFB13B",
                      },

                      "& .MuiRating-iconEmpty": {
                        color: "#4B5563",
                      },
                    }}
                  />


                  {/* ============================= */}
                  {/* REVIEW */}
                  {/* ============================= */}

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#8993AC",

                      wordBreak: "break-word",

                      overflowWrap: "anywhere",

                      lineHeight: 1.6,
                    }}
                  >
                    {r.review}
                  </Typography>

                </Box>

              );

            })}

          </Box>


          {/* ============================= */}
          {/* VIEW ALL */}
          {/* ============================= */}

          {reviews.length > 4 && (

            <Box
              sx={{
                textAlign: "center",
                mt: 3,
              }}
            >

              <Button
                variant="outlined"

                onClick={() =>
                  setShowAll(!showAll)
                }

                sx={{
                  color: "#4F7CFF",
                  borderColor: "#4F7CFF",
                  textTransform: "none",

                  "&:hover": {
                    borderColor: "#2F5CF0",
                    bgcolor:
                      "rgba(79,124,255,0.08)",
                  },
                }}
              >
                {showAll
                  ? "Show Less"
                  : "View All Reviews"}
              </Button>

            </Box>

          )}

        </>

      ) : (

        <Typography
          variant="body2"
          sx={{
            color: "#8993AC",
          }}
        >
          No reviews yet.
        </Typography>

      )}

    </Box>
  );
};

export default ProductReviewDisplay;