import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const DailySale = () => {
  const product = useSelector((state: RootState) => state.products.products[0]);

  if (!product) {
    return (
      <article className="home__daily">
        <h1>loading</h1>
      </article>
    );
  }

  return (
    <article className="home__daily">
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
    </article>
  );
};

export default DailySale;
