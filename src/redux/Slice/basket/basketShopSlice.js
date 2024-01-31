import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items:[],
  totalCount:0
}
export const basketSlice = createSlice({
  name:'basket',
  initialState,
  reducers:{
    setItem: (state, action)=>{
      action.payload.count = 1
      state.items.push(action.payload)
      state.totalCount += +action.payload.price
    },
    removeItem: (state, action) =>{
      state.items.filter((arrow) => arrow.id !== action.payload);
    },
    getTotalPrice: (state, action)=>{
      state.totalCount = state.items.reduce((acc, item)=>{
        return acc += +item.price
      },0)
    }

  }
})

export const  {setItem, removeItem, getTotalPrice} = basketSlice.actions;
export default basketSlice.reducer;