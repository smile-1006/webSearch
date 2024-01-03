
const express = require("express");
const app = express();
// const cors = require("cors");
const dotenv = require("dotenv");
const Institute = require("./models/institute");
dotenv.config();
const elasticsearch = require("elasticsearch");


const { Client } = require('@elastic/elasticsearch');

//const esClient = new Client({ node: 'http://localhost:9200' });

const PORT = process.env.PORT || 4000;
const database = require("./config/database");
database.connect();

//routes
app.use("/api/v1/institute", instituteRoutes);

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.listen(PORT, ()=> {
    console.log(`Server started at Port ${PORT}`);
});


const { MongoClient } = require('mongodb');
//const { Client } = require('@elastic/elasticsearch');


// Elasticsearch Connection
const esClient = new Client({ node: 'http://localhost:9200' });






  // Note: You may need to handle Elasticsearch connection closure based on your application's requirements.





//const mongodbCollection = mongoClient.db('yourDatabase').collection('yourCollection');

//Index data in Elasticsearch
async function indexDataInElasticsearch(data) {
  const { _id, ...indexedData } = data;
  await esClient.index({
    index: 'aicte',
    id: _id.toString(),
    body: indexedData,
  });
}
indexDataInElasticsearch()

// app.post("/create", async (req, res) => {
//     const institute = new Institute(req.body);
//     try {
//     elasticClient.index(
//         {
//         index: "institute",
//         type: "instituteType",
//         id: req.body.id,
//         body: req.body,
//         },
//         (err, resp, status) => {
//           if (err) {
//             console.log(err);
//           } else {
//             return res.json(institute);
//           }
//         }
//       );
//       await institute.save();
//       res.status(201).send("User has been created.");
//     } catch (error) {
//       // res.status(400).send("Error:", error);
//       console.log(error);
//     }
//   });

  app.get("/institutes", async (req, res) => {
    try {
      const institute = await Institute.find();
      res.status(200).send(institute);
    } catch (error) {
      res.status(500).send("Error:", error);
      console.log(error);
    }
  });

//   async function searchInElasticsearch(query) {
//     const { body } = await esClient.search({
//       index: 'aicte',
//       body: {
//         query: {
//           match: {
//             field_name: query,
//           },
//         },
//       },
//     });
//     return body.hits.hits;
//   }

//   searchInElasticsearch(body).then((result) => {
//     console.log(result);
//   });

    app.get("/institutes/:id", async (req, res) => {
      try {
        const institute = await Institute.findById({_id: req.params.id});
        res.status(200).send(institute);
      } catch (error) {
        res.status(400).send("Error:", error);
        console.log(error);
      }
    });

app.put("/updateInstitute/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Institute.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
        });
        res.status(200).send("User has been updated.");
        } catch (error) {
        res.status(400).send("Error:", error);
        console.log(error);
        }
    });

app.delete("/deleteInstitute/:id", async (req, res) => {    
    try {
        await Institute.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send("User has been deleted.");
        } catch (error) {
        res.status(400).send("Error:", error);
        console.log(error);
        }
    });

