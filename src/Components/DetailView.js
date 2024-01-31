

import React from 'react';
// import Modal from 'react-modal';
import Modal from 'react-bootstrap/Modal'
// import './DetailView.css'; 
const DetailView = ({ isOpen, onRequestClose, todo }) => {
  return (
    // <Modal
    //   isOpen={isOpen}
    //   onRequestClose={onRequestClose}
    //   contentLabel="Todo Details"
    //   ariaHideApp={false}
    //   className="detail-modal">
    //   <h2>Todo Details</h2>
    //   <p><strong>Title:</strong> {todo.title}</p>
    //   <p><strong>Description:</strong> {todo.description}</p>
    //   <p><strong>Description:</strong> {todo.description}</p>
    //   <p><strong>Start Date:</strong> {todo.startdate}</p>
    //   <p><strong>End Date:</strong> {todo.enddate}</p>


    //   <button onClick={onRequestClose}>Close</button>
    // </Modal>

<>
<Modal 
        show={isOpen} 
        onHide={onRequestClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <p><strong>Title:</strong> {todo.title}</p>
      <p><strong>Description:</strong> {todo.description}</p>
      {/* <p><strong>Description:</strong> {todo.description}</p> */}
      <p><strong>Start Date:</strong> {todo.startdate}</p>
      <p><strong>End Date:</strong> {todo.enddate}</p>
      </Modal.Body>
    </Modal>
</>
  
  );
};

export default DetailView;
