import { configureStore } from '@reduxjs/toolkit';

import shortUrlSlice from './shortUrl-slide';
import tngFileConvertSlice from './tngFileConvert-slide';
import blogPostSlice from './blogPost-slide';
import googleAuthSlice from './googleAuth-slide';

const store = configureStore({
  reducer: { 
    // ui: uiSlice.reducer, 
    shortUrl: shortUrlSlice.reducer,
    tngFileConvert: tngFileConvertSlice.reducer,
    blogPost: blogPostSlice.reducer,
    googleAuth: googleAuthSlice.reducer
  },
});

export default store;
