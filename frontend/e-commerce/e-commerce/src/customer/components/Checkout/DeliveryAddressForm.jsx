import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import AddressCart from "../AddressCart/AddressCart";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../state/Order/Action";
import { useNavigate } from "react-router-dom";

const darkField = {
  "& .MuiInputBase-root": {
    color: "#F4F6FB",
  },

  "& .MuiInputLabel-root": {
    color: "#8993AC",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4F7CFF",
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

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);

  console.log("USER FROM REDUX:", user);
  console.log("USER ADDRESSES:", user?.addresses);

  const savedAddresses = user?.addresses || [];

  // Latest saved address
  const previousAddress =
    savedAddresses.length > 0
      ? savedAddresses[savedAddresses.length - 1]
      : null;

  // =========================================
  // SAVED ADDRESS
  // =========================================
 const handleSavedAddress = (address) => {

  if (!address?.id) {
    alert("Invalid address!");
    return;
  }

  console.log("SELECTED ADDRESS:", address);

  dispatch(
    createOrder({
      address: {
        id: address.id,
      },
      navigate,
    })
  );
};

  // =========================================
  // NEW ADDRESS
  // =========================================
  const handleNewAddressSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    console.log("NEW ADDRESS:", address);

    // New address backend ला पाठवतो
    // Backend:
    // 1. Address save करेल
    // 2. User ला attach करेल
    // 3. Order मध्ये shippingAddress म्हणून वापरेल
    dispatch(
      createOrder({
        address,
        navigate,
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        width: "100%",
        height: "auto",
      }}
    >
      {/* =========================================
          LEFT SIDE - SAVED ADDRESS
      ========================================= */}

      <Box
        sx={{
          width: {
            xs: "100%",
            md: "50%",
          },

          border: "1px solid rgba(255,255,255,0.1)",

          borderRadius: {
            xs: "12px 12px 0 0",
            md: "12px 0 0 12px",
          },

          p: 3,

          bgcolor: "#171F36",
        }}
      >
        <Typography
          sx={{
            color: "#4F7CFF",
            fontWeight: 700,
            fontSize: "14px",
            textTransform: "uppercase",
            mb: 3,
          }}
        >
          Saved Address
        </Typography>

     {savedAddresses.length > 0 ? (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

    {savedAddresses.map((address) => (
      <Box
        key={address.id}
        sx={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "10px",
          padding: 2,
          backgroundColor: "#111729",
        }}
      >
        <AddressCart address={address} />

        <Button
          variant="contained"
          onClick={() => handleSavedAddress(address)}
          sx={{
            mt: 2,
            bgcolor: "#4F7CFF",
            textTransform: "none",
            fontWeight: 700,

            "&:hover": {
              bgcolor: "#2F5CF0",
            },
          }}
        >
          Deliver Here
        </Button>
      </Box>
    ))}

  </Box>
) : (
  <Typography
    sx={{
      color: "#8993AC",
      fontSize: "14px",
    }}
  >
    No saved address found.
  </Typography>
)}
      </Box>

      {/* =========================================
          RIGHT SIDE - NEW ADDRESS
      ========================================= */}

      <Box
        component="form"
        onSubmit={handleNewAddressSubmit}
        sx={{
          width: {
            xs: "100%",
            md: "50%",
          },

          border: "1px solid rgba(255,255,255,0.1)",

          borderTop: {
            xs: "none",
            md: "1px solid rgba(255,255,255,0.1)",
          },

          borderLeft: {
            md: "none",
          },

          borderRadius: {
            xs: "0 0 12px 12px",
            md: "0 12px 12px 0",
          },

          p: 3,

          bgcolor: "#111729",
        }}
      >
        <Typography
          sx={{
            color: "#4F7CFF",
            fontWeight: 700,
            fontSize: "14px",
            textTransform: "uppercase",
            mb: 3,
          }}
        >
          Add New Address
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            sx={{
              ...darkField,
              flex: "1 1 48%",
            }}
            label="First Name"
            name="firstName"
            fullWidth
            required
          />

          <TextField
            sx={{
              ...darkField,
              flex: "1 1 48%",
            }}
            label="Last Name"
            name="lastName"
            fullWidth
            required
          />

          <TextField
            sx={{
              ...darkField,
              flex: "1 1 100%",
            }}
            label="Address"
            name="address"
            fullWidth
            multiline
            rows={3}
            required
          />

          <TextField
            sx={{
              ...darkField,
              flex: "1 1 48%",
            }}
            label="City"
            name="city"
            fullWidth
            required
          />

          <TextField
            sx={{
              ...darkField,
              flex: "1 1 48%",
            }}
            label="State"
            name="state"
            fullWidth
            required
          />

          <TextField
            sx={{
              ...darkField,
              flex: "1 1 48%",
            }}
            label="Zip Code"
            name="zip"
            fullWidth
            required
          />

          <TextField
            sx={{
              ...darkField,
              flex: "1 1 48%",
            }}
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#4F7CFF",
              textTransform: "none",
              fontWeight: 700,

              "&:hover": {
                bgcolor: "#2F5CF0",
              },
            }}
          >
            Deliver Here
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryAddressForm;