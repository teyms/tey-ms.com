import { createSlice } from '@reduxjs/toolkit';

const googleAuthSlice = createSlice({
  name: 'googleAuth',
  initialState: {
    token: '',
    user: null,
    isAuthenticated: false,
    msg: '',
    success: ''
  },
  reducers: {
    updateGoogleAuth(state, action) {
        state.token = action.payload?.token || '';
        state.user = action.payload?.user || null;
        
        state.msg = action.payload?.msg || '';
        const success = action.payload?.success;
        if(!success){
            state.success = false
            state.isAuthenticated = false;
        }else{
            state.isAuthenticated = true;
            state.success = success || '';
        }
    },
  },
});

export const googleAuthActions = googleAuthSlice.actions;

export default googleAuthSlice;
