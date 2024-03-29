import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
import { Link } from 'react-router-dom';


const Shop = () => {
//    const first10 =fakeData.slice(0,10);
   const [products,setProducts]= useState([]);
   const [cart,setCart]=useState([]);
   const [search,setSearch]=useState('');
   useEffect(()=>{
        fetch('http://localhost:5000/products?search='+search)
        .then(res=>res.json())
        .then(data=>setProducts(data))
   },[search])

   useEffect(() =>{
    const savedCart= getDatabaseCart();
    const productKeys=Object.keys(savedCart);
     console.log(products,productKeys)
     fetch('http://localhost:5000/productsByKeys',{
       method:'POST',
       headers:{
         'Content-Type':'application/json'
       },
       body:JSON.stringify(productKeys)
     })
     .then(res=>res.json())
     .then(data=>setCart(data))
     
  },[])

  const handleSearch =event=>{
setSearch(event.target.value)
  }
   const handleAddProduct = (product)=>{
       //console.log('added',product);
       const toBeAddedKey=product.key;
       const sameProduct = cart.find(pd => pd.key ===toBeAddedKey);
       let count = 1;
       let newCart;
       if(sameProduct){
         count = sameProduct.quantity+1;
         sameProduct.quantity=count;
         const others =cart.filter(pd =>pd.key !==toBeAddedKey);
         newCart=[...others,sameProduct];
       }
       else{
           product.quantity=1;
           newCart=[...cart,product];
       }
      
       setCart(newCart);
       addToDatabaseCart(product.key , count);
   }
    return (
        <div className="shop-container">
           <div className="products-container">
             <input type="text" onBlur={handleSearch} placeholder="product-search"/>
                {
                    products.map(pd=> <Product showAddToCart={true} handleAddProduct={handleAddProduct} key={pd.key} product={pd}></Product> )
                }
           </div>
           <div className="cart-container">
              <Cart cart={cart}>
              <Link to="/review">
                <button className="add-btn">Review order</button>
             </Link>
              </Cart>
           </div>
        </div>
    );
};

export default Shop;