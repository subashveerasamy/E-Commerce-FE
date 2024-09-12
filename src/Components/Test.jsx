import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../Context/MyContext';
const Test=({item})=> {
    const [buttonText, setButtonText] = useState('');
    const {cart, setCart}=useContext(MyContext);
     useEffect(() => {
        let flag=0;
         cart.map((value, index)=>
        {
            if(value.id === item.id){
                flag=1;
                setButtonText('Remove from cart');
            }
        })
        
        if(flag===0) {
            setButtonText('Add to cart');
        }
    }, [cart, item]);
    


    const handleClick = () => {
        
         if(buttonText === 'Add to cart'){
            item.totalPrice=item.price;
            item.quantity=1;
            setCart([...cart,item])
           
             //setButtonText(buttonText === 'Add to cart' ? 'Remove from cart' : 'Add to cart');
       
        }
        else{
            cart.map((value, index)=>
            {
                if(value.id === item.id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
             //setButtonText(buttonText === 'Add to cart' ? 'Remove from cart' : 'Add to cart');
       
        }
        
       
        
    };

    return (
        <div className='text-center'>
            <button className={`btn ${ buttonText === 'Remove from cart' ? 'btn-danger text-light' : 'btn-outline-secondary'}`}  onClick={handleClick}>
                {buttonText}</button>
        </div>
    );
}

export default Test;
