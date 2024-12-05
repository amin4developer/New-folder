import React, { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await todoService.getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Failed to fetch todos');
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Failed to delete todo');
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = async () => {
    try {
      const updatedTodo = await todoService.updateTodo(editingTodo._id, editingTodo);
      setTodos(todos.map(todo => 
        todo._id === updatedTodo._id ? updatedTodo : todo
      ));
      setEditingTodo(null);
    } catch (error) {
      console.error('Failed to update todo');
    }
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      {todos.map(todo => (
        <div key={todo._id} className="todo-item">
          {editingTodo && editingTodo._id === todo._id ? (
            <div>
              <input 
                type="text" 
                value={editingTodo.title}
                onChange={(e) => setEditingTodo({...editingTodo, title: e.target.value})}
              />
              <input 
                type="text" 
                value={editingTodo.description}
                onChange={(e) => setEditingTodo({...editingTodo, description: e.target.value})}
              />
              <label>
                Completed:
                <input 
                  type="checkbox"
                  checked={editingTodo.completed}
                  onChange={(e) => setEditingTodo({...editingTodo, completed: e.target.checked})}
                />
              </label>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingTodo(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;