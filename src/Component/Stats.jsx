import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import Graph from './Graph'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useAlert } from '../Context/AlertContext';
import { Tooltip } from '@material-ui/core';
const Stats = ({wpm,accuracy,correctChars,incorrectChars,extraChars,missedChars,graphData,reset}) => {
  
    var timeSet = new Set();

    const {setAlert} = useAlert();
    
    const newGraph = graphData.filter((i)=>{
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    });

    const [user] = useAuthState(auth);
    const pushStatsToDb = async () => {
        const resultsRef = db.collection('results');
        const {uid} = auth.currentUser
        if(!isNaN(accuracy)){
            await resultsRef.add({
                userId: uid ,
                wpm: wpm,
                accuracy:accuracy,
                characters: `${correctChars}/${incorrectChars}/${extraChars}/${missedChars}`,
                timeStamp: new Date()
            });
        }
        else {
            setAlert({
                open:true,
                type: 'error',
                message:'invalid test'
            });
            setTimeout(()=>{
                setAlert({
                    open:false,
                    type:"",
                    message:""
                })
            },2000);
        } 
    }
    useEffect(()=>{
        if(user){
            pushStatsToDb();
        }
    },[]);

    console.log("new Graph: ",newGraph);  

    return (
    <div className="stats-box">
        <div className="left-stats">

            <div className="stats">
                <div className="title">WPM</div>
                <div className="subtitle">{wpm}</div>
                <div className="title">Accuracy</div>
                <div className="subtitle">{accuracy}</div>
                <div className="title">Characters</div>
                <Tooltip title='Correct/Incorect/Extra/Missed' placement='bottom-start'arrow>
                <div className="subtitle">{correctChars}/{incorrectChars}/{extraChars}/{missedChars}</div>
                </Tooltip>
            </div>
            <RestartAltIcon className='reset-btn' onClick = {reset}/>
        </div>
        <div className="right-stats">
            {/* // graph goes here */} 
            <Graph graphData = {newGraph}/>
        </div>
    </div>
  )
}

export default Stats