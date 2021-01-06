import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {Product} from "../types";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://ds-ecommers.herokuapp.com/products");
    return await response.json();
  }
);

export const postProducts = createAsyncThunk("product/postProduct",(prod:Product)=>{
    axios.post("http://ds-ecommers.herokuapp.com/addproduct",{...prod})
})


interface State {
  products: Product[],
}


const initialState: State = {
  products:[],
};

const productsSlide = createSlice({
  initialState,
  name: "products",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.products.push(...payload.products);
    });
  },
});

export default productsSlide.reducer;
