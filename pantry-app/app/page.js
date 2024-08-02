"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import db from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Box, IconButton, Modal, Button, Typography } from "@mui/material";
import React from "react";
import { FcMinus, FcPlus } from "react-icons/fc";

export default function Home() {
  const [pantryList, setPantryList] = useState([]);

  const fetchData = async () => {
    const snapshot = query(collection(db, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setPantryList(pantryList);
    console.log(pantryList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function updateItemCount(itemid, increment) {
    const docRef = doc(db, "pantry", itemid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentCount = docSnap.data().count;
      const newCount = currentCount + increment;

      if (newCount <= 0) {
        await deleteDoc(docRef);
      } else {
        await updateDoc(docRef, {
          count: newCount,
        });
      }

      fetchData(); // Refresh the list after updating the count
    } else {
      console.error("No such document!");
    }
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Navbar />
      <Box display="flex" width="100vw" height="100vh" justifyContent="center">
        <Box height="auto" width="50vw">
          <Box alignitems="center" justifyContent="center">
            <Button onClick={handleOpen}>Add an Item</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
          </Box>
          <Box display="flex" width="100%" height="50px">
            <Box
              display="flex"
              width="60vw"
              alignItems="center"
              justifyContent="center"
              sx={{ border: "1px solid black" }}
            >
              Ingredient
            </Box>
            <Box
              display="flex"
              width="25vw"
              alignItems="center"
              justifyContent="center"
              sx={{ border: "1px solid black" }}
            >
              Quantity
            </Box>
            <Box
              display="flex"
              width="15vw"
              alignItems="center"
              justifyContent="center"
              sx={{ border: "1px solid black" }}
            >
              Add/Remove
            </Box>
          </Box>
          {pantryList.map((item) => {
            return (
              <Box key={item.name}>
                <Box display="flex" height="50px">
                  <Box
                    display="flex"
                    width="60%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {item.name}
                  </Box>
                  <Box
                    display="flex"
                    width="25%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {item.count}
                  </Box>
                  <Box
                    display="flex"
                    width="15%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      variant="contained"
                      size="medium"
                      onClick={() => updateItemCount(item.name, 1)}
                    >
                      <FcPlus></FcPlus>
                    </IconButton>
                    <IconButton
                      variant="contained"
                      size="medium"
                      onClick={() => updateItemCount(item.name, -1)}
                    >
                      <FcMinus></FcMinus>
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
