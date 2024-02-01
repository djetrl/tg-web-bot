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
    AddItemCount: (state, action)=>{
      const indexItem = state.items.findIndex(item=>item.id == action.payload);
      state.items[indexItem].count = state.items[indexItem].count + 1

      state.totalCount += state.items[indexItem].price;
    }, 
    decreaseItemCount: (state, action)=>{
      const indexItem = state.items.findIndex(item=>item.id == action.payload);
      state.items[indexItem].count = state.items[indexItem].count - 1

      state.totalCount -= +state.items[indexItem].price;
    }, 
    removeItem: (state, action) =>{
      const indexItem = state.items.findIndex(item=>item.id == action.payload);
      state.totalCount -= (+state.items[indexItem].price *  +state.items[indexItem].count);
      state.items = state.items.filter((arrow) => arrow.id !== action.payload);
    },
    getTotalPrice: (state, action)=>{
      state.totalCount = state.items.reduce((acc, item)=>{
        return acc += +item.price
      },0)
    }

  }
})

export const  {setItem, removeItem, getTotalPrice, AddItemCount, decreaseItemCount} = basketSlice.actions;
export default basketSlice.reducer;