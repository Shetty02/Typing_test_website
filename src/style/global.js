import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before{
    box-sizing: border-box;
}
body{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
    color:#fff;
    background:black;
    margin:0;
    padding:0;
    transition: all 0.25s linear; 
}
.canvas{
    align-items:center;
    // justify-content:center;
    display:grid;
    gap:.5rem;
    grid-auto-flow: row;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    padding:1rem;
    width:100vw;
}
.type-box{
    display:block;
    position:relative;
    margin-left:auto;
    margin-right:auto;
    max-width:1000px;
    height:140px;
    overflow:hidden;
}
.words{
    display:flex;
    align-content:center;
    flex-wrap:wrap; 
    width:100%;
    font-size:28px;
}
.word{
    margin:6px 5px;
    padding-right:2px;
    scroll-margin:4px; 
}
.hidden-input{
    opacity:0;
}
.char.correct{
    color:green;
}
.char.incorrect{
    color:red;
}
.current{
    border-left:1px solid;
    // for blinking the cursor
     animation:blinking 2s infinite;
     animation-timing-function: ease;
     @keyframes blinking{
        0%{border-left-color:#fff;}
        25%{border-left-color:black;}
        50%{border-left-color:#fff;}
        75%{border-left-color:black;}
        100%{border-left-color:#fff;}
    }
}
.right {
    border-right:1px solid;
    // for blinking the cursor
     animation:blinkingRight 2s infinite;
     animation-timing-function: ease;
     @keyframes blinkingRight {
        0%{border-right-color:#fff;}
        25%{border-right-color:black;}
        50%{border-right-color:#fff;}
        75%{border-right-color:black;}
        100%{border-right-color:#fff;}
      } 
}
.upper-menu{
    display:flex;
    margin-left:auto;
    margin-right:auto;
    /* padding-left:0.5rem; */
    justify-content:space-between;
    max-width:1000px; 
    padding: 1rem;
}
.time-mode{
    display:flex;
}
.timer{
    font-size:20px;
    margin-right:15px;
}
.timer:hover {
    color:red;
    cursor:pointer;
}
.counter{
    font-size:20px;
}
.stats-box{
    display: flex;
    max-width: 1000px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}
.left-stats{
    padding:30px;
    width: 30%;
}
.title{
    font-size: 20px;
    color: grey;
}
.subtitle{
    font-size: 30px;
    color: gold;
}
.right-stats{
    width: 70%;
}
  
`;