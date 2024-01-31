
import React from 'react';
// import Modal from 'react-modal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './DeleteModal.css';

const DeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    // <Modal
    //   isOpen={isOpen}
    //   onRequestClose={onRequestClose}
    //   contentLabel="Delete Confirmation"
    //   ariaHideApp={false}
    //   className="delete-modal">
    //   <h2>Delete Confirmation</h2>
    //   <p>Are you sure you want to delete this item?</p>
    //   <button onClick={onConfirm}>Confirm</button> &nbsp;
    //   <button onClick={onRequestClose}>Cancel</button>
    // </Modal>
    <>
    <Modal 
        show={isOpen} 
        onHide={onRequestClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>Are you sure you want to delete this item?</p>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="danger" type="submit" onClick={onConfirm}>
              Submit
          </Button>
          <Button variant="danger" type="submit" onClick={onRequestClose}>
              Cancel
          </Button>
        
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default DeleteModal;
