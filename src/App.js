import "./App.css";
import "./Components/ProductFilter";
import ProductFilterTable from "./Components/ProductFilter";



function App() {
  return (
    <div className="mx-auto">
      <ProductFilterTable product={PRODUCTSDATA} />
    </div>
  );
}



export default App;
