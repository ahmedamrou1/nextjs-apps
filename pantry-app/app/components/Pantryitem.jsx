import React from 'react'
import { Box } from '@mui/material'

const Pantryitem = ( { item } ) => {
  return (
    <Box display="flex" height="40px">
        <Box display="flex"
        width="80%"
        justifyContent="center">{ item }</Box>
        <Box display="flex"
        width="20%"
        justifyContent="center">{ item }</Box> 
    </Box>
  )
}

export default Pantryitem