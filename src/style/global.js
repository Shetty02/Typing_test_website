import { createGlobalStyle } from "styled-components";
// import { themeOptions } from "./theme";  

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
    background: ${ ({theme}) => theme.background } ;
    color: ${ ({theme}) => theme.title};
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
    color: ${ ({theme}) => theme.typeBoxText};
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
    color: ${ ({theme}) => theme.title};
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
        0%{border-left-color: ${ ({theme}) => theme.title};}
        25%{border-left-color: ${ ({theme}) => theme.background };}
        50%{border-left-color: ${ ({theme}) => theme.title};}
        75%{border-left-color: ${ ({theme}) => theme.background };}
        100%{border-left-color: ${ ({theme}) => theme.title};}
    }
}
.right {
    border-right:1px solid;
    // for blinking the cursor
     animation:blinkingRight 2s infinite;
     animation-timing-function: ease;
     @keyframes blinkingRight {
        0%{border-right-color: ${ ({theme}) => theme.title};}
        25%{border-right-color: ${ ({theme}) => theme.background };}
        50%{border-right-color: ${ ({theme}) => theme.title};}
        75%{border-right-color: ${ ({theme}) => theme.background };}
        100%{border-right-color: ${ ({theme}) => theme.title};}
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
    color:  ${ ({theme}) => theme.typeBoxText };
}
.time-mode{
    display:flex;
}
.timer{
    font-size:20px;
    margin-right:15px;
}
.timer:hover {
    color:${ ({theme}) => theme.title };
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
// for stats Title
.title{
    font-size: 20px;
    color: ${ ({theme}) => theme.typeBoxText };
}
// for stats SubTitle
.subtitle{
    font-size: 30px;
    color: ${ ({theme}) => theme.title };
}
.right-stats{
    width: 70%;
}
.header{
    display: flex;
    justify-content: space-between;
    width: 1000px;
    height: 60px;
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
}
.footer{
    display: flex;
    justify-content: space-between;
    width: 1000px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
}
.theme-options{
    background: transparent;
    min-width: 200px;
    align-items: center;
}
.select{
    color: black;
    min-width: 90px;
}

.reset-btn{
    display: block;
    margin: auto;
    transform: scale(1.5);
}
.reset-btn:hover{
    background: ${ ({theme}) => theme.typeBoxText };
}
.user-profile{
    display: flex;
    min-height: 15rem;
    background-color: ${ ({theme}) => theme.typeBoxText };
    border-radius: 30px;
}
.user{
    width: 50%;
    justify-content: center;
    display: flex;
    padding: 3rem;
    margin-top: 30px;
    margin-bottom: 30px;
    border-right: 2px solid;
}
.total-times{
    width: 50%;
    padding: 3rem;
    margin-top: 30px;
    margin-bottom: 30px;
}
.picture{
    width: 40%;
}
.info{
    width: 50%;
}
.central-data{
    max-width: 1000px;
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 3rem;
}
`;


export default GlobalStyles;