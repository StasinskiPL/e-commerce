import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { postTransation, toogleShowCart } from "../../store/cartSlice";
import { toogleLoginModal } from "../../store/loginSlice";
import { RootState } from "../../store/store";

const CartPurchaseBtn = ({total}:{total:number}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const amount = useSelector(
    (state: RootState) => state.cart.cartProducts.length
  );
  const products =  useSelector(
    (state: RootState) => state.cart.cartProducts
  ).map(prod=>({
    name: prod.product,
    unitPrice: prod.total/prod.amount,
    quantity: prod.amount,
  }));

  const purchaseHandler = () => {
    if (auth.currentUser) {
      axios.post("https://secure.snd.payu.com/api/v2_1/orders", {
        notifyUrl: "https://ds-ecommerce.netlify.app/account",
        customerIp: "127.0.0.1",
        merchantPosId: "300746",
        description: "RTV market",
        currencyCode: "PLN",
        totalAmount: total*100,
        buyer: {
          email: auth.currentUser.email,
          phone: "111111111",
          firstName: "John",
          lastName: "Doe",
          language: "pl",
        },
        products: products
      },{
        headers:{
          Authorization: "Bearer d9a4536e-62ba-4f60-8017-6053211d3f47",
          ContentType: "application/json",

        }
      }).then(res=>{
        history.push(res.data.redirectUri);
      }).catch(err=>{console.log(err)});

      dispatch(postTransation(auth.currentUser.uid));
      history.push("/account");
      dispatch(toogleShowCart());
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
