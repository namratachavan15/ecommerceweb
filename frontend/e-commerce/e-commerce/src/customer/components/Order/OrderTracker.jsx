import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

const steps=[
    "Placed",
    "Order Confirmed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
]
const OrderTracker = ({activeStep}) => {
  return (
    <div className='w-full'>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            '& .MuiStepLabel-label': { color: '#8993AC', fontFamily: 'Inter, sans-serif' },
            '& .MuiStepLabel-label.Mui-active': { color: '#fff', fontWeight: 700 },
            '& .MuiStepLabel-label.Mui-completed': { color: '#4F7CFF' },
            '& .MuiStepIcon-root': { color: '#333C57' },
            '& .MuiStepIcon-root.Mui-active': { color: '#4F7CFF' },
            '& .MuiStepIcon-root.Mui-completed': { color: '#4F7CFF' },
            '& .MuiStepConnector-line': { borderColor: '#333C57' },
          }}
        >
            {steps.map((label)=><Step key={label}>
                   <StepLabel>{label} </StepLabel>
            </Step>)}
        </Stepper>
    </div>
  )
}

export default OrderTracker
