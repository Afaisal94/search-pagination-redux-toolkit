import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostsByKeyword = createAsyncThunk("post/fetchPostsByKeyword", async ({currentPage, limit, keyword}) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?title_like=${keyword}&_page=${currentPage}&_limit=${limit}`);
  const response = await res.data; 
  const total_data = await res.headers["x-total-count"];   
  const data = {
    posts: response,
    total_data: total_data
  }
  return data;
});


  const postSlice = createSlice({
    name: "post",
    initialState: {
      posts: [],
      isLoading: false,
      isError: "",
    },
    extraReducers: {
      // FETCH POSTS BY KEYWORD
      [fetchPostsByKeyword.pending]: (state) => {
        state.isLoading = true;
      },
      [fetchPostsByKeyword.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.total_data;
        state.isError = "";
      },
      [fetchPostsByKeyword.rejected]: (state, action) => {
        state.isLoading = false;
        state.posts = [];
        state.isError = action.error.message;
      }
    },
  });
  
  export default postSlice.reducer;