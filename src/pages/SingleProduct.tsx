import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Images from "../components/SingleProduct/Images";
import ProductInfo from "../components/SingleProduct/ProductInfo";
import { Product } from "../types";

interface Param {
    id: string;
}

const SingleProduct = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<Product>(null!);

    const { id }: Param = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://ds-ecommers.herokuapp.com/product/${id}`)
            .then((data) => {
                if (data.data.product) {
                    setProduct(data.data.product);
                    setLoading(false);
                } else {
                    // error handling
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (loading) {
        return (
            <section className="singleProd singleProd-loading">
                    <Loading/>
            </section>
        );
    }
    return (
        <section className="singleProd">
            <div className="singleProd-inner">
                <Images
                    mainImage={product.mainImage}
                    additionImages={product.additionalImages}
                />
                <ProductInfo product={product}/>
            </div>
        </section>
    );
};

export default SingleProduct;
