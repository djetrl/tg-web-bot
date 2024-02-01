import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import UseActionBasket from '../../redux/Slice/basket/ActionbasketShop';
import {useTelegram} from '../../hooks/useTelegram';
import './Basket.css'
const Basket = () => {
  const {tg, queryId} = useTelegram();
  const totalCount = useSelector((state) => state.basket.totalCount)
  const items = useSelector((state) => state.basket.items)
  const {dropItem, pluseItemCount, decreasesItemCount} = UseActionBasket();
  const onSendDate = useCallback(()=>{
    const data = {
      product: items, 
      totalPrice: totalCount,
      queryId,
    }
    fetch('https://nodebot-kli7.onrender.com/web-data',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data)
    })
  },[items, queryId])
  useEffect(()=>{
    tg.onEvent('mainButtonClicked', onSendDate);
    return ()=>{
      tg.offEvent('mainButtonClicked', onSendDate);
    }
  },[onSendDate])
  useEffect(()=>{
    if(items.length === 0){
      tg.MainButton.hide();

    }else{
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `купить ${totalCount}`
      })
    }
  })
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
          <td> Название </td>
          <td> цена </td>
          <td> количество </td>
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