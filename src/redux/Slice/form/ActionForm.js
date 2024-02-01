import { useDispatch } from 'react-redux';
import { setDataForm} from './formSlice';

const UseActionForm = () => {
  const dispatch = useDispatch();

  const addData = ( action )=>{
    dispatch(setDataForm(action))
  };

  return({addData})
}

export default UseActionForm;