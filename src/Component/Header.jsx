import React from 'react'
import { Link } from 'react-router-dom'
import AccountIcon from './AccountIcon'
import { useTheme } from '../Context/ThemeContext'

const Header = () => {
  const{theme} = useTheme();

  return (
    <div className='header'>
      <Link to='/' style={{textDecoration:'none',color:theme.title}}>
        <div className="logo" style={{cursor:'pointer'}}>

            {/* <img src="https://e7.pngegg.com/pngimages/501/834/png-clipart-computer-keyboard-information-typing-miscellaneous-text.png" alt="" /> */}
             TypingTest
        </div>
      </Link>
        
        <div className="icons">
            <AccountIcon/>
        </div>
    </div>
  )
}

export default Header