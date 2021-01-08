import {lazy,Suspense, useEffect} from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import LoginModal from "./components/Login/LoginModal";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";


const Admin = lazy(()=>import("./pages/Admin"))
const ProductsList = lazy(()=>import("./pages/ProductsList"))
const SingleProduct = lazy(()=>import("./pages/SingleProduct"))
const Account = lazy(()=>import("./pages/Account"))

function App() {
  const {pathname} = useLocation();
  
  useEffect(()=>{
    window.scrollTo(0,0);
  },[pathname])
  return (
    <main className="main">
      <Navbar />
      <Cart/>
      <LoginModal/>
      <Suspense fallback={<Loading/>}>
      <div className="center">
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/admin" exact render={() => <Admin />} />
        <Route path="/account" exact render={() => <Account />} />
        <Route path="/product/:id"  render={() => <SingleProduct/>}/>
        <Route path="/products/:category"  render={() => <ProductsList/>}/>
      </Switch>
      </div>
      <Footer />
      </Suspense>
    </main>
  );
}

export default App;
