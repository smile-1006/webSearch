const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');
const Institute = require('../models/institute'); // Import your Institute model

const esClient = new Client({ node: 'http://localhost:9200' });
const router = express.Router();

// Middleware
router.use(bodyParser.json());

// Controller for handling GET requests
const getAllInstitute = async (req, res) => {
  try {
    if (!req.body || !req.body.id) {
      return res.status(400).send('Request body is missing');
    }

    const institute = new Institute(req.body);

    // Indexing in Elasticsearch
    await esClient.index({
      index: 'institute',
      type: 'instituteType',
      id: req.body.id,
      body: req.body,
    });

    // Saving in MongoDB
    await institute.save();

    return res.status(200).json(institute);
  } catch (error) {
    console.error(error);
    return res.status(400).send('Error: ' + error.toString());
  }
};

// Define routes
router.post('/getAllInstitute', getAllInstitute);

module.exports = router;



