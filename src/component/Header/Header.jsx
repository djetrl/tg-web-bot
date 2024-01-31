import React from 'react';
import Button from '../button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import shop from './src/asset/icon/shop.svg';
import { ReactSVG } from 'react-svg';
import './Header.css'
const Header = () => {
  const {tg, onClose, user} = useTelegram();
  return (
    <div className='header'>
      <Button onClick={onClose}>Закрыть</Button>
      <span className='username'>
        {user?.username}
      </span>
      <button>  <ReactSVG src={shop} className='shop'/></button>
    </div>
  );
};

export default Header;