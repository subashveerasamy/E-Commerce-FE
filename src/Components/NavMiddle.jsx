import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, IconButton, TextField, ThemeProvider } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import MyContext from '../Context/MyContext';
import productInfo from '../Context/productsInfo';

const NavMid = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 100%;
padding: 0 10px;

@media only screen and (max-width: 800px) {
    display: none;
  }
`;

const Cart = styled.button`
width: 8rem;
@media only screen and (max-width: 1000px) {
    width: 5rem;
    
  }

`;

const Span = styled.span`
display: inline-block;
@media only screen and (max-width: 1000px) {
    display: none;
  }
`;

const Search = styled.div`
         width: 100%; 
  max-width: 600px; 

  @media only screen and (max-width: 768px) {
    width: 80%; 

  @media only screen and (max-width: 500px) {
    width: 100%; 
`;




const ResSearch = styled.div`
display: none;

@media only screen and (min-width: 601px) and (max-width: 800px) {
    display: block;
  }
`;





const NavMiddle = ({searchCard}) => {
  const { cart, setCart } = useContext(MyContext);
  const {cards, setCards}=useContext(productInfo);
  const themed = createTheme({
    palette: {
      text: {
        primary: '#ffffff', // Text color
      },
    },
  });
 
  const navigate = useNavigate();
  const handleHomePage = () => {
    navigate("/App");
  };

  const handleCartPage = () => {
    navigate("/App/cart");
  };
 
  const [search, setSearch]= useState('');

  

  const handleSearch = async (e) => {
    e.preventDefault();

   
    setSearch(e.target.value);
    
    

      let searchResult=searchCard.filter((item) => {
        if (item.title.toLowerCase().includes(e.target.value)) {
          return item;
        }
      });
      setCards(searchResult);
    
        

  };


  const navigateSearch = (e) => {
    e.preventDefault();
    
    navigate("/App");
    
  }


  return (
   <div>
     <NavMid className='' id='navMiddle' style={{ cursor: "pointer" }}>
       <div className='mx-3' onClick={handleHomePage}>Home</div>
        <form onSubmit={navigateSearch}>
        <Search className='ms-4 mx-4 mb-3'>
          <ThemeProvider theme={themed}>
            <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              onChange={handleSearch}
              value={search}
              type='text'
              InputProps={{
                endAdornment: (
                  <IconButton type="button" aria-label="search" sx={{ color: "white" }}>
                    <SearchIcon type="submit" />
                  </IconButton>
                ),
              }}
              sx={{
                '& .Mui-focused .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
              }}
            />
          </ThemeProvider>
        </Search>
        </form>
      
      <div className='ms-3' style={{ marginRight: "30px" }}>
        <Cart  onClick={handleCartPage} style={{  borderRadius: "10px", height: "2.7rem" }}>
          <FontAwesomeIcon  icon={faCartShopping} /> <Span>cart </Span><span className='bg-dark text-light ms-2' style={{ borderRadius: "25%", padding: "1px" }}>{cart.length}</span>
        </Cart>
      </div>
    </NavMid>

    <form onSubmit={navigateSearch}>
    <ResSearch className='ms-4 mx-4 mb-3'>
          <ThemeProvider theme={themed}>
            <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              onChange={handleSearch}
              value={search}
              type='text'
              InputProps={{
                endAdornment: (
                  <IconButton type="button" aria-label="search" sx={{ color: "white" }}>
                    <SearchIcon type="submit" />
                  </IconButton>
                ),
              }}
              sx={{
                '& .Mui-focused .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
              }}
            />
          </ThemeProvider>
        </ResSearch>
    </form>

       


   </div>
  );
};

export default NavMiddle;
