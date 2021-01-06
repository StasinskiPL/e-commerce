import {ProductProps } from '../../types'
import {Link} from "react-router-dom"


const ProductInfo:React.FC<ProductProps> = ({product}) => {
    const{name,price,description,category} = product;
    return (
        <article className="productDetails">
            <div className="productDetails-inner">
                <div className="productDetails__header">
                    <h1>{name}</h1>
                </div>
                <div className="productDetails__content">
                    <h1>Price: {price}$</h1>
                    <h1>Category: <span className="productDetails__content-link"><Link to={`/products//${category}`}>{category}</Link> </span></h1>
                    <p className="productDetails__content-text">{description}</p>
                </div>
                <div className="productDetails__footer">
                    <button className="productDetails__footer-btn" >Add To Cart</button>
                </div>
            </div>
        </article>
    )
}

export default ProductInfo
