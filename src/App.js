import React, { useState, useEffect } from 'react';
import Header from './component/Header/Header';
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductList from './component/ProductList/ProductList';
import Form from './component/Form/Form';
import Basket from './component/basket/Basket'
function App() {
  const {tg, onToggleButton} = useTelegram();
  useEffect(()=>{
    tg.ready()
  },[]);

  return (
    <div className="App">
      <Header/>
       <Routes>
          <Route index element={<ProductList/>}/>
          <Route path={'form'} element={<Form/>}/>
          <Route path={'/basket'} element={<Basket/>}/>
       </Routes>
    </div>
  );
}

export default App;
