import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { Box, Button, TextField } from '@mui/material'
import { useTheme } from '../Context/ThemeContext';
import { useAlert } from '../Context/AlertContext';

const LoginFrom = ({handleClose}) => {

    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const{setAlert} = useAlert();

    const handelSubmit = () => {
      if(!email || !password){
        // alert("fill all the details");
        setAlert({
          open:true,
          type:'warning',
          message:'fill all the details'
        });
        setTimeout(()=>{
          setAlert({
            open: false,
            type: '',
            message: '',
          })
        },2000)
        return;
    }

        auth.signInWithEmailAndPassword(email,password).then((ok)=>{
            // console.log(ok);
            // alert("Logged in");
            setAlert({
              open:true,
              type:'success',
              message:'logged in'
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
          setAlert({
            open:true,
            type:'error',
            message:'not able to login'
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
    
    const {theme} = useTheme();

  return (
    <Box
    p ={3}
    style ={{
        display : 'flex',
        flexDirection: 'column',
        padding: 10,
        gap:'20px',
        // backgroundColor: 'white',
}}
    >
        <TextField
        variant='outlined'
        type="email"
        label = 'Enter Email'
        InputLabelProps={{
          style:{
            color: theme.title,
          }
        }}
        InputProps = {{
          style:{
            color:theme.title,
          },
          // outLine:"green"
        }}
        onChange={(e)=>setEmail(e.target.value)}
        >

        </TextField>
        <TextField
        variant='outlined'
        type="password"
        label = 'Enter Password'
        InputLabelProps={{
          style:{
            color: theme.title
          }
        }}
        InputProps = {{
          style:{
            color:theme.title
          }
        }}
        onChange={(e)=>setPassword(e.target.value)}
        >

        </TextField>

        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:theme.title, color:theme.background}}
        onClick = {handelSubmit}
        >
            Login

        </Button>

    </Box>
  )
}

export default LoginFrom