import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {  auth, db } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth'
import { CircularProgress, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Table } from '@mui/material';
import { useTheme } from '../Context/ThemeContext';
import Graph from '../Component/Graph';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from '../Component/Footer';
import Header from '../Component/Header';

const UserPage = () => {

  const [data, setData] = useState([]);
  const{theme} = useTheme();
  const[graphData, setGraphData] = useState([]);
  //This below user will tell us that user is in loading state or not.
  const [user,loading] = useAuthState(auth);
  const[dataLoading, setDataLoading] = useState(true); 
  const[joinedAt, setJoinedAt] = useState();
  const fetchUserData = ()=>{
    
    if(!loading){
      console.log(user);
      setJoinedAt(new Date(user.metadata.creationTime).toISOString().split('T')[0])
      console.log(new Date(user.metadata.creationTime).toISOString());
      console.log("sdssd ",joinedAt);
      const {uid} = auth.currentUser;
      const resultRef = db.collection('results');
      let tempData = []
      let tempGraphData = []
      // After using where we are going to get the only user which is login not all the user , which we were getting before using "where"
      resultRef.where("userId",'==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
        // console.log("sed", snapshot);
         
        //by using doc.data we are going to get the individual data,that is stored inside the firestore Database.
        snapshot.docs.forEach((doc)=>{
          // console.log("data",doc.data());
          tempData.push({...doc.data()});
          tempGraphData.push([doc.data().timeStamp,doc.data().wpm]);
           
        });
        setData(tempData);
        setGraphData(tempGraphData);
        setDataLoading(false); 
      }) 
    }
  }
    
  useEffect(()=>{
    fetchUserData();
  },[loading]);


  if(loading || dataLoading){
    <div className="central-screen">
    return (<CircularProgress size={100} color ={theme.title}/>)
    </div>

  }
    
  return (
    // {data.map(i=><h1>{i.wpm} {i.userId}</h1>)}
    <div className='canvas'>
    <Header/>
    <div className='central-data'>

    <div className="user-profile">
      <div className="user">
        <div className="picture">
          <AccountCircleIcon style={{display: 'block', transform:'scale(6)' }}/>
        </div>
        <div className="info">
          <div className="email">
              {user.email};
          </div>
          <div className="joined-on">
            {user.metadata.creationTime}
          </div>
        </div>
      </div>
      <div className="total-times">
        Total Test Taken: {data.length}
      </div>
    </div>
 <div className="result-graph">
    <Graph graphData={graphData} type ='date' />
 </div>
 <div className='table'>
      <TableContainer style={{maxHeight:'30rem'}}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell style={{color:theme.title}}>
                WPM
            </TableCell>
            <TableCell style={{color:theme.title}}>
                 Accuracy
            </TableCell>
            <TableCell style={{color:theme.title}}>
                 Characters
            </TableCell>
            <TableCell style={{color:theme.title, textAlign:'center'}}>
                 Date
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(i=>{
              return(
                <TableRow>
                  <TableCell style={{color:theme.title}}>
                    {i.wpm}
                  </TableCell>
                  <TableCell style={{color:theme.title}}>
                    {i.accuracy}
                  </TableCell>
                  <TableCell style={{color:theme.title}}>
                    {i.characters}
                  </TableCell>
                  <TableCell style={{color:theme.title}}>
                    {/* timeStamp is returning the object and the cell is not taking any object so we have to convert that object in normal date so we have use toDate and then we have to make that date into string form so we have to use toString() to make that date in string form. */}
                    {i.timeStamp.toDate().toString()}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer >
    </div>
      </div>
    <Footer/>
    </div>
     
  )
}

export default UserPage