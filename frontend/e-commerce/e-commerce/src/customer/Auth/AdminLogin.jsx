import React, { useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/Auth/Action";

const darkField = {
  "& .MuiInputBase-root": { color: "#F4F6FB" },
  "& .MuiInputLabel-root": { color: "#8993AC" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#4F7CFF" },
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

const AdminLogin = () => {
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
        // Customer accidentally tries to login from /login
        navigate("/");
      }
    }
  }, [auth?.jwt, auth?.role, navigate]);

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        bgcolor: "#0C111F",
      }}
    >

      {/* Left Side */}
      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{
          background:
            "radial-gradient(circle at 30% 20%, #2F5CF0 0%, #0C111F 70%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 5,
        }}
      >
        <Typography
          sx={{ fontFamily: "Sora, sans-serif" }}
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Admin Portal
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          sx={{ opacity: 0.75 }}
        >
          Sign in to access the NovaTech administration dashboard.
        </Typography>
      </Grid>

      {/* Right Side */}
      <Grid
        size={{ xs: 12, md: 7 }}
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0C111F",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Sora, sans-serif",
            color: "#fff",
          }}
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Admin Sign In
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            label="Admin Email"
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
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#4F7CFF",
              "&:hover": {
                backgroundColor: "#2F5CF0",
              },
            }}
          >
            Admin Login
          </Button>

        </form>

        <Typography
          variant="body2"
          sx={{
            mt: 3,
            textAlign: "center",
            color: "#8993AC",
          }}
        >
          Customer?
          <Button
            onClick={() => navigate("/")}
            sx={{
              color: "#4F7CFF",
              textTransform: "none",
            }}
          >
            Back to Website
          </Button>
        </Typography>

      </Grid>
    </Grid>
  );
};

export default AdminLogin;