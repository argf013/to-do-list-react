import React, { useState, useEffect } from 'react'
import './TodoList.css'

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/api/todos', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                setTodos(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    };
    
    const handleAddTodo = () => {
        if (!input) {
            alert('Input cannot be empty!');
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/api/todos', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                setTodos([...todos, JSON.parse(xhr.responseText)]);
                setInput('');
            }
        };
        xhr.send(JSON.stringify({ task: input, completed: false }));
    };
    
    const handleDeleteTodo = (id) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `http://localhost:5000/api/todos/${id}`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                fetchData();
            }
        };
        xhr.send();
    };
    
    const handleDeleteAll = () => {
        todos.forEach((todo) => {
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', `http://localhost:5000/api/todos/`, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    fetchData();
                }
            };
            xhr.send();
        });
    };
    
    return (
        <div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add Todo"
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.task}{' '}
                        <button onClick={() => handleDeleteTodo(index)}>Done</button>
                    </li>
                    
                ))}
                {todos.length > 1 && (
                    <button onClick={handleDeleteAll}>Done All</button>
                )}
            </ul>
        </div>
    );
                }    

export default TodoList;

