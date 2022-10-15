import React from 'react'
import { useGameMode } from '../Context/GameModes';

function UpperMenu({countDown}) {
  
  const{setGameTime} = useGameMode();

  const updateTime = (e)=>{
    console.log(e.target.id);
    setGameTime(e.target.id);
  }
  return (
    <div className='upper-menu'>
      <div className="counter">{countDown} s</div>
      <div className="time-mode">
      <div className="timer" id='15' onClick={(e)=>updateTime(e)}>15s</div>
      <div className="timer" id='30' onClick={(e)=>updateTime(e)}>30s</div>
      <div className="timer" id='60' onClick={(e)=>updateTime(e)}>60s</div>
      </div>
    </div>
  )
}

export default UpperMenu