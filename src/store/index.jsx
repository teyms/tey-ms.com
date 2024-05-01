import { configureStore } from '@reduxjs/toolkit';

import shortUrlSlice from './shortUrl-slide';

const store = configureStore({
  reducer: { 
    // ui: uiSlice.reducer, 
    shortUrl: shortUrlSlice.reducer 
},
});

export default store;
