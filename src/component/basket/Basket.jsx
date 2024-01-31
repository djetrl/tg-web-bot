import React from 'react';
import { useSelector } from 'react-redux';
import './Basket.css'
const Basket = () => {
  const totalCount = useSelector((state) => state.basket.totalCount)
  const items = useSelector((state) => state.basket.items)
  return (
    <div className='basket'>
          <div className="basket-item">
             <p className="basket-item-title">Название</p>
             <p className="basket-item-price">Описание</p>
             <p className="basket-item-price">цена</p>
             <p className="basket-item-price">количество</p>
          </div>
      {
        items?.map((item)=>{
         return(
          <div className="basket-item">
             <p className="basket-item-title">{item.title}</p>
             <p className="basket-item-price">{item.description}</p>
             <p className="basket-item-price">{item.price}</p>
             <p className="basket-item-price">x{item.count}</p>
          </div>
         )
        })
      }
    </div>
  );
};

export default Basket;