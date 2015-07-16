var express = require('express');
var readFile = require('./../read_files');
var router = express.Router();

/*
 * GET /topic/v1/topics
 */
router.get('/v1/topics', function(req, res) {
    // set response body and send
    var jsonContent = readFile.readJSON('topics');
    return res.status(200).json(JSON.parse(jsonContent));
});

module.exports = router;