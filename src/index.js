import React from "react";
import { render } from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./Components/ProductFilter";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductFilterTable from "./Components/ProductFilter";

//#region  DATA
const PRODUCTSDATA = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];
//#endregion DATA

render(
  <React.StrictMode>
    <ProductFilterTable product={PRODUCTSDATA} />
  </React.StrictMode>,
  document.getElementById("root")
);

//#region  ProductDATA2

const PRODUCTSDATA2 = PRODUCTSDATA;

PRODUCTSDATA2.unshift({
  category: "Sporting Goods",
  price: "$290",
  stocked: false,
  name: "Tennis",
});
PRODUCTSDATA2.push({
  category: "Electronics",
  price: "$200",
  stocked: false,
  name: "iPod Touch 10",
});

//#endregion ProductDATA2

setInterval(() => {
  render(
    <React.StrictMode>
      <ProductFilterTable product={PRODUCTSDATA2} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}, 5000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
