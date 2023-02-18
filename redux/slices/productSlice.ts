import { DataProducts } from "./../../types/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductSlice {
  data: DataProducts | null;
  page: {
    skip: number;
    limit: number;
    total: number;
  };
  loading: boolean;
  counter: number;
}

type FetchProductsType = { skip: number; limit: number };

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async ({ skip, limit }: FetchProductsType, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      return data;
    } catch (error: any | unknown) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: ProductSlice = {
  data: null,
  page: {
    skip: 0,
    limit: 10,
    total: 0,
  },
  loading: false,
  counter: 1,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    counterDecrement: (state) => {
      return {
        ...state,
        counter: state.counter - 1,
      };
    },
    counterIncrement: (state) => {
      return {
        ...state,
        counter: state.counter + 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.page.total = payload.total;
      state.page.skip = payload.skip;
      state.loading = false;
    });
  },
});

export const { counterDecrement, counterIncrement } = productSlice.actions;

export default productSlice.reducer;
