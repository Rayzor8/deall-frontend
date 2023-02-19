import { DataCarts } from './../../types/index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CartSlice {
  data: DataCarts | null;
  page: {
    skip: number;
    limit: number;
    total: number;
  };
  loading: boolean;
  counter: number;
}

type FetchCartsType = { skip: number; limit: number };

export const fetchCarts = createAsyncThunk(
  "fetchCarts",
  async ({ skip, limit }: FetchCartsType, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/carts?limit=${limit}&skip=${skip}`
      );
      return data;
    } catch (error: any | unknown) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: CartSlice = {
  data: null,
  page: {
    skip: 0,
    limit: 10,
    total: 0,
  },
  loading: false,
  counter: 1,
};

export const cartSlice = createSlice({
  name: "carts",
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
    builder.addCase(fetchCarts.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchCarts.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.page.total = payload.total;
      state.page.skip = payload.skip;
      state.loading = false;
    });
  },
});

export const { counterDecrement, counterIncrement } =
cartSlice.actions;

export default cartSlice.reducer;
