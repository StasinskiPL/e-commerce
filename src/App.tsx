import {lazy,Suspense} from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";


const Admin = lazy(()=>import("./pages/Admin"))
const ProductsList = lazy(()=>import("./pages/ProductsList"))
const SingleProduct = lazy(()=>import("./pages/SingleProduct"))

function App() {
  return (
    <main className="main">
      <Suspense fallback="loading...">
      <Navbar />
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/admin" exact render={() => <Admin />} />
        <Route path="/product/:id"  render={() => <SingleProduct/>}/>
        <Route path="/products/:category"  render={() => <ProductsList/>}/>
      </Switch>
      <Footer />
      </Suspense>
    </main>
  );
}

export default App;
