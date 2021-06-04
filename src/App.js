import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Components/ProductFilter";
import ProductFilterTable from "./Components/ProductFilter";

function App() {
  return (
    <div className="mx-auto">
      <ProductFilterTable />
    </div>
  );
}

export default App;
