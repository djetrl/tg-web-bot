import { useDispatch } from 'react-redux';
import { setItem, removeItem } from './basketShopSlice';

const UseActionBasket = () => {
  const dispatch = useDispatch();

  const AddItem = ( action )=>{
    dispatch(setItem(action))
  };
  const dropItem = (action) =>{
    console.log(action);
    dispatch(removeItem(action))
  };
  return({AddItem, dropItem})
}

export default UseActionBasket;