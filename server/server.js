
const express = require("express");
const app = express();
// const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

// const { Client } = require('@elastic/elasticsearch');

const elasticsearch = require("elasticsearch");

const Institute = require("./models/institute");
dotenv.config();

// Elasticsearch Connection
// const esClient = new Client(
//   { node: 'http://localhost:9200' }
//   );

const instituteRoutes = require("./routes/institutes");
//routes
//app.use("/api/v1/institute", instituteRoutes);

const elastic = require("./elastic-client");

const PORT = process.env.PORT || 4000;
const database = require("./config/database");
database.connect();



app.get('/', (req, res) => {
    res.send("Home Page");
});

app.listen(PORT, ()=> {
    console.log(`Server started at Port ${PORT}`);
});








//Index data in Elasticsearch
// async function indexDataInElasticsearch(data) {
//   const { _id, ...indexedData } = data;
//   await esClient.index({
//     index: 'aicte',
//     id: _id.toString(),
//     body: indexedData,
//   });
// }
// indexDataInElasticsearch()
// app.use(bodyParser.json());
// app.post("/create", async (req, res) => {
//     if (!req.body) {
//       return res.status(400).send('Request body is missing');
//     }
//     const institute = new Institute(req.body);
//     try {
//     esClient.index(
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
//       res.status(200).send("success " + institute._id);
//     } catch (error) {
//       res.status(400).send("Error: " + error.toString());
//       console.log(error);
//     }
//   });

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



