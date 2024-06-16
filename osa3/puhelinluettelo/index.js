require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person")
const app = express()

morgan.token('body', (req, res) =>  { 
    if (req.method === "POST") {
        return JSON.stringify(req.body) 
    }
})

let persons = []

app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(newPersons => {
        persons = newPersons
        response.json(newPersons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(foundPerson => {
        response.json(foundPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id) 
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body
    Person.findByIdAndUpdate(
        request.params.id, 
        { name, number },
        { new: true, runValidators: true, context: "query" })
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
}) 

app.get('/info', (request, response) => {
    Person.find({})
    .then(persons => {
        response.send(`
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date(Date.now())}</p>`)
    })
    .catch(error => next(error))   
})

app.post("/api/persons", (request, response, next) => {
    let newPerson = request.body
    if (newPerson.name.trim() === "" || newPerson.number.trim() === "") {
        return response.status(400).send( 
            {error: "name or number is missing"}
        )
    }
    newPerson = new Person({ ...newPerson })
    newPerson.save().then(savedPerson => {
        persons = persons.concat(savedPerson)
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 
    if (error.name === 'ValidationError') {    
        return response.status(400).json({ error: error.message })  
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})