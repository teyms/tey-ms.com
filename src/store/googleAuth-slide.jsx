import { createSlice } from '@reduxjs/toolkit';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '../utils/constant';


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
    updateUserShortUrlPath(state, action) {
      state.user.short_url_path = action.payload?.short_url_path || null;
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(state.user));      
    },
  },
});

export const googleAuthActions = googleAuthSlice.actions;

export default googleAuthSlice;
