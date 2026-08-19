import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';

import OrderSummary from './OrderSummary';

export default function Checkout() {
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);

  const stepFromQuery = parseInt(querySearch.get("step")) || 0;

  const [activeStep, setActiveStep] = React.useState(stepFromQuery);

  React.useEffect(() => {
    setActiveStep(stepFromQuery);
  }, [stepFromQuery]);

  const steps = ['Login', 'Add Delivery Address', 'Order Summary', 'Payment'];

  return (
    <div className='px-6 lg:px-20 py-10 bg-ink-900 min-h-screen'>
      <Box sx={{ width: '100%' }}>
        <Stepper
          activeStep={activeStep}
          sx={{
            '& .MuiStepLabel-label': { color: '#8993AC', fontFamily: 'Inter, sans-serif' },
            '& .MuiStepLabel-label.Mui-active': { color: '#fff', fontWeight: 700 },
            '& .MuiStepLabel-label.Mui-completed': { color: '#4F7CFF' },
            '& .MuiStepIcon-root': { color: '#333C57' },
            '& .MuiStepIcon-root.Mui-active': { color: '#4F7CFF' },
            '& .MuiStepIcon-root.Mui-completed': { color: '#4F7CFF' },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

      <div className="mt-10">

  {activeStep === 2 && (
    <DeliveryAddressForm />
  )}

  {activeStep === 3 && (
    <OrderSummary />
  )}

</div>
      </Box>
    </div>
  );
}
