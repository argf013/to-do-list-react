import React, { useState, useEffect } from 'react'
import './TodoList.css'
import Cookies from 'js-cookie';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const storedTodos = Cookies.get('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);
    
    useEffect(() => {
        Cookies.set('todos', JSON.stringify(todos));
    }, [todos]);
    
    const handleAddTodo = () => {
        if (!input) {
            alert('Input cannot be empty!');
            return;
        }
        setTodos([...todos, { task: input, completed: false }]);
        setInput('');
    };
    
    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };
    
    const handleToggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };
    
    return (
        <div className='container-todo'>
            <input
                className='input-form'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add Todo"
            />
            <button
                className='addBtn'
                onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.task}
                        </span>
                        <button className='opsBtn' onClick={() => handleToggleTodo(index)}>
                            {todo.completed ? 'Belum Selesai' : 'Selesai'}
                        </button>
                        <button className='deleteBtn' onClick={() => handleDeleteTodo(index)}>Delete</button>
                    </li>
    
                ))}
            </ul>
        </div>
    );
    
}


export default TodoList;
