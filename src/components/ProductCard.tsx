import React from 'react'
import {Link} from "react-router-dom"
import { ProductProps } from '../types'

const ProductCard:React.FC<ProductProps> = ({product}) => {
    const {mainImage,name,price,_id} = product
    return (
        <Link to={`/product/${_id}`} className="product">
            <div className="product__img-wrapper">
                <img src={mainImage} alt={name}/>
            </div>
            <div className="product__body">
                <h3>{name}</h3>
                <h3>{price}$</h3>
            </div>
        </Link>
    )
}

export default ProductCard
