import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../Context/MyContext';
import axios from 'axios';

const Test = ({ item }) => {
    const [buttonText, setButtonText] = useState('');
    const { cart, setCart } = useContext(MyContext);

    useEffect(() => {
        let flag = 0;
       
        cart.forEach((value) => {
            if (value._id === item._id) {
                flag = 1;
                setButtonText('Remove from cart');
            }
        });

        if (flag === 0) {
            setButtonText('Add to cart');
        }

    }, [cart]);

    const updateCart = async (updatedCart) => {
        try {
            const response = await axios.put('https://e-commerce-be-828a.onrender.com/user/updateCart', { cart: updatedCart },
                {
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                  }
            );
           
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleClick = () => {
        let updatedCart;
        if (buttonText === 'Add to cart') {
            item.totalPrice = item.price;
            updatedCart = [...cart, item];
            setCart(updatedCart);
        } else {
            updatedCart = cart.filter((value) => value._id !== item._id);
            setCart(updatedCart);
        }
        // console.log(cart);
        updateCart(updatedCart);
    };

    return (
        <div className='text-center'>
            <button className={`btn ${buttonText === 'Remove from cart' ? 'btn-danger text-light' : 'btn-outline-secondary'}`} onClick={handleClick}>
                {buttonText}
            </button>
        </div>
    );
};

export default Test;
