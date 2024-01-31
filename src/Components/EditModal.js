
import React, { useState } from 'react';
// import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import './EditModal.css';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal'
import { Radio } from '@material-ui/core';
// import ModalBody from "react-bootstrap/ModalBody";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalFooter from "react-bootstrap/ModalFooter";
// import ModalTitle from "react-bootstrap/ModalTitle";

const EditModal = ({ isOpen, onRequestClose, onSave, initialTitle,
                     initialDescription, initialStartDate, initialEndDate, initialComplete , taskId }) => {
    const [editedTitle, setEditedTitle] = useState(initialTitle);
    const [editedDescription, setEditedDescription] = useState(initialDescription);
    const[editedStartDate, setEditedStartDate] = useState(initialStartDate);
    const[editedEndDate, setEditedEndDate] = useState(initialEndDate);
    const[editedComplete, setEditedComplete] = useState(initialComplete);
   


  const handleSave = async () => {
    try {
      // Update the task on the JSON server
      await axios.put(`http://localhost:3000/tasks/${taskId}`, {
        title: editedTitle,
        description:editedDescription,
        startdate: editedStartDate,
        enddate: editedEndDate,
        completed : editedComplete
      });

      onSave(taskId, editedTitle, editedDescription, editedStartDate, editedEndDate, editedComplete);
      setEditedTitle('');
      setEditedDescription('');
      setEditedStartDate('');
      setEditedEndDate('');
      setEditedComplete('');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
//     <Modal
      // isOpen={isOpen}
      // onRequestClose={onRequestClose}
      // contentLabel="Edit Task"
      // ariaHideApp={false}
//       className="edit-modal">
//       <Modal.Title>Edit Task</Modal.Title>
      // <label>Title:</label>
      // <input
      //   type="text"
      //   value={editedTitle}
      //   onChange={(e) => setEditedTitle(e.target.value)}/>
      //  <label>Description:</label>
      // <input
      //   type="text"
      //   value={editedDescription}
      //   onChange={(e) => setEditedDescription(e.target.value)}/>
      // <label>Start Date:</label>
      // <input
      //   type="date"
      //   value={editedStartDate}
      //   onChange={(e) => setEditedStartDate(e.target.value)}/>
      // <label>End Date:</label>
      // <input
      //   type="date"
      //   value={editedEndDate}
      //   onChange={(e) => setEditedEndDate(e.target.value)}/>
      //   <label>Complete:
      //   <input
      //             type="radio"
      //             value={editedComplete}
      //             checked={editedComplete === true}
      //             onChange={() => setEditedComplete(true)}/> 
                 
      //   </label>
      //   <label>Pending:
      //   <input
      //             type="radio"
      //             value={editedComplete}
      //             checked={editedComplete === false}
      //             onChange={() => setEditedComplete(false)}/>
                
      //   </label>

//  <div style={{display:"flex", justifyContent:'space-between'}}>
// <button className='Savebtn' onClick={handleSave}>Save</button> &nbsp;
//       <button className = 'Cancelbtn' onClick={onRequestClose}>Cancel</button>
// </div> 

     

<>


<Modal 
        show={isOpen} 
        onHide={onRequestClose}
      >
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group >
              <Form.Label>Title: </Form.Label>
              <Form.Control type="text" onChange={(e) => setEditedTitle(e.target.value)}
               value={editedTitle} placeholder="name input"/>           
          </Form.Group>
          <Form.Group >
              <Form.Label>Description: </Form.Label>
              <Form.Control type="text" onChange={(e) => setEditedDescription(e.target.value)}
               value={editedDescription} placeholder="Enter description"/>           
          </Form.Group>
          <Form.Group >
              <Form.Label>Start Date: </Form.Label>
              <Form.Control type="date" onChange={(e) => setEditedStartDate(e.target.value)}
               value={editedStartDate} placeholder="Enter start date"/>           
          </Form.Group>
          <Form.Group >
              <Form.Label>End Date: </Form.Label>
              <Form.Control type="date" onChange={(e) => setEditedEndDate(e.target.value)}
               value={editedEndDate} placeholder="Enter end date"/>           
          </Form.Group>
          <Form.Group >
          <Form.Label>Status</Form.Label>
          </Form.Group>
              {/* <Form.Label>Complete */}
               {/* <Form.Control type="Radio" onChange={(e) => setEditedComplete(true)}
               value={editedComplete} checked={editedComplete === true} />  
               </Form.Label> */}
               <Form.Group>
               {/* <Form.Label> */}
               Complete
               <Radio onChange={(e) => setEditedComplete(true)}
                value={editedComplete} checked ={editedComplete=== true}></Radio>
                 {/* </Form.Label> */}
                 {/* <Form.Label> */}
                 Pending
                 <Radio onChange={(e) => setEditedComplete(false)}
                value={editedComplete} checked ={editedComplete=== false}></Radio>
               
                 {/* </Form.Label> */}
                </Form.Group>
             
             
               
             
              
             
         
          
          {/* <Form.Group >
         
              <Form.Label>
                Pending
                <Radio onChange={(e) => setEditedComplete(false)}
                value={editedComplete} checked ={editedComplete=== false}></Radio>
              </Form.Label>
          </Form.Group> */}

      </Modal.Body>
      <Modal.Footer>
          <Button variant="success" type="submit" onClick={handleSave}>
              Submit
          </Button>
        
      </Modal.Footer>
    </Modal>

</>
 
  );
};

export default EditModal;
