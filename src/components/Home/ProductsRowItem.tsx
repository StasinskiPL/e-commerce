import { Link } from "react-router-dom";

export interface Product {
  product:{
    name: string;
    mainImage: string;
    _id?: string;
  }
}

const ProductsRowItem: React.FC<Product> = ({ product }) => {
  const { mainImage, name, _id } = product;
  return (
    <article className="productRow">
      <Link to={`product/${_id}`}>
        <div className="productRow-imgWrapper">
          <img src={mainImage} alt="product" />
        </div>
        <div className="productRow-name">
          <h1>{name}</h1>
        </div>
      </Link>
    </article>
  );
};
export default ProductsRowItem;
