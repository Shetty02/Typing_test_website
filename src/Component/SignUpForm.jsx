import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';

const SignUpForm = ({handleClose}) => {

    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {setAlert} = useAlert();

    const handleSubmit = () => {
        if(!email || !password || !confirmPassword){
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
        if(password!==confirmPassword){
            // alert("Password Mismatch");
            setAlert({
                open:true,
                type:'warning',
                message:'Password Mismatch'
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
        auth.createUserWithEmailAndPassword(email,password).then((ok)=>{
            // alert("accoungt created");
            setAlert({
                open:true,
                type:'success',
                message:'Singup Successfully'
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
            // alert("Not able to create Account")
            setAlert({
                open:true,
                type:'error',
                message:'not able to signup'
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
              color: theme.title
            }
          }}
          InputProps = {{
            style:{
              color:theme.title
            }
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
        <TextField
        variant='outlined'
        type="password"
        label = 'Confirm password'
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
        onChange={(e)=>setConfirmPassword(e.target.value)}
        >

        </TextField>

        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:theme.title, color:theme.background}}
        onClick = {handleSubmit}
        >
            Sign up

        </Button>

    </Box>
  )
}

export default SignUpForm