import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthModel = ({ handleClose, open }) => {
  const [isRegister, setIsRegister] = useState(false);

  const handleRegister = () => {
    setIsRegister(true);
  };

  const handleLogin = () => {
    setIsRegister(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "95%",
            sm: "90%",
            md: "760px",
          },

          maxWidth: "760px",

          maxHeight: {
            xs: "95vh",
            md: "90vh",
          },

          bgcolor: "#0C111F",

          borderRadius: "16px",

          overflow: "hidden",

          border: "1px solid rgba(79,124,255,0.45)",

          boxShadow:
            "0 0 0 1px rgba(79,124,255,0.15), 0 30px 100px rgba(0,0,0,0.8)",

          outline: "none",

          display: "flex",

          flexDirection: "column",
        }}
      >
        {isRegister ? (
          <RegisterForm onLogin={handleLogin} />
        ) : (
          <LoginForm
            handleClose={handleClose}
            onRegister={handleRegister}
          />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModel;