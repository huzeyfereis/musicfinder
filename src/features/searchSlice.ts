import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import searchService from '../services/searchService';

export interface IResultItem {
  artistName: string;
  trackId: string;
  trackName: string;
  trackImageUrl: string;
  trackPrice: number;
  currency: string;
}

export interface SearchState {
  data: Readonly<IResultItem>[];
  term: string;
  error: null | string;
  isLoading: boolean;
  isFetched: boolean;
  fetchItems: number;
  fetchItemSize: number;
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (term: string, thunkApi) => {
    try {
      const response = searchService.getItems(term);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchMoreData = createAsyncThunk(
  'data/fetchMoreData',
  async (state: SearchState, thunkApi) => {
    try {
      const response = searchService.getItems(
        state.term,
        state.fetchItems + 1,
        state.fetchItemSize
      );
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const initialState: SearchState = {
  data: [],
  term: '',
  isLoading: false,
  isFetched: false,
  error: null,
  fetchItems: 0,
  fetchItemSize: 10,
};

const searchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    fetchDataRequest: (state: SearchState, action: PayloadAction<string>) => {
      state.term = action.payload;
      state.isLoading = true;
      state.isFetched = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.data = [];
      state.isFetched = true;
      state.isLoading = true;
    });
    builder.addCase(
      fetchData.fulfilled,
      (state, action: PayloadAction<IResultItem[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchData.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchMoreData.pending, (state) => {
      state.isLoading = true;
      state.fetchItems = state.fetchItems + 1;
    });
    builder.addCase(
      fetchMoreData.fulfilled,
      (state, action: PayloadAction<IResultItem[]>) => {
        state.isLoading = false;
        state.data = [...state.data, ...action.payload];
      }
    );
    builder.addCase(
      fetchMoreData.rejected,
      (state, action: PayloadAction<any>) => {
        state.fetchItems = state.fetchItems - 1;
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});
export const searchActions = searchSlice.actions;
export default searchSlice;
