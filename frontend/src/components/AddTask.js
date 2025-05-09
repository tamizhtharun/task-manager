import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (title.trim() === '') {
      setError('Title is required');
      return;
    }
    
    console.log('Submitting task with data:', { title, description });
    
    try {
      // Use the full URL instead of relying on proxy
      const response = await axios.post('http://localhost:5000/api/tasks', { 
        title, 
        description 
      });
      
      console.log('Response from server:', response.data);
      navigate('/');
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err.response?.data?.message || 'Error adding task. Check console for details.');
    }
  };

  return (
    <div className="add-task">
      <h2>Add New Task</h2>
      {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Add Task</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;