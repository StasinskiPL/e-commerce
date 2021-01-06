import {Link} from "react-router-dom"
interface Props{
    product:{
        name: string;
        description: string;
        category: string;
        mainImage: string;
        additionalImages: string[];
        _id?: string;
    }

}


const ProductsRowItem:React.FC<Props> = ({product})=>{
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
