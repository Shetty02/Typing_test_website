import './App.css';
import TypingBox from './Component/TypingBox';
import { GlobalStyles } from './style/global';

function App() {

  return (
    <div className="canvas"> 
     <GlobalStyles/>
     <h1 className='heading' style={{"textAlign":"center" ,marginTop:"60px"}}>Typing Website</h1>
     <TypingBox/>
     <h1 style={{"textAlign":"center"}}>footer</h1>
    </div>
  );
}

export default App;
