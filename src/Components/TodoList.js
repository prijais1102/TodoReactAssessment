
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos , updateTodoAsync , deleteTodoAsync , toggleTodoCompletedAsync } from './todosSlice';
import DataTable from './TodoTable';
import Button from 'react-bootstrap/Button';
// import Add from './Add';
import './TodoList.css';
import EditModal from './EditModal';
import DetailView from './DetailView';
import DeleteModal from './DeleteModal';
import AddModal from './AddModal';


const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  },[dispatch]);

  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  // const [isChecked, setIsChecked] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleCheckboxToggle = async (id) => {
    // setIsChecked(!isChecked);
        const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await dispatch(toggleTodoCompletedAsync(updatedTodos.find((todo) => todo.id === id)));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'done':
        return todos.filter((todo) => todo.completed);
      case 'todo':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
 
  const handleViewClick = (id) => {
        setViewId(id);
  };

  const handleViewClose = () => {
    setViewId(null);
  };

  const handleEditClick = (id) => {
    setEditId(id);
  };

  const handleEditClose = () => {
    setEditId(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteTodoAsync(deleteId));
    setIsDeleteModalOpen(false);
    setDeleteId(null);
    handleDeleteCancel();
    debugger;
    dispatch(fetchTodos());
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleEditSave = async (id, newTitle, newDescription , newStartDate, newEndDate , newComplete) => {
    await dispatch(updateTodoAsync({ id, title: newTitle, description: newDescription 
       , startdate: newStartDate, enddate : newEndDate, completed: newComplete}));
    setEditId(null);
  };

  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  
  return (

    <>
    <div className='AddTaskContainer'>
    <Button variant="success" onClick={handleOpenModal}>
       +Add Tasks
      </Button>
      <AddModal
      isOpen={isAddModalOpen}
      onClose={handleCloseModal}
      />
    </div>
   
    <div className="filter-container">
        
        <select
          id="filterDropdown"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="filter">Filter</option>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="todo">Todo</option>
        </select>
        </div>
     

    <div className="todo-list-container">
     
        {/* <TodoTable
        data={todos}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
        onView={handleViewClick}
        onCheckboxToggle={handleCheckboxToggle}
      /> */}
        <DataTable
        data={filteredTodos}
        onView={handleViewClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onCheckboxChange={handleCheckboxToggle}
      />

         {/* <div className="filter-container">
      <button className={`filter-button-all ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>
        All
      </button>
      <button className={`filter-button-done ${filter === 'done' ? 'active' : ''}`} onClick={() => handleFilterChange('done')}>
        Done
      </button>
      <button className={`filter-button-todo ${filter === 'todo' ? 'active' : ''}`} onClick={() => handleFilterChange('todo')}>
        Todo
      </button>
      </div>   */}

    {/* <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed  ? 'complete ' : ''}`}>
            <label htmlFor={`checkbox-${todo.id}`}>
            {todo.title}
          </label>

          <div className="icon-container">
          <input
            type="checkbox"
            id={`checkbox-${todo.id}`}
            checked={todo.completed}
            onChange={() => handleCheckboxToggle(todo.id)}
          />
          <VisibilityIcon className="view-icon" onClick={() => handleViewClick(todo.id)} />
          <EditIcon className="edit-icon" onClick={() => handleEditClick(todo.id)}/>
          <DeleteIcon className="delete-icon" onClick={() => handleDeleteClick(todo.id)} />
          </div>

        </li>
      ))}
    </ul> */}
    {/* <div className="button-container">
        <button onClick={handleDeleteDoneTasks} className="delete-done-button">
          Delete Done Tasks
        </button>
        <button onClick={handleDeleteAllTasks} className="delete-all-button">
          Delete All Tasks
        </button>
      </div> */}
    {editId !== null && (
      <EditModal
        isOpen={true}
        onRequestClose={handleEditClose}
        onSave={handleEditSave}
        initialTitle={todos.find((todo) => todo.id === editId)?.title || ''}
        initialDescription={todos.find((todo) => todo.id === editId)?.description || ''}
        initialStartDate={todos.find((todo) => todo.id === editId)?.startdate || ''}
        initialEndDate={todos.find((todo) => todo.id === editId)?.enddate || ''}
        initialComplete={todos.find((todo) => todo.id === editId)?.complete || ''}
        taskId={editId}
      />
    )}
     {viewId !== null && (
        <DetailView
          isOpen={true}
          onRequestClose={handleViewClose}
          todo={todos.find((todo) => todo.id === viewId) || {}}
        />
      )}

      {deleteId!=null && (
        <DeleteModal
          isOpen={true}
          onRequestClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}

  </div>

    </>
   
  );
};

export default TodoList;
