import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
import  Typography  from '@mui/material/Typography'
import  Box  from '@mui/material/Box'
import  Button  from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
import Container  from '@mui/material/Container'
const SendEmail = () => {
    const [name,setName]=useState('')
    const [toEmail,setToEmail]=useState('')
    const [message,setMessage]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
    const serviceId='service_s3n3g1h'
    const templateId='template_uip0lwq'
    const publicKey='unsk2BnN1L5zLeuhp'
    const templateParams = {
        from_name: name,      
        to_email: toEmail,     
        message: message     
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
                <Typography component={'main'} variant='h5'>Send Email</Typography>
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
                            <Button fullWidth sx={{mt:3}}  variant='contained' type='submit' >Send Email</Button>
                    </form>
                </Box>
            </Box>

    </Container>
  )
}

export default SendEmail