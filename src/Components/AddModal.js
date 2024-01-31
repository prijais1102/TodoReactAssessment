import React, {useEffect, useState , useMemo } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';
// import './AddModal.css';  
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchTodos } from './todosSlice';

  const AddModal = ({isOpen, onClose, initialTitle, initialDescription , initialStartDate , initialEndDate}) => {
  const dispatch = useDispatch();
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate,setEndDate] = useState("");
  

  // useEffect(() => {
  //   debugger;
  //   dispatch(fetchTodos());
  // });

  const fetchTaskList = async () => {
    try 
    {
      const response = await axios.get('http://localhost:3000/tasks');
      return response.data;
    } 
    catch (error) 
    { console.error('Error fetching tasks:', error);
    }
  };
  

  const handleSave = async () => {
    try{
        if(Title!=="" &&  Description!=="")
      await axios.post(`http://localhost:3000/tasks`, {
        title: Title,
        description: Description,
        startdate: StartDate,
        enddate : EndDate
      });
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      onClose();
      dispatch(fetchTodos());
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
  
      // <form className="add-task-form">
      // <h2>Add Task</h2> 
      // <label htmlFor="title">Title:</label>
      // <input
      //   type="text"
      //   id="title"
      //   value={Title}
      //   onChange={(e) => setTitle(e.target.value)}
      //   placeholder="Enter task title"
      // />

      // <label htmlFor="description">Description:</label>
      // <textarea
      //   id="description"
      //   value={Description}
      //   onChange={(e) => setDescription(e.target.value)}
      //   placeholder="Enter task description"
      // />
      //  <label htmlFor="startdate">Start Date:</label>
      // <input
      //   type="date"
      //   id="startdate"
      //   value={StartDate}
      //   onChange={(e) => setStartDate(e.target.value)}
      //   placeholder="Enter Start Date"
      // />
      //  <label htmlFor="enddate">End Date:</label>
      // <input
      //   type="date"
      //   id="enddate"
      //   value={EndDate}
      //   onChange={(e) => setEndDate(e.target.value)}
      //   placeholder="Enter End Date"
      // />

      
      //  <button  id = "btnSave" type="submit" onClick={handleSave}>Add Task</button> &nbsp;

      //  <button  id = "btnCancel" type="submit">Cancel</button>
     
      // </form>

      <>
      <Modal
        show = {isOpen}
        onHide = {onClose}
      >
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group >
              <Form.Label>Title: </Form.Label>
              <Form.Control type="text" onChange={(e) => setTitle(e.target.value)}
               value={Title} placeholder="Enter name"/>           
          </Form.Group>
          <Form.Group >
              <Form.Label>Description: </Form.Label>
              <Form.Control type="text" onChange={(e) => setDescription(e.target.value)}
               value={Description} placeholder="Enter description"/>           
          </Form.Group>
          <Form.Group >
              <Form.Label>Start Date: </Form.Label>
              <Form.Control type="date" onChange={(e) => setStartDate(e.target.value)}
               value={StartDate} placeholder="Enter start date"/>           
          </Form.Group>
          <Form.Group >
              <Form.Label>End Date: </Form.Label>
              <Form.Control type="date" onChange={(e) => setEndDate(e.target.value)}
               value={EndDate} placeholder="Enter end date"/>           
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="success" type="submit" onClick={handleSave}>
              Add
          </Button>
      </Modal.Footer>
      </Modal>
      </>
   
  );
};

export default AddModal;

