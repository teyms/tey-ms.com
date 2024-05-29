import { configureStore } from '@reduxjs/toolkit';

import shortUrlSlice from './shortUrl-slide';
import tngFileConvertSlice from './tngFileConvert-slide';

const store = configureStore({
  reducer: { 
    // ui: uiSlice.reducer, 
    shortUrl: shortUrlSlice.reducer,
    tngFileConvert: tngFileConvertSlice.reducer
},
});

export default store;
