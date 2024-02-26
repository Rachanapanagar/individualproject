const express = require("express");
const cors = require("cors");
const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(cors({}));
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
let db;

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    db = client.db("Pivotree");
    console.info("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.post("/login",async(req,res)=>{
  
// console.log("hi");
  await client.connect();
  // Send a ping to confirm a successful connection
  db = client.db("Pivotree");
  const usersCollection = db.collection('user');
  const username = req.body.username;
  const password = req.body.password;
const user =await usersCollection.findOne({"password":password,"username":username});
  

if (user) {
      console.log('Login successful');
      res.send({message:"logged in success",success:true})
  } else {
      console.log('Invalid email or password');
      res.send({message:"logged in failed",success:false})
  }
  client.close();
});

app.listen(port, hostname, () => {
  console.info(`server running at http://${hostname}:${port}/`);
});