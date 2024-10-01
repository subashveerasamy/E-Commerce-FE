
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import MyContext from '../Context/MyContext';
import { Avatar, createTheme, Drawer, List, ListItem, ListItemText, TextField, useMediaQuery, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import {  ThemeProvider } from '@mui/material';
import styled from 'styled-components';
import NavMiddle from './NavMiddle.jsx';

const ShortSearch = styled.div`
display: none;


@media only screen and (min-width: 200px) and (max-width: 600px) {
    display: flex;
    margin-right: 0.7rem;
  }
`;



const NavBar = ({miniSearchClick, setMiniSearchClick, searchCard}) => {
  const { cart, setCart } = useContext(MyContext);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  

  
  const handleHomePage = () => {
    navigate("/App");
  };

  const handleCartPage = () => {
    navigate("/App/cart");
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#010010',
      },
      secondary: {
        main: '#1a237e',
      },
    },
  });




  const themed = createTheme({
    palette: {
      text: {
        primary: '#ffffff', // Text color
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
    
  };

  const handleOrders = () => {
    
    navigate("/App/orders");
  };

  const handlePersonalDetails= () => {
   
    navigate("personalDetails");
  }

  const handleContact= () => {
   
    navigate("contact");
  }

  const handleLogout= ()=>{
    navigate("/")

  }

  const isBigScreen=useMediaQuery('(min-width:601px)')


  useEffect(() => {
    if (isBigScreen) {
      setMiniSearchClick(false);
    }
  }, [isBigScreen]);



  return (
    <div className="d-flex-column text-light bg-light" id='navBar' style={{cursor:"pointer", maxWidth:"100vw"}}>
      <div className='d-flex mt-3 w-100 justify-content-between align-items-center' style={{ cursor: "pointer", height: "10px", padding: "2.5rem", position: "relative" }}>
          <div style={{ minWidth: "10rem", maxWidth:"15rem" }}>
          { miniSearchClick ?
              (
                <ThemeProvider theme={themed}>
                <TextField
                className='mb-3'
                  id="standard-basic"
                  label="Search"
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <IconButton type="button" aria-label="search" sx={{ color: "white" }}>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    width: '150px',
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
              ) : <div className='text-light' ><h3>Aura Avenue</h3></div>
            }
            
          </div>
          
          
          
          
            
            <div>
              <NavMiddle searchCard={searchCard} />
            </div>
           
            
            
            <div className='text-light d-flex align-items-center'> 
            
            { miniSearchClick ? null :(<ShortSearch onClick={()=> setMiniSearchClick(true)}>
            <SearchIcon></SearchIcon>
        </ShortSearch>)} 
              
              <IconButton type="button" onClick={toggleDrawer(true)}  aria-label="search" sx={{color:"white"}}>
            <MenuIcon sx={{fontSize: 35}} />
          </IconButton>
          </div>
        
      </div>
     
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            top: '95px',
            position: 'absolute',
            width:  '200px',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          },
        }}
      >
        <List onClick={()=>setDrawerOpen(false)} sx={{cursor:"pointer"}}>
          
        
            <ListItem button="true" id='drawer'   onClick={handlePersonalDetails}>
              <ListItemText  primary="Personal Details" />
            </ListItem>
            <ListItem button="true" id='drawer'   onClick={handleHomePage}>
              <ListItemText  primary="Home" />
            </ListItem>
            <ListItem button="true" id='drawer'  onClick={handleOrders}>
              <ListItemText  primary="Orders" />
            </ListItem>
            <ListItem button="true" id='drawer' onClick={handleCartPage}>
              <ListItemText > Cart<span className='ms-3'>({cart.length})</span></ListItemText>
            </ListItem>
            <ListItem button="true" id='drawer'  onClick={handleContact}>
              <ListItemText  primary="Contact" />
            </ListItem>

            <ListItem button="true" id='drawer' onClick={handleLogout}>
              <ListItemText  primary="Log Out" />
            </ListItem>
          
        </List>
      </Drawer>
    </div>
  );
};

export default NavBar;
