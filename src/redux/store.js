import {configureStore} from '@reduxjs/toolkit';
import basketReducer from './Slice/basket/basketShopSlice';

export  const store = configureStore({
  reducer:{
    basket:basketReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  
})