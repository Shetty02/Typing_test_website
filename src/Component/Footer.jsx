// import { color } from '@mui/system'
import { yellow } from '@mui/material/colors'
import { isFocusable } from '@testing-library/user-event/dist/utils'
import React from 'react'
import Select from 'react-select'
import { useTheme } from '../Context/ThemeContext'
import {themeOptions} from'../style/theme'
import GitHubIcon from '@mui/icons-material/GitHub';

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

      <div className="instructions">
          <div className="hint">
            press <kbd>Tab</kbd> to open commands
          </div>
      </div>
      <div className="actual-footer">
      <div className="footer-link">
          <a href='https://github.com/Shetty02/Typing_test_website' target="_blank" style={{textDecoration:'none',color:theme.title}}> 
            <GitHubIcon/>
          </a>
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
        
    </div>
  )
}

export default Footer