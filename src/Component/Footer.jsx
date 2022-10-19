// import { color } from '@mui/system'
import { yellow } from '@mui/material/colors'
import { isFocusable } from '@testing-library/user-event/dist/utils'
import React from 'react'
import Select from 'react-select'
import { useTheme } from '../Context/ThemeContext'
import {themeOptions} from'../style/theme'


const Footer = () => {
  const {setTheme, theme,defaultTheme} = useTheme();

  const handleThemeChange =(e) => {
    console.log("works");
    console.log(e.value)
    localStorage.setItem('theme',JSON.stringify(e.value));
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
                 defaultValue={{label:defaultTheme.label, value:defaultTheme}}
                styles = {{
                  control: styles =>({...styles, backgroundColor: theme.background}),
                  menu:styles =>({...styles, backgroundColor: theme.background}),
                  // option: (styles,{isFocused})
                }}
                />
        </div>
    </div>
  )
}

export default Footer