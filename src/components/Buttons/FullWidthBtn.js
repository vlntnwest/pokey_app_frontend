import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

const FullWidthBtn = ({ handleAction, name, isSubmitting }) => {
  return (
    <Button
      color="primary"
      disableElevation
      fullWidth
      sx={{
        p: 0,
        display: "block",
        borderRadius: 0,
        mb: 4,
      }}
      onClick={handleAction}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderTop: "1px solid #0000001a",
          borderBottom: "1px solid #0000001a",
        }}
      >
        <Box
          sx={{
            flex: 1,
            py: 2,
            pl: 2,
            pr: 2,
            mr: "auto",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontWeight: "400" }}>
            {isSubmitting ? (
              <CircularProgress color="secondary" size={24.5} />
            ) : (
              name
            )}
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};

export default FullWidthBtn;
