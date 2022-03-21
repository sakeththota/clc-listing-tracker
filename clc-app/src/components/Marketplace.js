import Navbar from "./Navbar";
import "../styles/Marketplace.css";
import React from "react";
import SearchForm from "./SearchForm";
import { Divider } from "@mui/material";

function Marketplace({ name }) {
  let color =
    name === "OfferUp"
      ? "#056c6e"
      : name === "Craigslist"
      ? "#64449b"
      : "#405a93";

  return (
    <div className="Marketplace">
      <Navbar color={color} name={name} />
      <Divider />
      <SearchForm color={color} name={name} />
    </div>
  );
}

export default Marketplace;
