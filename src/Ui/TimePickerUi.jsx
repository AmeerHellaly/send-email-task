import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField  from '@mui/material/TextField';
const TimePickerUi = ({selectedTime,setSelectedTime}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
            <MobileTimePicker value={selectedTime}
            onChange={(newValue=>setSelectedTime(newValue))}
            renderInput={(params) => <TextField {...params} fullWidth />}
            label={'Basic time picker'} />
        </DemoContainer>
    </LocalizationProvider>
  )
}

export default TimePickerUi