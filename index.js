const express = require("express");
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5001;
const app = express();


// midelwie

app.use(cors())
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    let itsMyCoffeeHouse = client.db('myCoffeeHouse').collection("allCoffee");

    app.get('/addCoffee', async (req, res) => {
      let data = await itsMyCoffeeHouse.find().toArray();
      res.send(data)
    })




    app.post('/addCoffee', async (req, res) => {
      let data = req.body;
      let infoAdd = await itsMyCoffeeHouse.insertOne(data);
      res.send(infoAdd)
    })

    app.delete('/addCoffee/:id', async (req, res) => {
      let deleteId = req.params.id;
      let q = { _id: new ObjectId(deleteId) };
      let deleteItem = await itsMyCoffeeHouse.deleteOne(q)
      res.send(deleteItem)
    })

    app.get('/coffeeInfo/:id', async (req, res) => {
      let id = req.params.id;

      let q = { _id: new ObjectId(id) }
      let result = await itsMyCoffeeHouse.findOne(q);
      res.send(result)
    })

    app.put('/coffeeInfo/:id', async (req, res) => {
      let id = req.params.id;

      let q = { _id: new ObjectId(id) }

      let allInfo = req.body ;

      let options = { upsert : true };

      let CoffeeData = {
        $set : {
          coffeeName: allInfo.coffeeName,
          supplierCoffee : allInfo.supplierCoffee,
          categoryCoffee : allInfo.categoryCoffee,
          chefCoffee : allInfo.chefCoffee,
          tasteCoffee : allInfo.tasteCoffee,
          detailsCoffee : allInfo.detailsCoffee ,
          urlCoffee : allInfo.urlCoffee,
        }
      }
      let update = await itsMyCoffeeHouse.updateOne(q , CoffeeData  , options)

    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send("hello world")
})

app.listen(port)



