import React from 'react';
import { useSelector, useState } from 'react-redux';
import {DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import UseActionBasket from '../../redux/Slice/basket/ActionbasketShop';
import './Basket.css'
const Basket = () => {
  const totalCount = useSelector((state) => state.basket.totalCount)
  const items = useSelector((state) => state.basket.items)
  const {dropItem, pluseItemCount, decreasesItemCount} = UseActionBasket();
  const onAddCountItem = (productId, productCount) =>{
    if(productCount < 10){
      pluseItemCount(productId)
    }
  }

  const onRemoveCountItem = (productId, productCount) =>{
    if(productCount > 1 ){
      decreasesItemCount(productId)
    }else{
      dropItem(productId)
    }
  }
  const onRemoveItem = (productId) =>{
    dropItem(productId)
  }
  // Заменить на таблицу
  return (
    <table className='basket'>
      <thead>
        <tr className="basket-item">
          <td  className="basket-item-title"> Название </td>
          <td  className="basket-item-price"> цена </td>
          <td  className="basket-item-price"> количество </td>
        </tr>
      </thead>
      <tbody>
      {
        items?.map((item)=>{
         return(
          <tr className="basket-item">
             <td>{item.title}</td>
             <td>{item.price}</td>
             <td>x{item.count}</td>
             <td>
                <MinusOutlined className='basket-icon' onClick={()=>onRemoveCountItem(item.id, item.count)}/> 
                <PlusOutlined  className='basket-icon' onClick={()=>onAddCountItem(item.id, item.count)} />
              </td>
             <td><DeleteOutlined  className='basket-icon' onClick={()=>onRemoveItem(item.id)}  /></td>
          </tr>
         )
        })
      }
      </tbody>
    </table>
  );
};

export default Basket;