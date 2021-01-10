import { VscAccount } from "react-icons/vsc";
import { AiFillShopping } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toogleShowCart } from "../../store/cartSlice";
import { toogleLoginModal } from "../../store/loginSlice";
import { RootState } from "../../store/store";

const NavIcons = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.cart.cartProducts);
  let renderProdAmount = null;
  if (product.length > 0) {
    renderProdAmount = (
      <div className="navbar-icon-cart-amount">
        <p>{product.length}</p>
      </div>
    );
  }
  return (
    <div className="navbar-icons">
      <button
        onClick={() => dispatch(toogleLoginModal())}
        className="navbar-icon"
      >
        <VscAccount />
      </button>
      <button
        className="navbar-icon navbar-icon-cart"
        onClick={() => dispatch(toogleShowCart())}
      >
        <AiFillShopping />
        {renderProdAmount}
      </button>
    </div>
  );
};

export default NavIcons;
