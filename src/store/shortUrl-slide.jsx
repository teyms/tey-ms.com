import { createSlice } from '@reduxjs/toolkit';

const shortUrlSlice = createSlice({
  name: 'shortUrl',
  initialState: {
    data: {
      original_url: '',
      shorten_url: '',
      success: ''
    },
    manage:{
      success: '',
      controlSuccessPopUp: false,
      data: [
        //   id: number,
        //   url: string,
        //   original_url: string,
        //   title: string | null,
        //   description: string | null,
        //   click_count: number,
        //   expires_at: string | null,
        //   short_url_path: string | null,
      ],
      pagination: {
        current_page: -1,
        total_pages: -1,
        total_items: -1,
        per_page: -1
      }
    }
  },
  reducers: {
    updateShortUrl(state, action) {
      state.data.original_url = action.payload?.original_url || '';
      state.data.shorten_url = action.payload?.shorten_url || '';
      const success = action.payload?.success;
      if(success === false){
        state.data.success = false
      }else{
        state.data.success = success || '';
      }
    },
    updateShortUrlList(state, action) {
      const action_type = action.payload?.action_type;
      switch(action_type){
        case 'BATCH_RECORDS_FROM_API':{
          state.manage.data = action.payload?.res?.data;
          state.manage.success = action.payload?.res?.success;
          state.manage.pagination = action.payload?.res?.pagination;
          break;
        }
        case 'SINGLE_RECORD_UPDATE': {
          // const dataList = state.manage.data 
          const updatedData  = state.manage.data.map(url => 
            (url.id === action.payload?.res_data?.id)
              ? action.payload?.res_data 
              : url
          );
          // Assign the updated array back to the state to trigger the re-render
          state.manage.data = updatedData;

          state.manage.controlSuccessPopUp = action.payload?.controlSuccessPopUp;
          const success = action.payload?.success;
          if(success === false){
            state.manage.success = false
          }else{
            state.manage.success = success || '';
          }
          break;
        }
        case 'SINGLE_RECORD_DELETE': {
          const updatedData = state.manage.data.filter(url => url.id !== action.payload?.res_data?.id);
          // Assign the updated array back to the state to trigger the re-render
          state.manage.data = updatedData;
          break;
        }
        default:{
          break;
        }
      }
    },
    // removeItemFromCart(state, action) {
    //   const id = action.payload;
    //   const existingItem = state.items.find((item) => item.id === id);
    //   state.totalQuantity--;
    //   state.changed = true;
    //   if (existingItem.quantity === 1) {
    //     state.items = state.items.filter((item) => item.id !== id);
    //   } else {
    //     existingItem.quantity--;
    //     existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
    //   }
    // },
  },
});

export const shortUrlActions = shortUrlSlice.actions;

export default shortUrlSlice;
