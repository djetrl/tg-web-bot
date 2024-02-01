import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios'
import {DeleteOutlined, MinusOutlined, PlusOutlined, FrownOutlined} from '@ant-design/icons';
import UseActionBasket from '../../redux/Slice/basket/ActionbasketShop';
import {useTelegram} from '../../hooks/useTelegram';
import emailjs from '@emailjs/browser';
import './Basket.css'

const sendMail = value=>{
  emailjs.send('service_pofldjet', 'template_3cctkvc', value, 'ZeuxMoL7oP8N-HPde')      
    .then((result) => {
      setSendMailModal('ok');
      setTimeout(()=>{
        setSendMailModal(false);
      }, 1000);
    }, (error) => {
      setSendMailModal('error');
      setTimeout(()=>{
        setSendMailModal(false);
      }, 1000);
    });
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
                  <div className="modal">
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
          <button onClick={onSendDate}>send</button>
      </>
    )

  );
};

export default Basket;