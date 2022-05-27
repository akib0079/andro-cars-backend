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

        // Tools
        await client.connect();
        const ToolsDb = client.db("AndroCars").collection("Tools");

        // Orders
        const OrdersDb = client.db("AndroCars").collection("Orders");
        const userCollection = client.db("AndroCars").collection("Users");

        // Get all the tools.
        app.get('/tools', async (req, res) => {
            const query = {};
            const cursor = ToolsDb.find(query);

            const allTools = await cursor.toArray();
            res.send(allTools);
        });

        // Get a single tools.
        app.get('/tools/:id', async (req, res) => {
            const id = req.params;
            const query = { _id: ObjectId(id) };
            const data = await ToolsDb.findOne(query);

            res.send(data);
        });

        // insert an order.
        app.post('/orders', async (req, res) => {
            const newOrder = req.body;
            const result = await OrdersDb.insertOne(newOrder);
            res.send(result);
        })

        // creating user.
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // update user.
        app.put('/update-user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
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