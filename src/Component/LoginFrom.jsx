import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { Box, Button, TextField } from '@mui/material'

const LoginFrom = ({handleClose}) => {

    const[email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handelSubmit = () => {
      if(!email || !password){
        alert("fill all the details");
        return;
    }

        auth.signInWithEmailAndPassword(email,password).then((ok)=>{
            // console.log(ok);
            alert("Logged in");
            handleClose();
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

        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:'red'}}
        onClick = {handelSubmit}
        >
            Login

        </Button>

    </Box>
  )
}

export default LoginFrom