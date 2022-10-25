import React from 'react'
import Footer from '../Component/Footer';
import TypingBox from '../Component/TypingBox';
import Header from '../Component/Header';

const HomePage = () => {
    
  
  //  console.log(firebaseApp)
  //  console.log(process.env);

  return (        
     <div className="canvas"> 
     {/* <h1 className='heading' style={{"textAlign":"center" ,marginTop:"60px"}}>Typing Website</h1> */}
     <Header/>
     <TypingBox/>
     {/* <SignUpForm/> */}
     <Footer/>
    </div>
  )
}

export default HomePage