const express = require('express')
const dotenv = require('dotenv')
//This syntax is known as destructuring assignment. It extracts the MongoClient class from the mongodb module. Instead of importing the entire module and then accessing MongoClient through it (like mongodb.MongoClient), destructuring allows you to directly extract MongoClient into its own variable.
const { MongoClient } = require('mongodb')
const bodyparser = require('body-parser') 
const cors = require('cors')
dotenv.config()




const url = "mongodb://localhost:27017"
const app = express()
const port = 3000

const client = new MongoClient(url)
const dbname = 'PassOp'

client.connect()
app.use(bodyparser.json())
app.use(cors())

//get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save passwords
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    await collection.insertOne(password);
    res.send("status: password saved!!")
})

app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    await collection.deleteOne(password);
    res.send("status: password deleted!!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})