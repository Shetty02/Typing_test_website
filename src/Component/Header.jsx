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

            LOGO
        </div>
      </Link>
        
        <div className="icons">
            <AccountIcon/>
        </div>
    </div>
  )
}

export default Header