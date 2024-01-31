import React from 'react';
import Button from '../button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import {ShoppingCartOutlined} from '@ant-design/icons'
import './Header.css'
const Header = () => {
  const {tg, onClose, user} = useTelegram();
  return (
    <div className='header'>
      <Button onClick={onClose}>Закрыть</Button>
      <span className='username'>
        {user?.username}
      </span>
      <ShoppingCartOutlined className='shopIcon' />
    </div>
  );
};

export default Header;