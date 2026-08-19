'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Modal, Box } from "@mui/material";
import { getUser } from "../../../../state/Auth/Action";
import { saveAddress, saveUserAddress } from "../../../../state/Order/Action";

const darkField = {
  "& .MuiInputBase-root": { color: "#F4F6FB" },
  "& .MuiInputLabel-root": { color: "#8993AC" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#4F7CFF" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4F7CFF" },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4F7CFF" },
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const user = auth.user;

  const [openModal, setOpenModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  });

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleAddAddress = async () => {
    await dispatch(saveUserAddress(newAddress));
    setOpenModal(false);
    setNewAddress({
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      mobile: "",
    });

    dispatch(getUser(localStorage.getItem("jwt")));
  };

  return (
    <div className="p-6 lg:px-20 bg-ink-900 min-h-screen">
      <p className="font-mono-tech text-xs uppercase tracking-widest text-volt-400 mb-1">Account</p>
      <h2 className="text-2xl font-display font-bold text-white mb-6">My Profile</h2>

      {/* User Info */}
      <div className="bg-ink-600 border border-white/10 rounded-xl p-5 mb-6 text-ink-50 space-y-1">
        <p><strong className="text-volt-400">Name:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong className="text-volt-400">Email:</strong> {user?.email}</p>
        <p><strong className="text-volt-400">Mobile:</strong> {user?.mobile}</p>
      </div>

      {/* Saved Addresses */}
      <div className="bg-ink-600 border border-white/10 rounded-xl p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-display font-semibold text-white">Saved Addresses</h3>
          <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ bgcolor: '#4F7CFF', textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#2F5CF0' } }}>
            Add New
          </Button>
        </div>
        {user?.addresses?.length > 0 ? (
          user.addresses.map((addr, idx) => (
            <div
              key={idx}
              className="border border-white/10 bg-white/[0.03] p-3 rounded-md mb-3 text-ink-50"
            >
              <p>{addr.firstName} {addr.lastName}</p>
              <p className="text-ink-200 text-sm">{addr.streetAddress}, {addr.city}, {addr.state} - {addr.zipCode}</p>
              <p className="text-ink-200 text-sm">Mobile: {addr.mobile}</p>
            </div>
          ))
        ) : (
          <p className="text-ink-200">No addresses saved.</p>
        )}
      </div>

      {/* Add Address Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#111729",
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            p: 4,
            boxShadow: 24,
          }}
        >
          <h2 className="text-lg font-display font-bold mb-4 text-white">Add New Address</h2>
          <div className="flex flex-col gap-3">
            <TextField sx={darkField}
              label="First Name"
              value={newAddress.firstName}
              onChange={(e) =>
                setNewAddress({ ...newAddress, firstName: e.target.value })
              }
              fullWidth
            />
            <TextField sx={darkField}
              label="Last Name"
              value={newAddress.lastName}
              onChange={(e) =>
                setNewAddress({ ...newAddress, lastName: e.target.value })
              }
              fullWidth
            />
            <TextField sx={darkField}
              label="Street Address"
              value={newAddress.streetAddress}
              onChange={(e) =>
                setNewAddress({ ...newAddress, streetAddress: e.target.value })
              }
              fullWidth
            />
            <TextField sx={darkField}
              label="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              fullWidth
            />
            <TextField sx={darkField}
              label="State"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
              fullWidth
            />
            <TextField sx={darkField}
              label="Zip Code"
              value={newAddress.zipCode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, zipCode: e.target.value })
              }
              fullWidth
            />
            <TextField sx={darkField}
              label="Mobile"
              value={newAddress.mobile}
              onChange={(e) =>
                setNewAddress({ ...newAddress, mobile: e.target.value })
              }
              fullWidth
            />
            <Button variant="contained" onClick={handleAddAddress} sx={{ bgcolor: '#4F7CFF', textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#2F5CF0' } }}>
              Save Address
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePage;
