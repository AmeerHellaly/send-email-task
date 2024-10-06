import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
import  Typography  from '@mui/material/Typography'
import  Box  from '@mui/material/Box'
import  Button  from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
import Container  from '@mui/material/Container'
import 'react-clock/dist/Clock.css';    
import DigitalClock from '../utils/DigitalClock'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'; 
import timezone from 'dayjs/plugin/timezone'; 
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
dayjs.extend(utc)
dayjs.extend(timezone)
const SendEmail = () => {
    const [name,setName]=useState('')
    const [toEmail,setToEmail]=useState('')
    const [message,setMessage]=useState('')
    const [selectedTime,setSelectedTime]=useState(null)
    const [timerId,setTimerId]=useState(null)
const sendEmail=()=>{
    const serviceId='service_s3n3g1h'
    const templateId='template_uip0lwq'
    const publicKey='unsk2BnN1L5zLeuhp'
    const templateParams = {
        from_name: name,      
        to_email: toEmail,     
        message: message,
        select_time:selectedTime?dayjs(selectedTime).tz("Asia/Damascus").format('h:mm A'):''  
    };
    emailjs.send(serviceId,templateId,templateParams,publicKey).then((response)=>{
        setName('')
        setToEmail('')
        setMessage('')
        Swal.fire({
            icon:'success',
            title:'Good job',
            showCancelButton:false,
            timer:'1500'
        })
    }).catch((error)=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
    })
}
useEffect(()=>{
    if(selectedTime){
        const now=dayjs()
        const targetTime=dayjs(selectedTime).tz("Asia/Damascus")
        let timeDiffrence=targetTime.diff(now)
        if(timeDiffrence<0){
            timeDiffrence+= 24*60*60*1000
        }
        if(timerId){
            clearTimeout(timerId)
        }
        const newTimerId=setTimeout(()=>{
            sendEmail()
        },timeDiffrence)
        setTimerId(newTimerId)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[selectedTime])
const handleSubmit=(e)=>{
    e.preventDefault()
    if(!selectedTime){
        sendEmail()
    }
}
  return (
    <Container component={'main'} maxWidth='sm'>
        <Box
        sx={{
            boxShadow:'3',
            borderRadius:'2',
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", }}>
                <Typography  component={'main'} variant='h5'>Send Email</Typography>
                <Typography>Current Time:</Typography>
                <DigitalClock/>
                <Box>
                    <form  onSubmit={handleSubmit}>
                        <TextField 
                            margin='normal'
                            required
                            label='Name'
                            fullWidth
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            label='Email'
                            value={toEmail}
                            onChange={(e)=>setToEmail(e.target.value)}
                        />
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            label='Message'
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                        />
                  
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <MobileTimePicker value={selectedTime}
                                minutesStep={1}
                                 onChange={(newValue=>setSelectedTime(newValue))}
                                  renderInput={(params) => <TextField {...params} fullWidth />}
                                   label={'Basic time picker'}
                                   />
                            </DemoContainer>
                        </LocalizationProvider>
                            <Button fullWidth sx={{mt:3}}  variant='contained' type='submit' >Send Email</Button>
                    </form>
                </Box>
            </Box>
    </Container>
  )
}

export default SendEmail