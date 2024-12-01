const express = require("express");
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5001 ;
const app = express();


// midelwie

app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MY_USER}:${process.env.MY_PASS}@cluster0.vrf0s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);



app.get('/',(req ,  res)=>{
    res.send("hello world")
})

app.listen(port)



