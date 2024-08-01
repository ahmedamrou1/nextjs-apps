'use client'

import React from 'react'
import { Box, createTheme, Divider, ThemeProvider, Typography} from "@mui/material"
import '@fontsource/roboto';
import '@fontsource/ibm-plex-mono/700.css';
import { CiApple } from "react-icons/ci";





const headerstyle = createTheme({
    typography: {
        fontFamily: "IBM Plex Mono, monospace"
    }
  })

const Navbar = () => {
  return (
    <ThemeProvider theme={headerstyle}>
        <Box pb={2}>
            <Box display="flex" height="auto" width="100vw" padding="8px">
                <Box height="fit-content" width="33vw" display="flex" justifyContent="flex-start">
                    <CiApple size={32}/> 
                </Box>
                <Box height="100%" width="33vw" alignItems="center" justifyContent="center" display="flex">
                    <Typography>MyPantry</Typography>
                    </Box>
                <Box height="fit-content" width="33vw" display="flex" justifyContent="flex-end" pr={0}>
                    <Typography>Navigate</Typography>
                </Box>
            </Box>
            <Divider></Divider>
        </Box>
    </ThemeProvider>
  )
}

export default Navbar