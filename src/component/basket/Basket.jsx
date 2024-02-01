import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios'
import {DeleteOutlined, MinusOutlined, PlusOutlined, FrownOutlined} from '@ant-design/icons';
import UseActionBasket from '../../redux/Slice/basket/ActionbasketShop';
import {useTelegram} from '../../hooks/useTelegram';
import emailjs from '@emailjs/browser';
import './Basket.css'

const sendMail = value=>{
  emailjs.send('service_pofldjet', 'template_3cctkvc', 
  {
  name:value.form.name,
  phone:value.form.phone,
  email:value.form.email,
  country:value.form.country,
  city:value.form.city,
  street:value.form.street,
  postalCode:value.form.postalCode,
  product:JSON.stringify(value.data.product),
  totalPrice:value.data.totalPrice,
},
  'ZeuxMoL7oP8N-HPde')      
    .then((result) => {
        console.log(result);
    }, (error) => {
      console.log(error);
    });
}
const googleSheet = (value)=>{
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwhquvz8dv9BZ0kiHhX0Mrj9YAKl2vCe54Wz9aqRWVZu7TfRAtZt0Del3pSmAPHniQg4A/exec'
  let data = new URLSearchParams(Object.entries({
    name:value.form.name,
    phone:value.form.phone,
    email:value.form.email,
    country:value.form.country,
    city:value.form.city,
    street:value.form.street,
    postalCode:value.form.postalCode,
    product:JSON.stringify(value.data.product),
    totalPrice:value.data.totalPrice,
  })).toString();
 

  fetch(scriptURL,{
    method:'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:data,
    mode:'no-cors'
  })
}
const Basket = () => {
  const [formСompleted, setFormСompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {tg, queryId} = useTelegram();
  const totalCount = useSelector((state) => state.basket.totalCount)
  const items = useSelector((state) => state.basket.items);
  const form = useSelector((state) => state.form.data);
  const {dropItem, pluseItemCount, decreasesItemCount} = UseActionBasket();
  const onSendDate = useCallback(()=>{
    const data = {
      product: items, 
      totalPrice: totalCount,
      queryId,
    }
    if(Object.keys(form).length !== 0){
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
      sendMail({data, form});
      googleSheet({data, form})
    }else{
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  },[items, queryId])
  useEffect(()=>{

    console.log(form);
    if(Object.keys(form).length === 0){
      setFormСompleted(false)
    }else{
      setFormСompleted(true)
    }
  }, [form])

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
  },[items])
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
  return (
  items.length == 0 ? (
    <div className="basketNoting">
      <FrownOutlined />
      <p>Тут пока пусто</p>
    </div>
    ):(
      <>
          {showModal && (
                  <div className="modal modal-basket">
                     Заполните форму для покупки
                 </div>
          )}
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
      </>
    )

  );
};

export default Basket;