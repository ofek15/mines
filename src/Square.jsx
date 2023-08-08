import React, { useEffect } from "react";
import "./Square.css";
import { useState } from "react";
function Square({ x, y, bomb, countNext, lost, setLost, reset, setReset, greenclick, setGreenclick, win, setWin }) {

  const [isclicked, setIsclicked] = useState(false);
  const [isrightclick, setIsrightclick] = useState(false);
  const [color, setColor] = useState("beforeclick");

  useEffect(()=>{
    setIsclicked(false);
    setIsrightclick(false);
    setColor("beforeclick");
    setLost(false);
    setWin(false);
  },[reset])

  function clickfunc(e) {
    if(lost!=true && win!=true){
    console.log("get into function")
    // const xclick = e.target.getBoundingClientRect().x;
    // const yclick = e.target.getBoundingClientRect().y;
    e.preventDefault();
    if (isclicked == false) {
      console.log(e.button);
      if (e.button == 0) {
        console.log("change in left");
        setIsclicked(!isclicked);
        setGreenclick(greenclick+1)
        // if (bomb == false && countNext == 0) {
        //   document.elementFromPoint(xclick, yclick + 54).click();
        //   document.elementFromPoint(xclick, yclick - 54).click();
        //   document.elementFromPoint(xclick + 54, yclick + 54).click();
        //   document.elementFromPoint(xclick + 54, yclick - 54).click();
        //   document.elementFromPoint(xclick + 54, yclick).click();
        //   document.elementFromPoint(xclick - 54, yclick).click();
        //   document.elementFromPoint(xclick - 54, yclick + 54).click();
        //   document.elementFromPoint(xclick - 54, yclick - 54).click();
        // }
        
      } else {
        console.log("change in right");
        setIsrightclick(!isrightclick);
      }
    }
  }
  }
  useEffect(() => {
    console.log("right", isrightclick, "left", isclicked);
    if (isclicked == false && isrightclick == false) {
      setColor("beforeclick");
    }
    if (isclicked == false && isrightclick == true) {
      setColor("yellow");
    }
    if (isclicked == true) {
      if (bomb == true) {
        setColor("red");
        setLost(true)
      } else {
        setColor("green");
      }
    }
  }, [isrightclick, isclicked]);
  let innertextclass = null;
  if (countNext === 1) {
    innertextclass = "b1";
  }
  if (countNext === 2) {
    innertextclass = "b2";
  }
  if (countNext === 3) {
    innertextclass = "b3";
  }
  if (countNext > 3) {
    innertextclass = "bBig";
  }
  return (
    <div onContextMenu={clickfunc} onClick={clickfunc} className={`${color}`}>
    {color === "yellow" ? <i className="fa fa-flag"></i> : color=="red"? <i class="fa fa-bomb"></i> : countNext}
  </div>
  
  );

}

export default Square;

