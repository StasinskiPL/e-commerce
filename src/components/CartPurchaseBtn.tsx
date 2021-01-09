import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import {postTransation,toogleShowCart } from "../store/cartSlice";
import { toogleLoginModal } from "../store/loginSlice";
import { RootState } from "../store/store";



const CartPurchaseBtn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const amount = useSelector((state:RootState)=> state.cart.cartProducts.length)

    const purchaseHandler = () =>{
        if(auth.currentUser){
          dispatch(postTransation(auth.currentUser.uid));
          history.push("/account");
          dispatch(toogleShowCart())
        }else{
          dispatch(toogleLoginModal())
        }
      }
    
    return (
        <button onClick={purchaseHandler}
        disabled={amount === 0}>purchase</button>
    )
}

export default CartPurchaseBtn
