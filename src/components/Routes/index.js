import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "../../pages/Admin";
import Home from "../../pages/Home";
import Table from "../../pages/Table";
import ClickAndCollect from "../../pages/ClickAndCollect";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/table/:tableNumber" element={<Table />} />
        <Route path="/table/*" element={<Navigate to="/" />} />
        <Route path="/clickandcollect" element={<ClickAndCollect />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
