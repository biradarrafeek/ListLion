
// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const resetTodos = () => {
    setTodos([]);
  };

  const filterTodos = (status) => {
    setFilter(status);
  };

  const filteredTodos =
    filter === 'all'
      ? todos
      : filter === 'active'
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);

  return (
    <div className="app">
      <header>
        <h1>TODO App</h1>
        <div>
          <button onClick={() => filterTodos('all')}>All</button>
          <button onClick={() => filterTodos('active')}>Active</button>
          <button onClick={() => filterTodos('completed')}>Completed</button>
        </div>
        <button onClick={resetTodos}>Reset</button>
      </header>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new TODO"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-card ${todo.completed ? 'completed' : ''}`}
            onClick={() => toggleTodo(todo.id)}
          >
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="footer">
        <p>Total Active Todos: {todos.filter((todo) => !todo.completed).length}</p>
      </div>
    </div>
  );
};

export default TodoApp;
