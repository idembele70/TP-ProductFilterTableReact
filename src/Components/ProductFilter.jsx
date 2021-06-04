import { Component, useState } from "react";

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

function ProductRow({ produit }) {
  const { name, price, stocked } = produit;
  const className = stocked ? "text-dark" : "text-danger";
  return (
    <tr>
      <td className={className}>{name}</td>
      <td>{price}</td>
    </tr>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductTable({ filteredText, isstocked, product }) {
  const renderData = (data) => {
    const row = [];
    let passedCategory = null;
    data.forEach((product, i) => {
      if (!product.name.match(filteredText) || (isstocked && !product.stocked)) return;
      if (passedCategory !== product.category) {
        row.push(
          <ProductCategoryRow
            key={product.category + i}
            category={product.category}
          />
        );
        passedCategory = product.category;
      }
      row.push(<ProductRow key={product.name + i} produit={product} />);
    });
    return row;
  };

  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>{renderData(product)}</tbody>
    </table>
  );
}

function SearchBar({ onFilterText, onShowStocked, value, checked }) {
  const handleFilterText = (e) => onFilterText(e.target.value);
  const handleShowStock = (e) => onShowStocked(e.target.checked);
  return (
    <div className="my-3">
      <input
        type="text"
        name="search"
        id="search"
        className="form-control"
        placeholder="Search..."
        value={value}
        onChange={handleFilterText}
      />
      <input
        type="checkbox"
        name="showStocked"
        id="showStocked"
        className="from-check-input"
        checked={checked}
        onChange={handleShowStock}
      />
      <label htmlFor="showStocked" className="form-check-label ms-1">
        Only show product in stock
      </label>
    </div>
  );
}

export default class ProductFilterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      showStocked: false,
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleShowStock = this.handleShowStock.bind(this);
  }
  handleFilterChange(filterText) {
    this.setState({ filterText });
  }
  handleShowStock(showStocked) {
    this.setState({ showStocked });
  }
  render() {
    return (
      <div className="container w-25">
        <SearchBar
          value={this.state.filterText}
          onFilterText={this.handleFilterChange}
          checked={this.state.showStocked}
          onShowStocked={this.handleShowStock}
        />
        <ProductTable product={PRODUCTSDATA} filteredText={this.state.filterText} isstocked={this.state.showStocked} />
      </div>
    );
  }
}
