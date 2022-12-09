const express = require('express');
const router = express.Router();
const datasetController = require('../controllers/dataset.controller');

/* GET dataset. */
router.get('/', datasetController.get);

module.exports = router;
  