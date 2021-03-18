import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postTransation, toogleShowCart } from "../../store/cartSlice";
import { toogleLoginModal } from "../../store/loginSlice";
import { RootState } from "../../store/store";

const CartPurchaseBtn = ({ total }: { total: number }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const amount = useSelector(
    (state: RootState) => state.cart.cartProducts.length
  );
  const { isLogin } = useSelector((state: RootState) => state.login);
  const products = useSelector(
    (state: RootState) => state.cart.cartProducts
  ).map((prod) => ({
    name: prod.product,
    unitPrice: prod.total / prod.amount,
    quantity: prod.amount,
  }));

  const purchaseHandler = () => {
    if (isLogin) {
      axios
        .post(
          "https://secure.snd.payu.com/api/v2_1/orders",
          {
            notifyUrl: "https://ds-ecommerce.netlify.app/account",
            customerIp: "127.0.0.1",
            merchantPosId: "403246",
            description: "RTV market",
            currencyCode: "PLN",
            totalAmount: total * 100,
            buyer: {
              email: "1@1.pl",
              phone: "111111111",
              firstName: "John",
              lastName: "Doe",
              language: "pl",
            },
            products: products,
          },
          {
            headers: {
              Authorization: "Bearer e9c2db1836df59d1094ec34fd18ad611",
              ContentType: "application/json",
            },
          }
        )
        .then((res) => {
          history.push(res.data.redirectUri);
        })
        .catch((err) => {
          console.log(err);
        });
      if (isLogin) {
        dispatch(postTransation());
        history.push("/account");
        dispatch(toogleShowCart());
      }
    } else {
      dispatch(toogleLoginModal());
    }
  };

  return (
    <button onClick={purchaseHandler} disabled={amount === 0}>
      purchase
    </button>
  );
};

export default CartPurchaseBtn;
