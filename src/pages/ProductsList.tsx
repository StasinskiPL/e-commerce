import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'
import { Product } from '../types'
import {RootState} from "../store/store";
import ProductCard from '../components/ProductCard';

interface Category{
    category: string;
}

const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const allProduct = useSelector((state:RootState)=>state.products.products)
    const {category}: Category = useParams()

    useEffect(()=>{
        if(allProduct !== []){
            setProducts(allProduct.filter(prod=> prod.category === category))
        }
    },[allProduct,category])

    return (
        <section className="products">
            <div className="products-inner">
                {products.map((prod,index)=><ProductCard product={prod} key={index}/>)}


            </div>
        </section>
    )
}

export default ProductsList
