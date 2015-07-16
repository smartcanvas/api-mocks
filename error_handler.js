/*
 * Module with functions to deal with error handling
 */

var errorHandler = {};
module.exports = errorHandler;

/**
 * Builds a message in the standard format Smart Canvas uses to deal with errors
 *
 * @param errorCode The error code. Example: 404, 500 etc
 * @param message Message to help the developer to understand the problem
 * @returns {string} The Basic Error JSON string
 */
errorHandler.buildBasicErrorMessage = function( errorCode, message ) {
    return { "code": errorCode, "message": message };
}

/**
 * Builds an error message with fields that Smart Canvas uses
 *
 * @param errorCode The error code. Example: 404, 500 etc
 * @param message Message to help the developer to understand the problem
 * @param fields Fields with errors
 * @returns {string} The Basic Error JSON string
 */
errorHandler.buildBasicErrorMessage = function( errorCode, message, fields ) {
    return { "code": errorCode, "message": message, "fields": fields };
}

/**
 * Validates if the request header contains a client id
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
errorHandler.validateClientId = function( req, res, next ) {
    var clientId = req.headers['x-client-id'];

    if ( (!clientId) || (clientId === null) ) {
        var jsonMessage = errorHandler.buildBasicErrorMessage(401, "Client ID not found in the request header. "
            + "Use the client ID you got from Smart Canvas developers portal (dev.smartcanvas.com)");
        return res.status(401).json(jsonMessage);
    } else {
        next();
    }
}

/**
 * Validates if the request header contains a tenant id
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
errorHandler.validateTenantId = function( req, res, next ) {
    var tenantId = req.headers['x-tenant-id'];

    if ( (!tenantId) || (tenantId === null) ) {
        var jsonMessage = errorHandler.buildBasicErrorMessage(401, "The client ID is not mapped to a valid tenant. "
            + "Contact api@smartcanvas.com for support");
        return res.status(401).json(jsonMessage);
    } else {
        next();
    }

}
