import React, { useState, useEffect } from 'react';
import Header from './component/Header/Header';
import { useTelegram } from './hooks/useTelegram';
import './App.css';
function App() {
  const {tg, onToggleButton} = useTelegram();
  useEffect(()=>{
    tg.ready()
  },[]);

  return (
    <div className="App">
      <Header/>
        <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
