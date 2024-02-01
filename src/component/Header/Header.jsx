import React from 'react';
import Button from '../button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import {ShoppingCartOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import './Header.css'
const Header = () => {
  const {tg, onClose, user} = useTelegram();
  const counter = useSelector((state) => state.basket.totalCount)
  const navigate = useNavigate();
  return (
    <div className='header'>
      <Button onClick={onClose}>Закрыть</Button>
      <span className='username'>
        {counter == 0 || counter === undefined ?  user?.username : (`${counter} руб`)}
      </span>
      <ShoppingCartOutlined className='shopIcon' onClick={()=>{window.location.pathname === '/basket'? navigate('/') : navigate('/basket')}} />
    </div>
  );
};

export default Header;