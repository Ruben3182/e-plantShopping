import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, setAddedToCart }) => {


  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const totalAmount = cart.reduce((total, item) => total + item.cost.slice(1) * item.quantity, 0);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
   return totalAmount
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    const newObj={name: "", quantity: ""};
    newObj.name =item.name;
    newObj.quantity =item.quantity;
    newObj.quantity = newObj.quantity + 1;
    dispatch(updateQuantity(newObj));
  };

  const handleDecrement = (item) => {
    const newObj={name: item.name, quantity:item.quantity};
    newObj.quantity = newObj.quantity - 1;
    if(newObj.quantity > 0){
      dispatch(updateQuantity(newObj));
    }
    else if(newObj.quantity == 0){
      dispatch(updateQuantity(newObj));
      setAddedToCart((prevState) => {
        const newObject = { ...prevState };
        delete newObject[item.name];
        return newObject;
      });
    }
  };

  const handleRemove = (item) => {
    setAddedToCart((prevState) => {
      const newObject = { ...prevState };
      delete newObject[item];
      return newObject;
    });
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const totalItem = item.cost.slice(1) * item.quantity;
    return totalItem;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
            {item.quantity == 0 && dispatch(removeItem(item.name))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


