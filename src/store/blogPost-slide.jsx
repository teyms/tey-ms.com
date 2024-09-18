import { createSlice } from '@reduxjs/toolkit';

const blogPostSlice = createSlice({
  name: 'blogPost',
  initialState: {
    slug: '',
    title: '',
    content: '',
    status: '',
    msg: '',
    success: ''
  },
  reducers: {
    updateBlogPost(state, action) {
        // state.slug = action.payload?.data?.slug || '';

        state.title = action.payload?.title || '';
        state.content = action.payload?.content || '';
        state.status = action.payload?.status || '';

        state.msg = action.payload?.msg || '';
        const success = action.payload?.success;
        if(success === false){
          state.success = false
        }else{
          state.success = success || '';
        }
    //   const newItem = action.payload;
    //   const existingItem = state.items.find((item) => item.id === newItem.id);
    //   state.totalQuantity++;
    //   state.changed = true;
    //   if (!existingItem) {
    //     state.items.push({
    //       id: newItem.id,
    //       price: newItem.price,
    //       quantity: 1,
    //       totalPrice: newItem.price,
    //       name: newItem.title,
    //     });
    //   } else {
    //     existingItem.quantity++;
    //     existingItem.totalPrice = existingItem.totalPrice + newItem.price;
    //   }
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

export const blogPostActions = blogPostSlice.actions;

export default blogPostSlice;
