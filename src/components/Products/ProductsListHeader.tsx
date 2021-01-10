import { useState, useEffect } from "react";
import { Product } from "../../types";

enum Sort {
  recommened,
  priceUp,
  priceDown,
  alphabetical,
}

interface Props {
  allProduct: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductsListHeader: React.FC<Props> = ({ allProduct, setProducts }) => {
  const [sortType, setSortType] = useState<string>(Sort.recommened.toString());

  useEffect(() => {
    if (sortType === Sort.recommened.toString()) {
      setProducts(allProduct);
    }
    if (sortType === Sort.priceUp.toString()) {
      setProducts((products) =>
        products.slice().sort((a, b) => a.price - b.price)
      );
    }
    if (sortType === Sort.priceDown.toString()) {
      setProducts((products) =>
        products.slice().sort((a, b) => b.price - a.price)
      );
    }
    if (sortType === Sort.alphabetical.toString()) {
      setProducts((products) =>
        products.slice().sort((a, b) => {
          if (a.name < b.name) return -1;
          return 0;
        })
      );
    }
  }, [sortType, setProducts, allProduct]);
  return (
    <div className="products__header">
      <div className="products__header-inner">
        <label htmlFor="sort">Sort:</label>
        <select
          onChange={(e) => setSortType(e.target.value)}
          name="sort"
          id="sort"
        >
          <option value={Sort.recommened}>Recommended</option>
          <option value={Sort.priceUp}>Price: Low to High</option>
          <option value={Sort.priceDown}>Price:High to Low </option>
          <option value={Sort.alphabetical}>Alphabetical </option>
        </select>
      </div>
    </div>
  );
};

export default ProductsListHeader;
