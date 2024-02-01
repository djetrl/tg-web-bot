import {configureStore} from '@reduxjs/toolkit';
import basketReducer from './Slice/basket/basketShopSlice';
import formReducer from './Slice/form/formSlice'
export  const store = configureStore({
  reducer:{
    basket:basketReducer,
    form:formReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  
})