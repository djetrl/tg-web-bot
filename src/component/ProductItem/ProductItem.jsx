import React, { useState } from 'react';
import './ProductItem.css'
import Button from '../button/Button';
import UseActionBasket from '../../redux/Slice/basket/ActionbasketShop';
const ProductItem = ({product, className, onAdd}) => {
  const [count, setCount] = useState(null);
  const {dropItem} = UseActionBasket();
  const onAddHandler = () =>{
    onAdd(product)
    setCount(1);
  }
  const onAddCountItem = () =>{
    // onAdd(product)
    if(count < 10){
      setCount(count + 1);
    }
  }

  const onRemoveCountItem = () =>{
    // onAdd(product)
    if(count > 1 ){
      setCount(count - 1);
    }else{
      dropItem(product.id)
      setCount(null);
    }
  }
  return (
    <div className={'product ' + className}>
      <div className="img"/>
      <div className="title">{product.title}</div>
      <div className="description">{product.description}</div>
      <div className="price">
        <span>Стоимость: <b>{product.price}</b></span>
      </div>
        {
          count === null ? (
            <Button className="add-btn" onClick={onAddHandler}>
              Добавить в корзину
            </Button>
          ):(
            <div className="addCount">
            <Button className="addCount-btn" onClick={onRemoveCountItem}>-</Button>
              <span>{count}</span>
            <Button className="addCount-btn" onClick={onAddCountItem}>+</Button>
          </div>
          )
        }
    </div>
  );
};

export default ProductItem;