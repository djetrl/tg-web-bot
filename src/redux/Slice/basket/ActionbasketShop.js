import { useDispatch } from 'react-redux';
import { setItem, removeItem, AddItemCount, decreaseItemCount } from './basketShopSlice';

const UseActionBasket = () => {
  const dispatch = useDispatch();

  const AddItem = ( action )=>{
    dispatch(setItem(action))
  };
  const pluseItemCount = ( action )=>{
    dispatch(AddItemCount(action))
  };
  const decreasesItemCount = ( action )=>{
    dispatch(decreaseItemCount(action))
  };
  const dropItem = (action) =>{
    dispatch(removeItem(action))
  };
  return({AddItem, dropItem, pluseItemCount, decreasesItemCount})
}

export default UseActionBasket;