import { useEffect, useState } from "react";
import './Timer.css';
function Timer ({reset, setReset, lost, setLost, win, setWin}){
 const [seconds, setSeconds]=useState(0);
 const[minutes, setMinutes]=useState(0);

 useEffect(()=>{
   setSeconds(0);
   setMinutes(0);
 },[reset])

 var timer;
 useEffect(()=>{
    timer=setInterval(() => {
        setSeconds(seconds+1);
        if(seconds==59){
            setMinutes(minutes+1)
            setSeconds(0);
        }
    }, 1000);
    return ()=>clearInterval(timer);
 })

 function restart(){
    console.log("here")
    setSeconds(0);
    setMinutes(0);
 }
 const stop1=()=>{
    clearInterval(timer);
 }

useEffect(()=>{
   if(lost==true||win==true){
      clearInterval(timer);
   }  
},[lost,win])

   return(
    <div className="timer-container">
     <div className="timer">{minutes<10? "0"+minutes:minutes}:{seconds<10? "0"+seconds:seconds}</div>
     <div>
      <button className="timer-btn" onClick={restart}>reset</button>
      <button className="timer-btn" onClick={stop1}>stop</button>
     </div>
    </div>
   )
    
}
export default Timer;