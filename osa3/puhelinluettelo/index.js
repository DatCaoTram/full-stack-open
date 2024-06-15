const express = require("express")
const morgan = require("morgan")
const app = express()

morgan.token('body', (req, res) =>  { 
    if (req.method === "POST") {
        return JSON.stringify(req.body) 
    }
})

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

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const findId = Number(request.params.id)
    const person = persons.find(person => person.id === findId)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const findId = Number(request.params.id)
    const findPerson = persons.find(person => person.id === findId)
    persons = persons.filter(person => person.id !== findId)
    if (findPerson === undefined) {
        return response.status(400).end()
    }
    response.status(204).end()
})

app.put("/api/persons/:id", (request, response) => {
    const findId = Number(request.params.id) 
    const person = persons.find(person => person.id === findId)
    person.number = request.body.number
    response.status(204).end()
}) 

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date(Date.now())}</p>`)

})

app.post("/api/persons", (request, response) => {
    let newPerson = request.body
    const nameAlreadyExists = persons
        .filter(person => person.name === newPerson.name)
        .length
    if (!newPerson.name) {
        return response.status(400).json({ 
            error: "name is missing"
        })
    }
    if (!newPerson.number) {
        return response.status(400).json({ 
            error: "number is missing"
        })
    }
    if (nameAlreadyExists) {
        return response.status(400).json({ 
            error: "name must be unique"
        })
    }
    newPerson = { ...newPerson, id: Math.floor(Math.random() * 100000 )}    
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})