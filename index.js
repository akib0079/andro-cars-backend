const express = require("express")
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express()

// middleware for the project.
app.use(cors())
app.use(express.json())



// Connecting application.
const uri = `mongodb+srv://${process.env.DataBase_UName}:${process.env.DataBase_Pass}@cluster0.ha03r1k.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function runDataBase() {
    try {

        await client.connect();
        const dName = client.db("AndroCars").collection("Tools");
        app.get('/tools', async (req, res) => {
            const query = {};
            const cursor = dName.find(query);

            const allBooks = await cursor.toArray();
            res.send(allBooks);
        });
    }
    finally {

    }
}

runDataBase().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Connecting to Andro Cars...! Connected now..')
})

app.listen(port, () => {
    console.log('Updating AndroCars Server....');
})