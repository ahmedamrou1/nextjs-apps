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
  setDoc,
} from "firebase/firestore";
import {
  Box,
  IconButton,
  Modal,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import React from "react";
import { FcMinus, FcPlus } from "react-icons/fc";
import { FaPlusSquare } from "react-icons/fa";

export default function Home() {
  const [pantryList, setPantryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      const newCount = Number(currentCount + increment);

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
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [currItem, setCurrItem] = useState({ name: "", count: 0 });

  async function addItem(name, count) {
    await setDoc(doc(db, "pantry", name), {
      count: count,
    });
    setCurrItem({ name: "", count: 0 });
    fetchData();
  }

  const filteredPantryList = pantryList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Box display="flex" width="100vw" height="100vh" justifyContent="center">
        <Box height="auto" width="50vw">
          <Box display="flex" justifyContent="center">
            <TextField
              fullWidth
              id="search-bar"
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <Box alignitems="center" justifyContent="center">
            <Button onClick={handleOpen}>Add an Item</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  pb={2}
                >
                  Add an item
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="Item Name"
                    value={currItem.name} // Use value to control the input
                    onChange={(e) =>
                      setCurrItem({ ...currItem, name: e.target.value })
                    }
                  />
                  <TextField
                    id="filled-number"
                    label="Quantity"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    variant="filled"
                    value={currItem.count} // Use value to control the input
                    onChange={(e) =>
                      setCurrItem({
                        ...currItem,
                        count: e.target.value,
                      })
                    }
                  />
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      addItem(currItem["name"], Number(currItem["count"]));
                      handleClose();
                    }}
                  >
                    Add Item
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Box>
          <Box display="flex" width="100%" height="50px">
            <Box
              display="flex"
              width="50vw"
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
            <Box
              display="flex"
              width="30vw"
              alignItems="center"
              justifyContent="center"
              sx={{ border: "1px solid black" }}
            >
              Add/Remove
            </Box>
          </Box>
          {filteredPantryList.map((item) => {
            return (
              <Box key={item.name}>
                <Box display="flex" height="50px">
                  <Box
                    display="flex"
                    width="50%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {item.name}
                  </Box>
                  <Box
                    display="flex"
                    width="20%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {item.count}
                  </Box>
                  <Box
                    display="flex"
                    width="30%"
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
