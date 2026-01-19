const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nameArg = process.argv[3]
const numberArg = process.argv[4]

const url = `mongodb+srv://zerotriceps7y_db_user:${password}@cluster0.ijrrepp.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (nameArg && numberArg) {
  const person = new Person({
    name: nameArg,
    number: numberArg,
  })

  person.save().then(() => {
    console.log(`added ${person.name}, number ${person.number} to phonebook!`)
    mongoose.connection.close()
  })

} else {
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
}
