import React from 'react'
import { ThemeProvider} from 'styled-components';
import {useTheme} from '../Context/ThemeContext';
import Footer from '../Component/Footer';
import TypingBox from '../Component/TypingBox';
import { GlobalStyles } from '../style/global';
import Header from '../Component/Header';

const HomePage = () => {
    
  const {theme} = useTheme();
  
  //  console.log(firebaseApp)
  //  console.log(process.env);

  return (        
    <ThemeProvider theme = {theme}>
     <div className="canvas"> 
     <GlobalStyles/>
     {/* <h1 className='heading' style={{"textAlign":"center" ,marginTop:"60px"}}>Typing Website</h1> */}
     <Header/>
     <TypingBox/>
     {/* <SignUpForm/> */}
     <Footer/>
    </div>
    </ThemeProvider>
  )
}

export default HomePage