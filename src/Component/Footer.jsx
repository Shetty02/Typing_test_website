// import { color } from '@mui/system'
import React from 'react'
import Select from 'react-select'
import { useTheme } from '../Context/ThemeContext'
import {themeOptions} from'../style/theme'


const Footer = () => {
  const {setTheme} = useTheme();

  const handleThemeChange =(e) => {
    console.log("works");
    console.log(e.value)
    setTheme(e.value);
  }
  return (
    <div className='footer' >
        <div className="footer-link">
            Links
        </div>
        <div className="theme-options">
            {/* ThemeOptions */}
            <Select
                options = {themeOptions}
                menuPlacement='top'
                 onChange={handleThemeChange}
                 defaultValue={themeOptions[0]}
                //  styles={color= "black"}
            >
            </Select>
        </div>
    </div>
  )
}

export default Footer