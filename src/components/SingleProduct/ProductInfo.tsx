import { ProductProps } from "../../types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";

const ProductInfo: React.FC<ProductProps> = ({ product }) => {
  const { name, price, description, category } = product;

  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(addToCart({ product: product }));
  };
  return (
    <article className="productDetails">
      <div className="productDetails-inner">
        <div className="productDetails__header">
          <h1>{name}</h1>
        </div>
        <div className="productDetails__content">
          <h1>Price: {price}$</h1>
          <h1>
            Category:
            <span className="productDetails__content-link">
              <Link to={`/products/${category}`}>{category}</Link>{" "}
            </span>
          </h1>
          <p className="productDetails__content-text">{description}</p>
        </div>
        <div className="productDetails__footer">
          <button className="productDetails__footer-btn" onClick={clickHandler}>
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductInfo;
