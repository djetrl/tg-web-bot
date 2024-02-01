import React, { useState, useCallback, useEffect  } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import UseActionBasket from '../../redux/Slice/basket/ActionbasketShop';
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
const ProductList = () => {

  const {AddItem} = UseActionBasket();

  const onAdd = (product) => {
    AddItem(product)
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