import React, { useState, useCallback } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import {useTelegram} from '../../hooks/useTelegram';
const product = [
  {id:'1', title:'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
  {id:'2', title:'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
  {id:'3', title:'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
  {id:'4', title:'Куртка 2', price: 122, description: 'Зеленого цвета, теплая'},
  {id:'5', title:'Джинсы 8', price: 5000, description: 'Синего цвета, прямые'},
  {id:'6', title:'Джинсы 3', price: 600, description: 'Зеленого цвета, теплая'},
  {id:'7', title:'Джинсы 7', price: 5500, description: 'Синего цвета, прямые'},
  {id:'8', title:'Джинсы 4', price: 12000, description: 'Зеленого цвета, теплая'},

]
const getTotalPrice = (items = [])=>{
  return items.reduce((acc, item)=>{
    return acc += item.price
  }, 0)
}
const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const {tg, queryId} = useTelegram();
  const onSendDate = useCallback(()=>{
    const data = {
      product: addedItems, 
      totalPrice: getTotalPrice(addedItems),
      queryId,
    }
    fetch('https://comfy-puppy-c041ba.netlify.app/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data)
    })
  },[addedItems, queryId])
  useEffect(()=>{
    tg.onEvent('mainButtonClicked', onSendDate);
    return ()=>{
      tg.offEvent('mainButtonClicked', onSendDate);
    }
  },[onSendDate])
  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id);
    let newItems = [];
  
    if(alreadyAdded){
      newItems = addedItems.filter(item => item.id !== product.id);
    }else{
      newItems = [...addedItems, product]
    }
    setAddedItems(newItems);
    if(newItems.length === 0){
      tg.MainButton.hide();

    }else{
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `купить ${getTotalPrice(newItems)}`
      })
    }
  }
  return (
    <div className="list">
      {
        product.map(item=>(
          <ProductItem
              key={item.id}
              product={item}
              onAdd={onAdd}
              className={'item'}/>
        ))
      }      
    </div>
  );
};

export default ProductList;