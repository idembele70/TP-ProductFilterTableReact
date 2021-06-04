import { Component, memo, PureComponent } from "react";

class ProductRow extends PureComponent {
  render() {
    console.log("render");
    const { name, price, stocked } = this.props.produit;
    const className = stocked ? "text-dark" : "text-danger";
    return (
      <tr>
        <td className={className}>{name}</td>
        <td>{price}</td>
      </tr>
    );
  }
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
      if (!product.name.match(filteredText) || (isstocked && !product.stocked))
        return;
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
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
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
        <ProductTable
          product={this.props.product}
          filteredText={this.state.filterText}
          isstocked={this.state.showStocked}
        />
      </div>
    );
  }
}
