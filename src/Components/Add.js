import React, { useState} from "react";
import AddModal from "./AddModal";
import ReactModal from "react-modal";
// import "./Add.css";
import { Button } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";
function Add() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  // const setModalIsOpenToFalse = () => {
  //   setModalIsOpen(false);
  // };
 
  return (
    <>
    {/* <Header /> */}
   
      {/* <div id="add">
       
      </div> */}
       <Button variant="contained" onClick={setModalIsOpenToTrue}>+ ADD TASKS</Button>
        <AddModal  isopen ={modalIsOpen}/>
      {/* <ReactModal isOpen={modalIsOpen}>
        <div id="modal">
          <div id="formstyle">
            <AddModal />
          </div>
          <br></br>
        
          <br></br>
        </div>
      </ReactModal> */}

    {/* <Footer /> */}
    </>
   
    
  );
}
export default Add;
