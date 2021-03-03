import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../types";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://ds-ecommers.herokuapp.com/products");
    return await response.json();
  }
);

export const postProducts = createAsyncThunk(
  "product/postProduct",
  (prod: Product) => {
    axios.post("https://ds-ecommers.herokuapp.com/addproduct", { ...prod });
  }
);

interface State {
  products: Product[];
  loadingState: "idle" | "pending" | "fetched";
}

const initialState: State = {
  products: [],
  loadingState: "idle",
};

const productsSlide = createSlice({
  initialState,
  name: "products",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loadingState = "pending";
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.products.push(...payload.products);
      state.loadingState = "fetched";
    });
  },
});

export default productsSlide.reducer;
