import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  SwipeableDrawer,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

const OrderMessage = () => {
  const { message, setMessage } = useShoppingCart();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <Button
        color="secondary"
        disableElevation
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          pl: 1.5,
          border: "1px solid #0000000a",
          textTransform: "none",
          flexDirection: "column",
        }}
        onClick={toggleDrawer(true)}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">
            Indications pour le restaurant
          </Typography>
          <Typography sx={{ color: "#1f4493" }}>Ajouter</Typography>
        </Box>
        <Box sx={{ width: "100%", textAlign: "left", mt: 0.5 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {message === "" ? "Aucune indication renseignée" : message}
          </Typography>
        </Box>
      </Button>
      <SwipeableDrawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="bottom"
      >
        <Box sx={{ height: "95svh", display: "flex", flexDirection: "column" }}>
          <Toolbar sx={{ padding: "0 8px" }}>
            <IconButton onClick={() => setOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Toolbar>
          <Box
            sx={{
              p: 2,
              backgroundColor: "rgba(208, 208, 208, 0.12)",
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Ex. : « Merci de ne pas mettre de riz »"
              value={message !== "Aucune indication renseignée" ? message : ""}
              variant="outlined"
              multiline
              rows={5}
              onChange={handleMessage}
              sx={{ backgroundColor: "#FFF", borderColor: "#0000000a" }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 1.5 }}
              onClick={toggleDrawer(false)}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default OrderMessage;
