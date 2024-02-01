import React, { useState,useEffect  } from "react";
import axios from 'axios'
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import UseActionBasket from "../../redux/Slice/basket/ActionbasketShop";
const ProductList = () => {
  const [product, setProduct] =useState([]);
  useEffect(()=>{
    axios.get('https://641358a7a68505ea73314d06.mockapi.io/api/v1/Tovar').then((data)=>{
      setProduct(data.data)
    })
  },[])
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
              className={"item"}/>
        ))
      }      
    </div>
  );
};

export default ProductList;