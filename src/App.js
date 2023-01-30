import './App.css'
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <p style={{fontSize: '18px'}}>To do List App</p>
      <h4>Created by <a href='https://github.com/argf013' target='_blank' rel="noreferrer">Arfa</a></h4>
      <TodoList />
    </div>
  );
}

export default App;
