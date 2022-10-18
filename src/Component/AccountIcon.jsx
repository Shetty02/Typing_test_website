import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { AppBar,  Modal, Tab, Tabs } from '@mui/material';
import LoginFrom from './LoginFrom';
import SignUpForm from './SignUpForm';
import {makeStyles} from '@material-ui/core'
import { auth } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(()=>({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    box:{
        width: 400,
        color: "white",
        background:"grey"
    }
}));

const AccountIcon = () => {
    
    
    const[open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    
    const handleClose = ()=>{
        setOpen(false);
    }

    const handleChange = (e,v) =>{
        setValue(v);    
    }

    const logout = () =>{
        auth.signOut();
        }
    const handleAccountClick = () => {
        if(user){
            // navigation logic
            navigate('/user');
        }
        else {
            setOpen(true);
        }
    }

    const classes = useStyles();

    return (
    <div  >
        <AccountCircleIcon onClick = {handleAccountClick}/>
         {user && <LogoutRoundedIcon onClick = {logout} /> }
        
        <Modal
            open = {open}
            onClose = {handleClose}
            className = {classes.modal} 
            >
                <div className= {classes.box}>
                    <AppBar 
                        position='static'  
                        style={{backgroundColor:"transparent" , color:"white"}}              
                    >
                        <Tabs
                        value = {value}
                        onChange = {handleChange}
                        variant = "fullWidth"
                        >
                            <Tab label = 'login'></Tab>
                            <Tab label = 'signup'></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginFrom handleClose = {handleClose} > </LoginFrom>}
                    {value === 1 && <SignUpForm handleClose = {handleClose} />}
                </div>
            </Modal>
        
    </div>
  )
}

export default AccountIcon