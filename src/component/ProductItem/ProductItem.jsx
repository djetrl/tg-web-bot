import React, { useEffect, useState } from 'react';
import './ProductItem.css'
import Button from '../button/Button';
import UseActionBasket from '../../redux/Slice/basket/ActionbasketShop';
import { useSelector } from 'react-redux';
const ProductItem = ({product, className, onAdd}) => {
  const [count, setCount] = useState(product.count == undefined ? null : product?.count );
  const {dropItem, decreasesItemCount, pluseItemCount} = UseActionBasket();
  const items = useSelector((state) => state.basket.items)
  useEffect(()=>{
    const findIndexItem = items.findIndex(item=>item.id == product.id)
    if(findIndexItem != -1){
      setCount(items[findIndexItem] == undefined ? null : items[findIndexItem]?.count)
    }
  }, [items.length])
  const onAddHandler = () =>{
    onAdd(product)
    setCount(1);
  }
  const onAddCountItem = (productId) =>{
    if(count < 10){
      setCount(count + 1);
      pluseItemCount(productId)
    }
  }

  const onRemoveCountItem = (productId) =>{
    if(count > 1 ){
      setCount(count - 1);
      decreasesItemCount(productId)
    }else{
      dropItem(product.id)
      setCount(null);
    }
  }
  return (
    <div className={'product ' + className}>
      <div className="img">
        {product.img && <img src={product.img} alt={`${product.title} image`} />}
      </div>
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
            <Button className="addCount-btn" onClick={()=>onRemoveCountItem(product.id)}>-</Button>
              <span>{count}</span>
            <Button className="addCount-btn" onClick={()=>onAddCountItem(product.id)}>+</Button>
          </div>
          )
        }
    </div>
  );
};

export default ProductItem;