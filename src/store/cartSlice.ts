import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../types";

interface CartProducts {
  product: Product;
  amount: number;
  total: number;
}

interface InitialStateInterface {
  showCart: boolean;
  cartProducts: CartProducts[];
}

const initialState: InitialStateInterface = {
  showCart: false,
  cartProducts: [],
};

export const postTransation = createAsyncThunk(
  "cart/postTransation",
  async (id: string, { getState }) => {
    const { cart } = getState() as { cart: { cartProducts: CartProducts[] } };
    axios.post("https://ds-ecommers.herokuapp.com/addtransation", {
      id: id,
      transation: cart.cartProducts.map((item) => ({
        name: item.product.name,
        id: item.product._id,
        total: item.total,
        amount: item.amount,
      })),
    });
  }
);

const cartSlide = createSlice({
  initialState: initialState,
  name: "cart",
  reducers: {
    toogleShowCart: (state) => {
      state.showCart = !state.showCart;
    },
    addToCart: (state, { payload }: PayloadAction<{ product: Product }>) => {
      const prod = state.cartProducts.find(
        (p) => p.product._id === payload.product._id
      );
      if (prod) {
        prod.amount++;
        prod.total = +(prod.total + payload.product.price).toFixed(2);
      } else {
        const cartProducts: CartProducts = {
          product: payload.product,
          amount: 1,
          total: payload.product.price,
        };
        state.cartProducts.push(cartProducts);
      }
    },
    removeFromCart: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.cartProducts.filter((p) => p.product._id !== payload.id);
    },
    decreaseAmount: (
      state,
      { payload }: PayloadAction<{ product: Product }>
    ) => {
      const prod = state.cartProducts.find(
        (p) => p.product._id === payload.product._id
      );
      if (prod) {
        if (prod.amount === 1) {
          state.cartProducts = state.cartProducts.filter(
            (p) => p.product._id !== payload.product._id
          );
        } else {
          prod.amount--;
          prod.total = +(prod.total - payload.product.price).toFixed(2);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postTransation.fulfilled, (state) => {
      state.cartProducts = [];
    });
  },
});

export const {
  addToCart,
  decreaseAmount,
  removeFromCart,
  toogleShowCart,
} = cartSlide.actions;

export default cartSlide.reducer;
