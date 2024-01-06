// backend/elastic-client.js
const { Client } = require("@elastic/elasticsearch");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://aicte:cse1234@cluster0.saeibd7.mongodb.net/aicte?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let changeStream;
client.connect(err => {
  const collection = client.db("test").collection("devices");
  changeStream = collection.watch();
});

// Elasticsearch Connection
const esClient = new Client(
    { node: 'http://localhost:5601' }
    );

require("dotenv").config({ path: ".env" });

const elasticClient = new Client({
auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
},
});

app.post("/create-post", async (req, res) => {
    const result = await elasticClient.index({
      index: "institute",
      document: {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
      },
    });
  
    res.send(result);
  });
  app.delete("/remove-post", async (req, res) => {
    const result = await elasticClient.delete({
      index: "institute",
      id: req.query.id,
    });
  
    res.json(result);
  });
  app.get("/search", async (req, res) => {
    const result = await elasticClient.search({
      index: "institute",
      query: { fuzzy: { title: req.query.query } },
    });
  
    res.json(result);
  });
  app.get("/posts", async (req, res) => {
    const result = await elasticClient.search({
      index: "institute",
      query: { match_all: {} },
    });
  
    res.send(result);
  });
  
module.exports = elasticClient;