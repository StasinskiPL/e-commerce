import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Product } from "../types";
import { RootState } from "../store/store";
import ProductCard from "../components/Products/ProductCard";
import ProductsListHeader from "../components/Products/ProductsListHeader";

interface Category {
  category: string;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const allProduct = useSelector((state: RootState) => state.products.products);
  const { search } = useLocation();
  const { category }: Category = useParams();

  useEffect(() => {
    if (allProduct !== []) {
      if (category.toLowerCase() !== "all") {
        setProducts(allProduct.filter((prod) => prod.category === category));
      } else {
        if (search) {
          setProducts(
            allProduct.filter((prod) =>
              prod.name.toLowerCase().includes(search.slice(8).toLowerCase())
            )
          );
        } else {
          setProducts(allProduct);
        }
      }
    }
  }, [allProduct, category, search]);

  let renderProd = null;
  if (products.length > 0) {
    renderProd = products.map((prod, index) => (
      <ProductCard product={prod} key={index} />
    ));
  } else {
    renderProd = <h1 className="products-inner-noMatch">No Product match!</h1>;
  }

  return (
    <section className="products">
      <ProductsListHeader  setProducts={setProducts} />
      <div className="products-inner">{renderProd}</div>
    </section>
  );
};

export default ProductsList;
