import React, { useState,useEffect } from 'react';
import './ProductList.css'
import { useSelector, useDispatch } from "react-redux";
import CartItem from './CartItem';
import {addItem} from './CartSlice';
import axios from 'axios';

function ProductList() {
    const [showCart, setShowCart] = useState(false); 
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const [addedToCart, setAddedToCart] = useState({});
    const [plantsArray, setPlantsArray] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const totalCart = cart.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        axios.get('/e-plantShopping/plantsData.json')
        .then(response => setPlantsArray(response.data))
        .catch(error => console.error('Error loading data:', error));
    }, []);

   const styleObj={
    backgroundColor: '#4CAF50',
    color: '#fff!important',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignIems: 'center',
    fontSize: '20px',
    marginBottom: '20px',
   }
//    const styleObjUl={
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '1100px',
//    }
   const styleA={
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
   }

   const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
   };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
  };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
        ...prevState,
        [product.name]: true, // Set the product name as key and value as true to indicate it's added to cart
        }));
    };

    return (
        <div>
             <div className="navbar" style={styleObj}>
            <div className="tag">
               <div className="luxury">
               <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
               <a href="/" style={{textDecoration:'none'}}>
                        <div>
                    <h3 style={{color:'white'}}>Paradise Nursery</h3>
                    <i style={{color:'white'}}>Where Green Meets Serenity</i>
                    </div>
                    </a>
                </div>
              
            </div>
            <div className="cart-block">
                <div> <a href="#" onClick={(e)=>handlePlantsClick(e)} style={styleA}>Plants</a></div>
                <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}><h1 className='cart'><p className='cart-item-count'>{totalCart}</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68"><rect width="156" height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path></svg></h1></a></div>
            </div>
        </div>
        {!showCart? (
        <div className="product-grid">
            {plantsArray.map((category, index) => (
                <div key={index}>
                    <h1 className='category'><div>{category.category}</div></h1>
                    <div className="product-list">
                        {category.plants.map((plant, plantIndex) => (
                        <div className="product-card" key={plantIndex}>
                            <div className="product-title">{plant.name}</div>
                            <img className="product-image" src={plant.image} alt={plant.name} />
                            <div className="product-item-cost">{plant.cost}</div> 
                            <div className="description">{plant.description}</div> 
                            {/*Similarly like the above plant.name show other details like description and cost*/}
                            <button disabled={addedToCart[plant.name] ? true : false} className="product-button" style={addedToCart[plant.name] ? {background: '#494949' }:{background: '#4CAF50'}} onClick={() => handleAddToCart(plant)}>{addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}</button>
                        </div>
                        ))}
                    </div>{console.log(plantsArray)}
                </div>
        ))}


        </div>
 ) :  (
    <CartItem onContinueShopping={handleContinueShopping} addedToCart={addedToCart} setAddedToCart={setAddedToCart}/>
)}
    </div>
    
    );
}

export default ProductList;
