import {lazy,Suspense} from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
const Admin = lazy(()=>import("./pages/Admin"))

function App() {
  return (
    <main className="main">
      <Suspense fallback="loading...">
      <Navbar />
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/admin" exact render={() => <Admin />} />
        <Route path="/product/:id"  render={() => <SingleProduct />} />
      </Switch>
      <Footer />
      </Suspense>
    </main>
  );
}

export default App;
