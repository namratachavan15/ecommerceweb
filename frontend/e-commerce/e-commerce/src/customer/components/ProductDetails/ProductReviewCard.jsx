import { Avatar, Box, Grid, Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = () => {
  return (
    <div>
        <Grid container spacing={2} gap={3}>
            <Grid item xs={1}>
                <Box>
                    <Avatar className='text-white' sx={{width:56,height:56,bgcolor:"#4F7CFF"}}>R</Avatar>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <div className="space-y-2">
                   <div>
                    <p className='font-semibold text-white'> Ram</p>
                    <p className='text-ink-200 text-sm'>April 5 ,2023</p>
                    </div>
                </div>

                <Rating value={4.5} name='half-rating' readOnly precision={.5} sx={{ color: '#FFB13B' }}/>

               <p className='text-ink-100'>nice product, i love this product</p>
            </Grid>
        </Grid>
    </div>
  )
}

export default ProductReviewCard
