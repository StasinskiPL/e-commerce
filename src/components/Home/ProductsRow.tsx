import React from 'react'
import { Product } from '../../types'
import ProductsRowItem from './ProductsRowItem'

interface Props{
    products: Product[],
    title:string,
}

const ProductsRow:React.FC<Props> = ({products, title}) => {

    return (
        <article className="productsRow">
        <div className="productsRow__header">
            <h1>{title}</h1>
        </div>
        <div className="productsRow__context">
        <div className="productsRow__context-inner">
            {products.map((prod,index)=><ProductsRowItem product={prod} key={index}/>)}
        </div>
        </div>
        </article>
    )
}




export default ProductsRow
