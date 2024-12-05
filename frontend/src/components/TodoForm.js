import React, { useState } from 'react';
import { todoService } from '../services/todoService';

const TodoForm = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newTodo = {
        title,
        description,
        completed: false
      };

      const createdTodo = await todoService.createTodo(newTodo);
      
      // Reset form
      setTitle('');
      setDescription('');

      // Optional: Call a callback to update parent component
      if (onTodoAdded) {
        onTodoAdded(createdTodo);
      }
    } catch (error) {
      console.error('Failed to create todo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Todo</h2>
      <div>
        <label>Title:</label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;