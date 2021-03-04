import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../api/server";

import { Product } from "../types";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await server.get("/products");
    return data;
  }
);

export const postProducts = createAsyncThunk(
  "product/postProduct",
  (prod: Product) => {
    server.post("/addproduct", { ...prod });
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
