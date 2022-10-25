import { Dialog, DialogTitle } from '@mui/material';
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { useGameMode } from '../Context/GameModes';
import CapsLockWarning from './CapsLockWarning';
import Stats from './Stats';
import UpperMenu from './UpperMenu';
var randomWords = require('random-words');

const TypingBox = () => {
  const [currWordIndex, setCurrWordIndex] = useState(0); // Ex : I am on word Activity
  const [currCharIndex, setCurrCharIndex] = useState(0); // In an Activity which index i am on
  const [countDown, setCountDown] = useState(15); // for Timer
  const [testStart, setTestStart] = useState(false);
  const [testOver, setTestOver] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const[capsLocked,setCapsLocked] = useState(false);
  const[correctChar,setCorrectChar] = useState(0);
  const[incorrectChar,setInCorrectChar] = useState(0);
  const[missedChar, setMissedChar] = useState(0);
  const[correctWords,setCorrectWords] = useState(0);
  const[extraChar,setExtraChar] = useState(0);
  const[graphData,setGraphData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const[wordsArray,setWordsArray] = useState(()=>{
    return randomWords(50);
  });
  
  const {gameTime} = useGameMode();

  const handleDialogEvents = (e) =>{

    if(e.keyCode === 9 || e.keyCode === 13){
      e.preventDefault();
      setOpenDialog(false);
      resetGame();
      return;
    }
    if(e.keyCode === 32){
      e.preventDefault();
      setOpenDialog(false);
      redoGame();
      return;
}
      e.preventDefault();
      setOpenDialog(false);
      focusInput();
      startTimer();
}

  const redoGame = () =>{
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setCountDown(gameTime);
    setTestOver(false);
    setTestStart(false);
    clearInterval(intervalId);
    // setWordsArray(wordsArray);
    resetWordSpanRef();
    setCorrectChar(0);
    setInCorrectChar(0);
    setCorrectWords(0);
    setMissedChar(0);
    setExtraChar(0);
    setGraphData([]);
    focusInput();

  }

  const words = useMemo(()=>{
    return wordsArray;
  },[wordsArray]);

  const wordSpanRef = useMemo(()=>{
    return Array(words.length).fill(0).map(i=>createRef());
  },[words]);

  const resetGame = ()=>{
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setCountDown(gameTime);
    setTestOver(false);
    setTestStart(false);
    clearInterval(intervalId);
    let random = randomWords(50);
    setWordsArray(random);
    setCorrectChar(0);
    setInCorrectChar(0);
    setCorrectWords(0);
    setMissedChar(0);
    setExtraChar(0);
    setGraphData([]);
    focusInput();
    // setWordSpanRef(Array(words.length).fill(0).map((i) => createRef()));
  } 

  useEffect(()=>{
    resetGame();
  },[gameTime])

  // const wordSpanRef = Array(words.length)
  //   .fill(0)
  //   .map((i) => createRef());

  // Arrays(5) = [., ., ., ., .]
  // Arrays(5).fill(0) = [0, 0,0, 0, 0] //This fill will fill the arrays with zeros.
  //createRef is a function it is not a hook.
  //  useRef is a hook.
  //wordSpanRef[4] -> wordSpanRef[currWordIndex] , so this will give me the current word on which i am on.
  //wordSpanRef[4] -> wordSpanRef[currWordIndex][currCharIndex], so this will give me the current char on which I am on.

  //  console.log(wordSpanRef);

  // console.log(words);
  const textInputRef = useRef(null);
  // console.log(textInputRef);

  //function for decreasing the timer .
  const startTimer = () => {
    //Here we are using setInterval() function in that we are passing timer as a callback function and time
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);    

    function timer() {
      console.log("works");
      //setCountDown takes a callback function i.e prevCountDown for reducing the timer.
      setCountDown((prevCountDown) => {
        console.log("prev: ",prevCountDown)
        setCorrectChar((correctChar)=>{
          console.log("correctChar:",correctChar)
          setGraphData((data) =>{ 
            return [...data,[gameTime-prevCountDown,Math.round((correctChar/5)/(gameTime-prevCountDown+1/60))]]
          })
          return correctChar;
        })
        //This condition for stop timer at 0s 
        if (prevCountDown === 1) {
          clearInterval(intervalId); // This will stop the setInterval() function
          setCountDown(0);
          setTestOver(true);// Here we are calling testOver() function , In which after the test is over we are going to show stats. 
        } else {
          return prevCountDown - 1;
        }
      });
    }
  };

  const calculateWPM = ()=>{
    return Math.round((correctChar/5)/(gameTime/60));
  }

  const calculateAccuracy = () => {
    return  Math.round((correctWords/currWordIndex)*100)
  }

  const handleKeyDown = (e) => {
    // console.log("down",e);

     //logic for tab
      if(e.keyCode === 9){
        
        if(testStart){
          clearInterval(intervalId);
        }
        e.preventDefault();
        setOpenDialog(true)
        return;
      }

    setCapsLocked(e.getModifierState("CapsLock"))
    // here we are starting the timer and making the TestStart as true.
    if (!testStart) {
      startTimer(); // startTimer function which will be used for decreasing the value of the timer
      setTestStart(true);
    }

    let allSpans = wordSpanRef[currWordIndex].current.querySelectorAll("span");
    //This line of Code is for spacing and changing the words. 32 is a keyCode for Spacing
    if (e.keyCode === 32) {

      const correctChar = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');
      const incorrectChar = wordSpanRef[currWordIndex].current.querySelectorAll('.incorrect');
      setMissedChar(missedChar+(allSpans.length - incorrectChar.length -correctChar.length));
      if(correctChar.length === allSpans.length){
        setCorrectWords(correctWords+1); 
      }
      if (allSpans.length <= currCharIndex) {
        console.log("came here");
        allSpans[currCharIndex - 1].className = allSpans[
          currCharIndex - 1
        ].className.replace("right", "");
      } else {
        allSpans[currCharIndex].className = allSpans[
          currCharIndex - 1
        ].className.replace("current", "");
      }

      wordSpanRef[currWordIndex + 1].current.querySelectorAll(
        "span"
      )[0].className = "char current";

      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      return;
    }

    //For backSpacing keyCode is 8 and we are doing for particular words only .
    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (currCharIndex === allSpans.length) {
          if (allSpans[currCharIndex - 1].className.includes("extra")) {
            allSpans[currCharIndex - 1].remove();
            allSpans[currCharIndex - 2].className += " right";
          } else {
            allSpans[currCharIndex - 1].className = "char current";
          }
          setCurrCharIndex(currCharIndex - 1);
          return;
        }
        wordSpanRef[currWordIndex].current.querySelectorAll("span")[
          currCharIndex
        ].className = "char";
        wordSpanRef[currWordIndex].current.querySelectorAll("span")[
          currCharIndex - 1
        ].className = "char current";
        setCurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    if (e.key.length !== 1) {
      return;
    }

    if (currCharIndex === allSpans.length) {
      let newSpan = document.createElement("span"); //  here we are creating the span element i.e <span> </span>;
      newSpan.innerText = e.key;
      newSpan.className = "char incorrect right extra";
      setExtraChar(extraChar+1);
      allSpans[currCharIndex - 1].className = allSpans[
        currCharIndex - 1
      ].className.replace("right", "");

      wordSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      return;
    }

    let key = e.key;
    console.log("Key pressed-", key);

    let currentCharacter =
      wordSpanRef[currWordIndex].current.querySelectorAll("span")[currCharIndex]
        .innerText;
    console.log(currentCharacter);

    if (key === currentCharacter) {
      console.log("correct key Pressed");
      setCorrectChar(correctChar+1);
      wordSpanRef[currWordIndex].current.querySelectorAll("span")[
        currCharIndex
      ].className = "char correct";
    } else {
      console.log("incorrect key Pressed");
      setInCorrectChar(incorrectChar+1);
      wordSpanRef[currWordIndex].current.querySelectorAll("span")[
        currCharIndex
      ].className = "char incorrect";
    }

    if (
      currCharIndex + 1 ===
      wordSpanRef[currWordIndex].current.querySelectorAll("span").length
    ) {
      wordSpanRef[currWordIndex].current.querySelectorAll("span")[
        currCharIndex
      ].className += "  right";
    } else {
      wordSpanRef[currWordIndex].current.querySelectorAll("span")[
        currCharIndex + 1
      ].className = "char current";
    }
    //here we are changing the char or increasing the char index.
    setCurrCharIndex(currCharIndex + 1);
  };

  const resetWordSpanRef = () => { 
    wordSpanRef.map(i=>{
    Array.from(i.current.childNodes).map(ii=>{
      ii.className = 'char';
    })
  })
  if(wordSpanRef[0]){
    //For cursor which is blinking also.
    wordSpanRef[0].current.querySelectorAll("span")[0].className ="char current";
  }}

  const handleKeyUp = (e) => {
    // console.log("Up",e);
  };

  const focusInput = () => {
    textInputRef.current.focus();
  };

  useEffect(() => {  
    focusInput();
    return ()=>{
      clearInterval(intervalId)
    }
  }, []);
  
  useEffect(()=>{

    resetWordSpanRef();
  },[wordSpanRef])
  return (
    <div>

      <CapsLockWarning open = {capsLocked}/> 
      <UpperMenu countDown = {countDown}/>

      {!testOver ? (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {words.map((word, index) => (
              <span className="word" ref={wordSpanRef[index]}>
                {word.split("").map((char, ind) => (
                  <span className="char">{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <Stats 
        wpm = {calculateWPM()}
        accuracy = {calculateAccuracy()}
        correctChars = {correctChar}
        incorrectChars = {incorrectChar}
        extraChars = {extraChar}
        missedChars = {missedChar}
        graphData = {graphData}
        reset = {resetGame}
        /> 
      )}

      <input
        type="text"
        className="hidden-input"
        ref={textInputRef}
        // Because of keyBoard input from user we use onkeyDown and onkeyUp.
        onKeyDown={(e) => handleKeyDown(e)}
        onKeyUp={(e) => handleKeyUp(e)}
      />

       <Dialog
      //  open ={false}
        open = {openDialog}
        onKeyDown = {handleDialogEvents}

       >
        <DialogTitle>
          <div>
            press space to redo.
          </div>
          <div>
            press Tab/Enter to restart.
          </div>
          <div>
            press any other key to exit.
          </div>
        </DialogTitle>
         
       </Dialog>



    </div>
  );
}

export default TypingBox