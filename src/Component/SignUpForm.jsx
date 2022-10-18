import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig';

const SignUpForm = ({handleClose}) => {

    const[email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleSubmit = () => {
        if(!email || !password || !confirmPassword){
            alert("fill all the details");
            return;
        }
        if(password!==confirmPassword){
            alert("Password Mismatch");
            return;
        }
        auth.createUserWithEmailAndPassword(email,password).then((ok)=>{
            alert("accoungt created");
            handleClose();
        }).catch((err)=>{
            alert("Not able to create Account")
        });
    }

  return (
    <Box
    p ={3}
    style ={{
        display : 'flex',
        flexDirection: 'column',
        padding: 10,
        gap:'20px',
        backgroundColor: 'white',
}}
    >
        <TextField
        variant='outlined'
        type="email"
        label = 'Enter Email'
        onChange={(e)=>setEmail(e.target.value)}
        >

        </TextField>
        <TextField
        variant='outlined'
        type="password"
        label = 'Enter Password'
        onChange={(e)=>setPassword(e.target.value)}
        >

        </TextField>
        <TextField
        variant='outlined'
        type="password"
        label = 'Confirm password'
        onChange={(e)=>setConfirmPassword(e.target.value)}
        >

        </TextField>

        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:'red'}}
        onClick = {handleSubmit}
        >
            Sign up

        </Button>

    </Box>
  )
}

export default SignUpForm