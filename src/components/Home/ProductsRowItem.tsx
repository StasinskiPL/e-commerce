import {Link} from "react-router-dom"
import { ProductProps } from "../../types";


const ProductsRowItem:React.FC<ProductProps> = ({product})=>{
    const {mainImage,name, _id} = product;
    return (
        <article className="productRow">
        <Link to={`product/${_id}`} >
            <div className="productRow-imgWrapper">
                <img src={mainImage} alt="product"/>
            </div>
            <div className="productRow-name">
                <h1>{name}</h1>
            </div>
        </Link>
        </article>
    )
}
export default ProductsRowItem
