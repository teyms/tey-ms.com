import { createSlice } from '@reduxjs/toolkit';

const tngFileConvertSlice = createSlice({
  name: 'tngFileConvert',
  initialState: {
    name              : '',
    content           : '',        
    size              : '',
    type              : '',
    convertedName     : '',
    convertedContent  : '',
    convertedSize     : '',
    convertedType     : '',
    success           : ''
  },
  reducers: {
    updateTngFile(state, action) {
        state.name              = action.payload?.name              || '';
        state.content           = action.payload?.content           || '';
        state.size              = action.payload?.size              || '';
        state.type              = action.payload?.type              || '';
        // state.convertedName     = action.payload?.convertedName     || '';
        // state.convertedContent  = action.payload?.convertedContent  || '';
        // state.convertedSize     = action.payload?.convertedSize     || '';
        // state.convertedType     = action.payload?.convertedType     || '';
        // const success = action.payload?.success;
        // if(success === false){
        //   state.success = false
        // }else{
        //   state.success = success || '';
        // }
    },
    updateTngFileConverted(state, action){
      // state.name              = action.payload?.name              || '';
      // state.content           = action.payload?.content           || '';
      // state.size              = action.payload?.size              || '';
      // state.type              = action.payload?.type              || '';
      state.convertedName     = action.payload?.convertedName     || '';
      state.convertedContent  = action.payload?.convertedContent  || '';
      state.convertedSize     = action.payload?.convertedSize     || '';
      state.convertedType     = action.payload?.convertedType     || '';
      const success = action.payload?.success;
      if(success === false){
        state.success = false
      }else{
        state.success = success || '';
      }
    }

  },
});

export const tngFileConvertActions = tngFileConvertSlice.actions;

export default tngFileConvertSlice;
