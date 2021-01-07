import React from 'react'
import { Product } from '../types'
import {Link} from "react-router-dom"
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from "react-icons/ai"
import {useDispatch} from "react-redux"
import {decreaseAmount,addToCart} from "../store/cartSlice"


export interface Props{
    product:Product,
    amount:number,
    total:number,
  }

const CartItem:React.FC<Props> = ({product,amount,total}) => {
    const {name,_id} = product
    const dispatch = useDispatch();
    const incHandler = ()=>{
        dispatch(addToCart({product:product}))

    }
    const decHandler = ()=>{
        dispatch(decreaseAmount({product:product}))
        
    }
    return (
        <div className="cart__item">
            <div className="cart__item-inner">
                <div className="cart__item-name">
                    <Link to={`/product/${_id}`}>{name}</Link>
                </div>
                <div className="cart__item-btns">
                    <button onClick={decHandler}  className="cart__item-btn"><AiOutlineMinusCircle/></button>
                    <h2>{amount}</h2>
                    <button onClick={incHandler}  className="cart__item-btn"><AiOutlinePlusCircle/></button>
                </div>
                <h3 className="cart__item-total">{total} $</h3>
            </div>
        </div>
    )
}

export default CartItem
