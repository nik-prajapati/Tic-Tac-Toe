// import React from 'react'
import { useState,useEffect} from 'react'
import './TicTacToe.css'
const TicTacToe = () => {

    const [board, setBoard] =useState(Array(3).fill(Array(3).fill(null)))
    const [player, setPlayer] =useState('O')
    const[winner,setWinner]=useState(null)
    const [history,setHistory]=useState(Array(9).fill(null))
    const [currentStep,setCurrentStep]=useState(0)
    const [winComb,setWinComb]=useState(null)

    useEffect(() => {
        
       setHistory([...history.slice(0,currentStep),board])

       if(checkWinner(board)!=null){
              setWinner(player)
        //    setTimeout(()=>{
        //     setBoard(Array(3).fill(Array(3).fill(null)))
        //     setWinner(null)
        //    },1000)
       }
        setPlayer(player==='X'?'O':'X')
    }, [board])

    const handleClick=(rowIdx,colIdx)=>{
        console.log(rowIdx,colIdx)
        if(winner!=null){
            return
        }
        if(board[rowIdx][colIdx]!==null){
            return
        }

        setCurrentStep(currentStep+1)

        let newBoard = board.map((row, rIdx) => 
            rIdx === rowIdx ? [...row] : row
        );
    
        newBoard[rowIdx][colIdx] = player;

        // setStep(step+1)
        setBoard(newBoard)

    }

    const checkWinner=(newBoard)=>{

        console.log("I am called")
        const winnerPoss=[
        ['00','01','02'],
        ['10','11','12'],
        ['20','21','22'],
        ['00','10','20'],
        ['01','11','21'],
        ['02','12','22'],
        ['00','11','22'],
        ['02','11','20']]

        for(let i=0;i<winnerPoss.length;i++){
            let [a,b,c]=winnerPoss[i]
            if(newBoard[a[0]][a[1]]===newBoard[b[0]][b[1]] && newBoard[b[0]][b[1]]===newBoard[c[0]][c[1]] && newBoard[a[0]][a[1]]!==null){
                console.log(player+" is the winner")
                setWinComb(winnerPoss[i])
                return true
                // alert(player+" is the winner")
                // setTimeout(()=>setBoard(Array(3).fill(Array(3).fill(null))),1000)

            }
        }
        return null

    }

    const handleHistory=(ele,idx)=>{
        if(idx==currentStep){
            return
        }
        if(winner!=null){
            setWinComb(null)
            setWinner(null)
        }
        setCurrentStep(idx)
        setBoard(ele)
    }
  return (

    <div>

    {
        winner!=null ? <div className='player-turn'> {winner} is the winner </div>  : <div className='player-turn'>
            {player}'s turn
            </div>
    }
    
    <div className="outercontainer">
    
    <div className="container1">
    {
        board.map((ele,rowIdx)=>(
               <div className="row" key={rowIdx}> 
                   {ele.map((cell,colIdx)=>{
                       return  <div className="cell" key={rowIdx+" "+colIdx} onClick={()=>handleClick(rowIdx,colIdx)}>
                       {
                        winComb!=null && winComb.includes(rowIdx+""+colIdx) ? <div className='winning-cell'>{cell}</div> : cell
                       }
                           
                       </div>
                   })}
               </div>
        ))
    }
    </div>
    <div className='container2'>
    {
        history.length>0  && history.map((ele,idx)=>{
            return <div className='history-steps' key={idx} onClick={()=>handleHistory(ele,idx)}>
            {idx==0? "start the game" : `Go to Step #${idx}`}
            </div>
        })
    }
        
    </div>
    
    </div>
    </div>
  )
}

export default TicTacToe
