

import React, { useEffect, useState } from 'react';
import Square from './Square';
import Timer from './Timer';
import './App.css'

const App = () => {
  const [lost, setLost] = useState(false);
  const [win,setWin]=useState(false)
  const [reset, setReset] = useState(false);
  const [board, setBoard] = useState([]);

  const [greennumber, setGreennumber]=useState(0)
  const [greenclick, setGreenclick]=useState(0)

  useEffect(() => {
    let saveforgreennumber=0
    const newBoard = [];
    for (let x = 0; x < 10; x++) {
      newBoard[x] = [];
      for (let y = 0; y < 10; y++) {
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        let bomb=""
        if(randomNumber==1){
          bomb = true
        }else{
          saveforgreennumber++;
          bomb = false
        }
       
        const tile = {
          x1: x,
          y1: y,
          bomb1: bomb,
        };
        newBoard[x][y] = tile;
      }
    }
    console.log(saveforgreennumber, "bombnumber")
    setGreennumber(saveforgreennumber);

    for (let x = 0; x < newBoard.length; x++) {
      for (let y = 0; y < newBoard.length; y++) {
        let countNext = 0;
        if (y - 1 !== -1 && x - 1 !== -1) {
          if (newBoard[x - 1][y - 1].bomb1) countNext++;
        }
        if (y - 1 !== -1) {
          if (newBoard[x][y - 1].bomb1) countNext++;
        }
        if (y - 1 !== -1 && x + 1 !== newBoard.length) {
          if (newBoard[x + 1][y - 1].bomb1) countNext++;
        }
        if (x - 1 !== -1) {
          if (newBoard[x - 1][y].bomb1) countNext++;
        }
        if (x + 1 !== newBoard.length) {
          if (newBoard[x + 1][y].bomb1) countNext++;
        }
        if (x - 1 !== -1 && y + 1 !== newBoard.length) {
          if (newBoard[x - 1][y + 1].bomb1) countNext++;
        }
        if (y + 1 !== newBoard.length) {
          if (newBoard[x][y + 1].bomb1) countNext++;
        }
        if (y + 1 !== newBoard.length && x + 1 !== newBoard.length) {
          if (newBoard[x + 1][y + 1].bomb1) countNext++;
        }
        newBoard[x][y].countNext = countNext;
      }
    }
    console.log(newBoard)
    setBoard(newBoard);
  }, [reset]);

  useEffect(()=>{
    console.log(greenclick)
    if(greenclick==greennumber){
      setWin(true);
    }
  },[greenclick, "greenclick"])

  return (
    <div className='appdiv'>
      <h1>Minesweeper </h1>
      <Timer reset={reset} setReset={setReset} lost={lost} setLost={setLost} win={win} setWin={setWin} />
      <table className='bigboard'>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((tile, tileIndex) => (
                <td key={tileIndex}>
                  <Square
                    x={tile.x1}
                    y={tile.y1}
                    bomb={tile.bomb1}
                    countNext={tile.countNext}
                    board={board}
                    lost={lost}
                    setLost={setLost}
                    reset={reset}
                    setReset={setReset}
                    greenclick={greenclick}
                    setGreenclick={setGreenclick}
                    win={win}
                    setWin={setWin}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className='resetbtn' onClick={() => setReset(!reset)}>
        reset game...
      </button>
      {lost && <div>you lost</div>}
      {win && <div>you win</div>}
    </div>
  );
};

export default App;
