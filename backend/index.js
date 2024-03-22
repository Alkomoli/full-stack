const express = require('express')
const app = express()
app.use(express.json())
const {check, validationResult} = require('express-validator')
var morgan = require('morgan')
app.use(morgan('tiny'))

const cors = require('cors')

 app.use(cors())

// käytetään kätevää express validator kirjastoa datan tarkastamiseen...
 
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
  {
    name: " testi ukkeli",
    number: "76758584949",
    id:5
  }
]


app.get('/api/info', (req,res) => {
 const length = persons.length
 const time = new Date();
 const year = time.getFullYear()
 const month = time.getMonth() + 1
 const day = time.getDate()
 const hour = time.getHours()
 const min = time.getMinutes()
 const sec = time.getSeconds()
 res.send(`<p> has info for ${length} persons</p> <p> systems was opened at ${year}/${month}/${day} at ${hour}:${min}:${sec}  </p>`)
 
})
  
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

    // check exist pitäisi tarkistaa onko käyttäjän nimi jo olemassa, mutta jostain syystä ei

  app.post('/api/persons/',[check("name").notEmpty(), check("number").notEmpty().exists()], (req,res) => {
   
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body)
    console.log(errors)
    const newId = persons.length + 1
    const newPerson  = Object.assign({id : newId,}, req.body)
    if(req.body.name === "") {
      res.status(204).end
    }
    
    // FileSystem.WriteFile((persons), JSON.stringify(persons), (err) => {
    //   res.status(201).json({
    //     status:"success",
    //     data: {
    //       person:newPerson
    //     }
    //   })
    // })
    persons.concat(JSON.stringify(newPerson))
    console.log(newId)
  
    res.send(" käyttäjä luotu onnistuneesti!")
  })

  app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    console.log(id)
    const note = persons.find(person => person.id === id)
    console.log(note)
    res.json(note)
   
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    // notes = notes.filter(note => note.id !== id)
     persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  
  app.get('/api/persons/', (req, res) => {
    res.json(persons)
    
  })

  
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })