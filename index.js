const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;



// ------> Middleware 
app.use(cors());;
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.bs3vj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    await client.connect();
    const serviceCollection = client.db('jerin_parlours').collection('services');


    try {
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = await serviceCollection.find(query).toArray();
            res.send(cursor);
        });

    }

    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Jerin's Parlour is running")
})

app.listen(port, () => {
    console.log(`Jerin's Parlour is running ${port}`)
})