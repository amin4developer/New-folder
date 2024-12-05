import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

export const todoService = {
  // Create a new todo
  createTodo: async (todo) => {
    try {
      const response = await axios.post(API_URL, todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Get all todos
  getTodos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Update a todo
  updateTodo: async (id, updatedTodo) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
};  