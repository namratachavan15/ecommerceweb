import React, { useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../state/Auth/Action";

const darkField = {
  "& .MuiInputBase-root": {
    color: "#F4F6FB",
    fontSize: "15px",
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

const RegisterForm = ({ onLogin }) => {
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      mobile: data.get("mobile"),
    };

    dispatch(register(userData));
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",

        minHeight: {
          xs: "auto",
          md: "650px",
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

          alignItems: "center",

          justifyContent: "center",

          flexDirection: "column",

          px: {
            xs: 3,
            md: 3.5,
          },

          py: {
            xs: 4,
            md: 5,
          },

          borderRight:
            "1px solid rgba(255,255,255,0.10)",

          textAlign: "center",
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
          Join
          <br />
          NovaTech
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.78)",

            fontSize: {
              xs: "15px",
              md: "17px",
            },

            lineHeight: 1.55,

            maxWidth: "190px",
          }}
        >
          Create an account to track orders and unlock member-only pricing.
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

            fontWeight: 800,

            lineHeight: 1.2,

            mb: 2.5,
          }}
        >
          Create Account
        </Typography>

        {/* ================= REGISTER FORM ================= */}

        <form onSubmit={handleSubmit}>

          <Grid container spacing={1.5}>

            {/* First Name */}

            <Grid size={12}>
              <TextField
                sx={darkField}
                label="First Name"
                name="firstName"
                fullWidth
                required
              />
            </Grid>

            {/* Last Name */}

            <Grid size={12}>
              <TextField
                sx={darkField}
                label="Last Name"
                name="lastName"
                fullWidth
                required
              />
            </Grid>

            {/* Email */}

            <Grid size={12}>
              <TextField
                sx={darkField}
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
              />
            </Grid>

            {/* Mobile */}

            <Grid size={12}>
              <TextField
                sx={darkField}
                label="Mobile Number"
                name="mobile"
                type="tel"
                fullWidth
                required
                inputProps={{
                  maxLength: 10,
                }}
              />
            </Grid>

            {/* Password */}

            <Grid size={12}>
              <TextField
                sx={darkField}
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
              />
            </Grid>

          </Grid>

          {/* ================= REGISTER BUTTON ================= */}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2.5,

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
            Register
          </Button>

        </form>

        {/* ================= LOGIN ================= */}

        <Typography
          variant="body2"
          sx={{
            mt: 2.5,

            textAlign: "center",

            color: "#8993AC",

            fontSize: "14px",
          }}
        >
          Already have an account?

          <Button
            onClick={onLogin}
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
            Login
          </Button>
        </Typography>

      </Grid>
    </Grid>
  );
};

export default RegisterForm;