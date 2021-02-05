import { useState, useEffect} from "react";

export interface Product {
  name: string;
  mainImage: string;
  _id?: string;
}

const addProducts = async (prod: Product, products: Product[]) => {
  const newProd = {
    name: prod.name,
    mainImage: prod.mainImage,
    _id: prod._id,
  };

  let newProdList = products;

  const prodIndex = products.findIndex(
    (prod: Product) => prod._id === newProd._id
  );

  if (prodIndex !== -1) {

    newProdList.splice(prodIndex, 1);
  }

  newProdList.unshift(newProd);
  if (newProdList.length > 6) {
    newProdList.pop();
  }

  await localStorage.setItem("history", JSON.stringify(newProdList));
  return { prevProd: newProd, newProductList: newProdList };
};

const getProducts = async () => {
  const productsFromStorage = await localStorage.getItem("history");
  return productsFromStorage;
};

const useBrowsingHistory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [prevProduct, setPrevProduct] = useState<Product | null>(null);

  const addProductToHistory = async (prod: Product) => {
    if (prevProduct?._id === prod._id) {
      return;
    }
    const { prevProd, newProductList } = await addProducts(prod, products);
    setPrevProduct(prevProd);
    setProducts(newProductList);
  };

  useEffect(() => {
    getProducts().then((prod) => {
      if (prod) {
        setProducts(JSON.parse(prod));
      }
    });
  }, []);

  return { browseringProducts: products, addProductToHistory };
};

export default useBrowsingHistory;
