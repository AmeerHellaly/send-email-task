import React from 'react'
import Clock from 'react-live-clock'
const DigitalClock = () => {
   
  return (
    <Clock format={'h:mm:ss A'} ticking={true} timezone='Asia/Damascus' />
  )
}

export default DigitalClock