const express = require("express")
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express()

// middleware for the project.
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('Connecting to Andro Cars...! Connected now..')
})

app.listen(port, () => {
    console.log('Updating AndroCars Server....');
})