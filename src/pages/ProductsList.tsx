import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'
import { Product } from '../types'
import {RootState} from "../store/store";
import ProductCard from '../components/Products/ProductCard';
import ProductsListHeader from '../components/Products/ProductsListHeader';

interface Category{
    category: string;
}

const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const allProduct = useSelector((state:RootState)=>state.products.products)
    const {category}: Category = useParams()

    useEffect(()=>{
        if(allProduct !== []){
            if(category !== "All"){
                setProducts(allProduct.filter(prod=> prod.category === category))
            }else{
                setProducts(allProduct)
            }
        }
    },[allProduct,category])

    return (
        <section className="products">
            <ProductsListHeader allProduct={allProduct} setProducts={setProducts}/>
            
            <div className="products-inner">
                {products.map((prod,index)=><ProductCard product={prod} key={index}/>)}


            </div>
        </section>
    )
}

export default ProductsList
