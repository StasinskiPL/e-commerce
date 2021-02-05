import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Ui/Loading";
import LoginModal from "./components/Login/LoginModal";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

const Admin = lazy(() => import("./pages/Admin"));
const ProductsList = lazy(() => import("./pages/ProductsList"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const Account = lazy(() => import("./pages/Account"));

function App() {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <main className="main">
      <Navbar />
      <Cart />
      <LoginModal />
      <div className="center">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/admin" exact render={() => <Admin />} />
            <Route path="/account" exact render={() => <Account />} />
            <Route path="/product/:id" render={() => <SingleProduct />} />
            <Route path="/products/:category" render={() => <ProductsList />} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}

export default App;
