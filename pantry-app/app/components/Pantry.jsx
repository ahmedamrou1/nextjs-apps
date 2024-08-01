import React from "react";
import { Box } from "@mui/material";
import Pantryitem from "./Pantryitem";

const Pantry = ( {pantryList} ) => {
  return (
    <>
      <Box
        display="flex"
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box height="auto" width="70vw" sx={{ border: "1px solid black" }}>
          <Box display="flex" width="100%"height="50px" pb="9px">
            <Box
              display="flex"
              width="80vw"
              alignItems="center"
              justifyContent="center"
              sx={{ border: "1px solid black" }}
            >
              Ingredient
            </Box>
            <Box
              display="flex"
              width="20vw"
              alignItems="center"
              justifyContent="center"
              sx={{ border: "1px solid black" }}
            >
              Quantity
            </Box>
          </Box>
          {pantryList.map((item) => {
            <Pantryitem>{item.id}</Pantryitem>
          })}
        </Box>
      </Box>
    </>
  );
};

export default Pantry;
