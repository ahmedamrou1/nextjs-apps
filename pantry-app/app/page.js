"use client"

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Pantry from "./components/Pantry";
import Pantryitem from "./components/Pantryitem";
import db from "./firebase"
import { collection, getDocs, query } from "firebase/firestore"; 


export default function Home() {
  const [pantryList, setPantryList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = query(collection(db, "pantry"))
        const docs = await getDocs(snapshot)
        docs.docs.forEach((doc) => {
          console.log(doc.id)
          pantryList.push(doc.id)
        })
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
      setPantryList(pantryList)
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <Pantry pantryList={pantryList}/>
    </>
    
  );
}
