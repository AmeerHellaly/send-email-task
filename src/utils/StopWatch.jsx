import React from 'react'
import { useState } from 'react'
import Typography  from '@mui/material/Typography'
import  Button  from '@mui/material/Button'
import { Container } from '@mui/material'
const StopWatch = () => {
    const [isRunning,setIsRunning]=useState(false)
    const [elpasedTime,setElpisedTime]=useState(0)
    const [intervalId,setIntervalId]=useState(null)

    const toogleStopWatch=()=>{
        if(isRunning){
            clearInterval(intervalId)
            setIsRunning(false)
        }
        else{
            const id=setInterval(()=>{
                setElpisedTime(prev=>prev+10)
            },10)
            setIntervalId(id)
            setIsRunning(true)
        }
    }
    const resetStopWatch=()=>{
        clearInterval(intervalId)
        setElpisedTime(0)
        setIsRunning(false)
    }
    const formatTime=(time)=>{
        const milliseconds=time%1000
        const seconds=Math.floor((time/1000)%60)
        const minutes=Math.floor((time/1000/60)%60)
        const hours=Math.floor(time/1000/60/60)
        return `${hours.toString().padStart(2,'0')}:
        ${minutes.toString().padStart(2,'0')}:
        ${seconds.toString().padStart(2,'0')}:
        ${milliseconds.toString().padStart(3,'0')}`

    }
  return (
     <Container sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant='h5'>Stopwatch</Typography>
      <Typography>{formatTime(elpasedTime)}</Typography>
      <Button variant='contained' color={isRunning?"error":'success'} onClick={toogleStopWatch}>
        {isRunning ? 'Stop' : 'Start'}
      </Button>
      <Button variant='contained' color='primary' onClick={resetStopWatch} style={{ marginLeft: '10px' }}>
        Reset
      </Button>
    </Container>
  )
}

export default StopWatch