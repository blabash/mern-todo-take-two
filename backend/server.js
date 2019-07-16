const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/keys_dev').mongoURI
const mongoose = require('mongoose')
const todoRoutes = express.Router()
const PORT = 4000

let Todo = require('./todo.model')

app.use(cors())
app.use(bodyParser.json())

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if(err) {
            console.log(err)
        } else {
            res.json(todos)
        }
    })
})

todoRoutes.route('/:id').get((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        res.json(todo)
    })
})

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body)
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new todo failed')
        })
})

todoRoutes.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send('data not found')
        } else {
            todo.todo_description = req.body.todo_description
            todo.todo_responsible = req.body.todo_responsible
            todo.todo_priority = req.body.todo_priority
            todo.todo_completed = req.body.todo_completed

            todo.save().then(todo => {
                res.json('Todo Updated')
            })
            .catch(err => {
                res.status(400).send("Update not possible")
            })
        }
    })
})

app.use('/todos', todoRoutes)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT)
})
