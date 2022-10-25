import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { AppBar,  Box,  Modal, Tab, Tabs } from '@mui/material';
import LoginFrom from './LoginFrom';
import SignUpForm from './SignUpForm';
import {makeStyles} from '@material-ui/core'
import { auth } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAlert } from '../Context/AlertContext';
const useStyles = makeStyles(()=>({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter:"blur(2px)"
    },
    box:{
        width: 400,

    }
}));

const AccountIcon = () => {
    
    
    const[open, setOpen] = useState(false);
    const [value, setValue] = useState(0);


    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = ()=>{
        signInWithPopup(auth,googleProvider).then((res)=>{
            // alert("logged in");
            setAlert({
                open:true,
                type:'success',
                message:'Logged in'
              });
              setTimeout(()=>{
                setAlert({
                  open: false,
                  type: '',
                  message: '',
                })
              },2000)
            handleClose();
        }).catch((err)=>{
            // alert('no login');
            setAlert({
                open:true,
                type:'error',
                message:'not able to use google auth'
              });
              setTimeout(()=>{
                setAlert({
                  open: false,
                  type: '',
                  message: '',
                })
              },2000)
        })
    }
    const [user] = useAuthState(auth);
    const {setAlert} = useAlert();
    
    const handleClose = ()=>{
        setOpen(false);
    }

    const handleChange = (e,v) =>{
        setValue(v);    
    }

    const logout = () =>{
        auth.signOut().then((ok)=>{
            setAlert({
                open:true,
                type:'success',
                message:'logged out'
              });
              setTimeout(()=>{
                setAlert({
                  open: false,
                  type: '',
                  message: '',
                })
              },2000)
        });
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

    const {theme} = useTheme();
    const classes = useStyles();

    return (
    <div  >
        
        <AccountCircleIcon onClick = {handleAccountClick} style={{marginRight:"0.5rem"}} />
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
                            <Tab label = 'login'
                            style={{color:theme.title}}
                            ></Tab>
                            <Tab label = 'signup'
                                style={{color:theme.title}}
                            ></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginFrom handleClose = {handleClose} > </LoginFrom>}
                    {value === 1 && <SignUpForm handleClose = {handleClose} />}

                    
                    <Box className={classes.box} >
                        <span style={{textAlign:"center", margin:"10px"}}>OR</span>
                        <GoogleButton 
                        style={{width:"100%"}}
                        onClick ={signInWithGoogle}
                        />
                    </Box>

                </div>
            </Modal>
        
    </div>
  )
}

export default AccountIcon