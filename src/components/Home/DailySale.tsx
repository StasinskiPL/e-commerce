import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {Link} from "react-router-dom"; 
import Loading from "../Loading";

const DailySale = () => {
  const product = useSelector((state: RootState) => state.products.products[0]);

  if (!product) {
    return (
      <article className="home__daily home__daily-Loading">
        <Loading/>
      </article>
    );
  }

  return (
    <article className="home__daily">
      <Link to={`/product/${product._id}`}>
      <div className="home__daily-title">
        <h1>Product of the day</h1>
      </div>
      <div className="home__daily-content">
        <div className="home__daily-imgWrapper">
          <img src={product.mainImage} alt="product" />
        </div>
        <div className="home__daily-text">
          <h2>{product.name}</h2>
        </div>
        <button className="home__daily-btn">More</button>
      </div>
      </Link>
    </article>
  );
};

export default DailySale;
