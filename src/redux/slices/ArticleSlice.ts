import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { articleState, Article } from "../../types/interface";

const initialState: articleState = {
  featuredArticles: [],
  latestArticles: [],
  articles: [],
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setFeaturedArticles(state, action: PayloadAction<Article[]>) {
      state.featuredArticles = action.payload;
    },
    setLatestArticles(state, action: PayloadAction<Article[]>) {
      state.latestArticles = action.payload;
    },
    setAllArticles(
      state,
      action: PayloadAction<{ featured: Article[]; latest: Article[] }>
    ) {
      state.featuredArticles = action.payload.featured;
      state.latestArticles = action.payload.latest;
    },
  },
});

export const { setFeaturedArticles, setLatestArticles, setAllArticles } =
  articleSlice.actions;
export default articleSlice.reducer;
