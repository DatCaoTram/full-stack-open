const mongoose = require('mongoose')

const NAME = 3
const NUMBER = 4

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fulllstack:${password}@cluster0.kzyj4vt.mongodb.net/peopleApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv[NAME] === undefined || process.argv[NUMBER] === undefined) {
    Person.find({})
    .then(persons => {
        console.log("phonebook:")
        persons.forEach(person =>
            console.log(person.name, person.number)
        )
        mongoose.connection.close()
    })
} else {
    const person = new Person({
    name: process.argv[NAME],
    number: process.argv[NUMBER],
    })

    person.save().then(result => {
    console.log(`added ${process.argv[NAME]} number ${process.argv[NUMBER]} to phonebook`)
    mongoose.connection.close()
    })
}

