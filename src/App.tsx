import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <main className="main">
      <Navbar />
      <Switch>
        <Route path="/" exact render={() => <Home />} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
