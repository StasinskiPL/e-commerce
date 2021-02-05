import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { toogleShowCart } from "../../store/cartSlice";
import CartItem from "./CartItem";
import CartPurchaseBtn from "./CartPurchaseBtn";

const Cart = () => {
  const [totalPrice, setTotalprice] = useState<number>(0);
  const showCart = useSelector((state: RootState) => state.cart.showCart);
  const products = useSelector((state: RootState) => state.cart.cartProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const total = products.reduce((total, next) => (total += next.total), 0);
    setTotalprice(+total.toFixed(2));
  }, [products]);

  if (!showCart) {
    return null;
  }

  return (
    <div className="cart" onClick={() => dispatch(toogleShowCart())}>
      <div className="cart-wrapper">
        <div className="cart-inner" onClick={(e) => e.stopPropagation()}>
          <div className="cart__body">
            {products.map((prod) => (
              <CartItem
                key={prod.product._id}
                product={prod.product}
                amount={prod.amount}
                total={prod.total}
              />
            ))}
          </div>
          <div className="cart__footer">
            <div className="cart__cart__footer-total">
              <h2>
                Total: <span>{totalPrice}</span> $
              </h2>
            </div>
            <CartPurchaseBtn total={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
