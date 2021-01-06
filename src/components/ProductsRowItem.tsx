import {Link} from "react-router-dom"
import { ProductProps } from "../types";


const ProductsRowItem:React.FC<ProductProps> = ({product})=>{
    const {mainImage,name, _id} = product;
    return (
        <Link to={`product/${_id}`} className="productRow">
            <div className="productRow-imgWrapper">
                <img src={mainImage} alt="product"/>
            </div>
            <div className="productRow-name">
                <h1>{name}</h1>
            </div>
        </Link>
    )
}
export default ProductsRowItem
