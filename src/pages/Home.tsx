import React from "react";
import { useSelector } from "react-redux";
import DailySale from "../components/Home/DailySale";
import HomeBanner from "../components/Home/HomeBanner";
import Newsletter from "../components/Home/Newsletter";
import ProductsRow from "../components/Home/ProductsRow";
import useBrowsingHistory from "../hooks/useBrowsingHistory";
import { RootState } from "../store/store";

const Home = () => {
  const product = useSelector((state: RootState) => state.products.products);
  const { browseringProducts } = useBrowsingHistory();

  return (
    <section className="home">
      <div className="home-inner">
        <HomeBanner />
        <div className="home-row-2">
          <DailySale />
          <Newsletter />
        </div>
        <ProductsRow title="Recommended" products={product.slice(0, 6)} />
        <ProductsRow title="Your browsing history" products={browseringProducts}/>
      </div>
    </section>
  );
};

export default Home;
