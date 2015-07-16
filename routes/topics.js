var express = require('express');
var router = express.Router();

/*
 * GET /topic/v1/topics
 */
router.get('/v1/topics', function(req, res) {
    var clientId = req.headers['x-client-id'];
    var tenantId = req.headers['x-tenant-id'];

    console.log( '/topic/v1/topics: x-client-id = ' + clientId + ', x-tenant.id = ' + tenantId );

    if ( (clientId === null) || (tenantId === null) ) {
        return res.json(400, req.validationErrorsJson());
    } else {
        res.status(200);

        // set response body and send
        res.json([
            {
                "id": "cinema",
                "name": "Cinema",
                "locale": "pt-br",
                "type": "explicit",
                "categories": [
                    "movie",
                    "cinema"
                ]
            },
        ]);
        return res.json;
    }
});

/*
 * GET /topic/v1/topics
 */
router.get('/', function(req, res) {
    var clientId = req.headers['x-client-id'];
    var tenantId = req.headers['x-tenant-id'];

    console.log( '/topic/v1/topics: x-client-id = ' + clientId + ', x-tenant.id = ' + tenantId );

    if ( (clientId === null) || (tenantId === null) ) {
        return res.json(400, req.validationErrorsJson());
    } else {
        res.status(200);

        // set response body and send
        res.json([
            {
                "id": "cinema2",
                "name": "Cinema2",
                "locale": "pt-br",
                "type": "explicit",
                "categories": [
                    "movie",
                    "cinema"
                ]
            },
        ]);
        return res.json;
    }
});

module.exports = router;