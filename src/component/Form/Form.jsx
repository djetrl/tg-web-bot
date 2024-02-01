import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import UseActionForm from '../../redux/Slice/form/ActionForm';
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';
const validate = (values) => {
  const errors = {};
  if (!values.street) {
    errors.street = 'Required';
  }
  if (!values.city) {
    errors.city = 'Required';
  }
  if (!values.postalCode) {
    errors.postalCode = 'Required';
  } else if (!/^[0-9]{5}(?:-[0-9]{4})?$/.test(values.postalCode)) {
    errors.postalCode = 'Invalid postal code';
  }
  if(!values.name){
    errors.name = 'Required';
  }else if (!/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(values.name)){
    errors.name = 'Invalid name';
  }else if(!values.name.length > 2){
    errors.name = 'To short';
  }
  if(!values.phone){
    errors.phone = 'Required';
  }else if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(values.phone)){
    errors.phone = 'Invalid phone';
  }
  if(!values.email){
    errors.email = 'Required';
  }else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(values.email)){
    errors.email = 'Invalid email';
  }
  if(!values.country){
    errors.country = 'Required';
  }else if(!values.country.length > 2){
    errors.country = 'To short';
  }
  return errors;



};

const Form = () => {
  const [showModal, setShowModal] = useState(false)
  const {tg} = useTelegram();
  const {addData} = UseActionForm();
  const formik = useFormik({
    initialValues: {
      street: '', 
      city: '', 
      postalCode: '',
      name:'',
      phone:'',
      email:'',
      country:''
    },
    validate: validate,

    onSubmit: values => {
      addData(values);
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      tg.sendData(JSON.stringify(values))
    },
  });
  const onSendDate = useCallback(()=>{
      formik.handleSubmit()
  },[
    formik.values.street, 
    formik.values.postalCode, 
    formik.values.phone,
    formik.values.name,
    formik.values.email,
    formik.values.city,
    formik.values.country
  ])


  return (
    <>
    {showModal && (
             <div className="modal">
                Заполните форму для покупки
            </div>
     )}
    <form className={'form'} onSubmit={formik.handleSubmit}>
      <h3>Введите ваши данные</h3>
      <div className='form-item'>
          <label htmlFor="name">Имя</label>
          <input id="name" type="text" className={'input'}  {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
      </div>
      
      <div className='form-item'>
          <label htmlFor="phone">Номер телефона</label>
          <input id="phone" type="text" className={'input'}  {...formik.getFieldProps('phone')} />
          {formik.touched.phone && formik.errors.phone ? (
            <div>{formik.errors.phone}</div>
          ) : null}
      </div>
      <div className='form-item'>
          <label htmlFor="email">Е-Mail</label>
          <input id="email" type="text" className={'input'}  {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
      </div>
      <div className='form-item'>
          <label htmlFor="country">Страна</label>
          <input id="country" type="text" className={'input'}  {...formik.getFieldProps('country')} />
          {formik.touched.country && formik.errors.country ? (
            <div>{formik.errors.country}</div>
          ) : null}
      </div>
      <div className="form-group">
        <div className='form-item'>
            <label htmlFor="city">Город</label>
            <input id="city" type="text" className={'input'}  {...formik.getFieldProps('city')} />
            {formik.touched.city && formik.errors.city ? (
              <div>{formik.errors.city}</div>
            ) : null}
        </div>
        <div className='form-item'>
            <label htmlFor="street">Улица</label>
            <input id="street" type="text" className={'input'}  {...formik.getFieldProps('street')} />
            {formik.touched.street && formik.errors.street ? (
              <div>{formik.errors.street}</div>
            ) : null}
        </div>
      </div>
      <div className='form-item'>
          <label htmlFor="postalCode">Почтовый индекс</label>
          <input id="postalCode" type="text" className={'input'}  {...formik.getFieldProps('postalCode')} />
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div>{formik.errors.postalCode}</div>
          ) : null}
      </div>
    </form>
    <button className='button add-btn' onClick={onSendDate}>send</button>
    </>
  );
};

export default Form;