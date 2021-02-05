import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Ui/Loading";
import Images from "../components/SingleProduct/Images";
import ProductInfo from "../components/SingleProduct/ProductInfo";
import useBrowsingHistory from "../hooks/useBrowsingHistory";
import { Product } from "../types";

interface Param {
  id: string;
}

const SingleProduct = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>(null!);
  const { addProductToHistory,  } = useBrowsingHistory();

  const { id }: Param = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`https://ds-ecommers.herokuapp.com/product/${id}`)
      .then((data) => {
        if (data.data.product) {
          setProduct(data.data.product);
          setLoading(false);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      addProductToHistory(product);
    }
  });

  if (loading) {
    return (
      <section className="singleProd singleProd-loading">
        <Loading />
      </section>
    );
  }
  if (error) {
    return (
      <section className="singleProd singleProd-loading">
        <h1>Unfortunately, We couldn't find this product in our store </h1>
      </section>
    );
  }
  return (
    <section className="singleProd">
      <div className="singleProd-wrapper">
        <div className="singleProd-inner">
          <Images
            mainImage={product.mainImage}
            additionImages={product.additionalImages}
          />
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
