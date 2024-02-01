import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  data:{},
}
export const formSlice = createSlice({
  name:'form',
  initialState,
  reducers:{
    setDataForm:(state, action)=>{
      state.data =  Object.assign(state.data, action.payload);
    }

  }
})

export const  {setDataForm} = formSlice.actions;
export default formSlice.reducer;