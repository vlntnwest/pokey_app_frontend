import { Typography } from "@mui/material";
import React from "react";
import AllergensTable from "./AllergensTable";

const AllergensPage = () => {
  return (
    <div>
      <Typography variant="h4">Allergènes</Typography>
      <AllergensTable />
    </div>
  );
};

export default AllergensPage;
