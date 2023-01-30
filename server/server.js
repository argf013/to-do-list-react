const express = require('express')
const app = express()
const port = 5000
const fs = require('fs')

app.use(express.json())
app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});

let todos = []

const saveTodos = () => {
fs.writeFileSync('todos.json', JSON.stringify(todos))
}

const loadTodos = () => {
try {
todos = JSON.parse(fs.readFileSync('todos.json'))
} catch (error) {
todos = []
}
}

app.get('/api/todos', (req, res) => {
res.send(todos)
})

app.post('/api/todos', (req, res) => {
const todo = req.body
todos.push(todo)
saveTodos()
res.send(todo)
})

app.delete('/api/todos', (req, res) => {
todos = []
saveTodos()
res.send('All todos deleted')
})

app.delete('/api/todos/:id', (req, res) => {
const id = req.params.id
todos = todos.filter((todo, index) => index !== Number(id))
saveTodos()
res.send('Deleted')
})

app.put('/api/todos/:id', (req, res) => {
const id = req.params.id
const todo = req.body
todos = todos.map((oldTodo, index) => {
if (index === Number(id)) {
return { ...oldTodo, ...todo }
}
return oldTodo
})
saveTodos()
res.send(todos[id])
})

loadTodos()

app.listen(port, () => {
console.log(`Server running on port ${port}`)
})
