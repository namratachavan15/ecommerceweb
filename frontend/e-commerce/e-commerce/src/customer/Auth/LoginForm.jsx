import React, { useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/Auth/Action";

const darkField = {
  "& .MuiInputBase-root": {
    color: "#F4F6FB",
    fontSize: "16px",
  },

  "& .MuiInputLabel-root": {
    color: "#8993AC",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4F7CFF",
  },

  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.15)",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4F7CFF",
  },

  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4F7CFF",
  },
};

const LoginForm = ({ handleClose, onRegister }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (auth?.jwt && auth?.role) {
      if (auth.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      if (handleClose) {
        handleClose();
      }
    }
  }, [auth?.jwt, auth?.role, navigate, handleClose]);

  return (
    <Grid
      container
      sx={{
        width: "100%",
        minHeight: {
          xs: "auto",
          md: "500px",
        },

        bgcolor: "#0C111F",
      }}
    >

      {/* ================= LEFT SIDE ================= */}

      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{
          background:
            "linear-gradient(180deg, #3159D8 0%, #17327D 45%, #0C111F 100%)",

          color: "#fff",

          display: "flex",

          alignItems: {
            xs: "center",
            md: "flex-start",
          },

          justifyContent: "center",

          flexDirection: "column",

          px: {
            xs: 4,
            md: 2.5,
          },

          py: {
            xs: 4,
            md: 5,
          },

          borderRight: "1px solid rgba(255,255,255,0.10)",

          textAlign: {
            xs: "center",
            md: "left",
          },
        }}
      >

        <Typography
          sx={{
            fontFamily: "Sora, sans-serif",

            fontSize: {
              xs: "30px",
              md: "38px",
            },

            lineHeight: 1.15,

            fontWeight: 800,

            mb: 2,
          }}
        >
          Welcome
          <br />
          Back
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.78)",

            fontSize: {
              xs: "15px",
              md: "18px",
            },

            lineHeight: 1.5,

            maxWidth: "190px",

            textAlign: {
              xs: "center",
              md: "center",
            },

            alignSelf: {
              xs: "center",
              md: "center",
            },
          }}
        >
          Sign in to track orders, save carts and unlock member pricing.
        </Typography>
      </Grid>

      {/* ================= RIGHT SIDE ================= */}

      <Grid
        size={{ xs: 12, md: 7 }}
        sx={{
          px: {
            xs: 3,
            sm: 4,
            md: 5.5,
          },

          py: {
            xs: 4,
            md: 5,
          },

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          bgcolor: "#0C111F",
        }}
      >

        <Typography
          sx={{
            fontFamily: "Sora, sans-serif",

            color: "#fff",

            fontSize: {
              xs: "27px",
              md: "30px",
            },

            lineHeight: 1.2,

            fontWeight: 800,

            mb: 2.5,
          }}
        >
          Customer Sign In
        </Typography>

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit}>

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            sx={darkField}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            sx={darkField}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,

              py: 1.5,

              borderRadius: "5px",

              fontWeight: 700,

              fontSize: "15px",

              textTransform: "none",

              backgroundColor: "#4F7CFF",

              boxShadow:
                "0 8px 25px -6px rgba(79,124,255,0.7)",

              "&:hover": {
                backgroundColor: "#2F5CF0",
              },
            }}
          >
            Sign In
          </Button>

        </form>

        {/* ================= REGISTER ================= */}

        <Typography
          variant="body2"
          sx={{
            mt: 3,

            textAlign: "center",

            color: "#8993AC",

            fontSize: "14px",
          }}
        >
          Don't have an account?

          <Button
            onClick={onRegister}
            sx={{
              color: "#4F7CFF",

              textTransform: "none",

              fontWeight: 600,

              display: "block",

              mx: "auto",

              mt: 0.5,

              minWidth: "auto",

              padding: 0,

              "&:hover": {
                backgroundColor: "transparent",

                color: "#6B91FF",
              },
            }}
          >
            Register
          </Button>
        </Typography>

      </Grid>
    </Grid>
  );
};

export default LoginForm;