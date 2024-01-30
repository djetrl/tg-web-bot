import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';

const Form = () => {
  const [country, setCountry ] = useState('');
  const [street, setStreet ] = useState('');
  const [subject, setSubject] = useState('physical');
  const {tg} = useTelegram();
  useEffect(() => {
    tg.MainButton.SetParams({
      text: 'Отправить данные'
    })
  },[])
  useEffect(() => {
    if(!street || !country){
      tg.MainButton.hide();
    }else{
      tg.MainButton.show();
    }
  },[country, street])
  const onChangeCountry = ( e ) => { 
    setCountry(e.target.value)
  }
  const onChangeCity = ( e ) => { 
    setStreet(e.target.value)
  }
  const onChangeSubject = ( e ) => { 
    setSubject(e.target.value)
  }
  return (
    <div className={'form'}>
      <h3>Введите ваши данные</h3>
      <input 
            className={'input'} 
            type="text"  
            placeholder={'Страна'}
            value={country}
            onChange={onChangeCountry}/>
      <input 
            className={'input'} 
            type="text" 
            placeholder={'Улица'} 
            value={street}
            onChange={onChangeCity}/>
      <select 
            className={'select'} 
            value={subject} 
            onChangeSubject={onChangeSubject}>
        <option value={'physical'}>физ.лицо</option>
        <option value={'legal'}>Юр.лицо</option>
      </select>
    </div>
  );
};

export default Form;