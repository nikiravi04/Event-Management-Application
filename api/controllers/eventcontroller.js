var mongoose = require('mongoose');
var registration = mongoose.model('registrations');
const registrationService = require('../services/registrationservice');

// Find events based on user ID
module.exports.eventsRead = function(req, res) {

    if (!req.payload._id) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    } else {
    registration
        .findById(req.payload._id)
        .exec(function(err, register) {
          res.status(200).json(register);
        });
    }
  
  };

  // List events based on user ID
  module.exports.list = function (request, response) {
    
    let callback = function (registrations) {
        response.status(200);
        response.json(registrations);
    };
    registrationService.search({}, callback);
    
}

// Getting all events based on user ID
module.exports.some = function (request, response) {

    let callback = function (registrations) {
        response.status(200);
        response.json(registrations);
    };
    registrationService.get(request.params.uid, callback);
 }

/**
 * Creates a new event with the request JSON and
 * returns JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
module.exports.post = function (request, response) {
    let newRegistration = Object.assign({}, request.body);
        callback = function (registration) {
        response.status(200);
        response.json(registration);
    };
    registrationService.save(newRegistration, callback);
};

/**
 * Updates and returns a event object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
module.exports.put = function (request, response) {
    let newRegistration = Object.assign({}, request.body);
        callback = function (newRegistration) {
        response.status(200);
        response.json(newRegistration);
    };
    newRegistration._id = request.params.registerID;
    registrationService.update(newRegistration, callback);
};

/**
 * Deletes a event object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
module.exports.delete = function (request, response) {
    let callback = function (registrations) {
        response.status(200);
        response.json({
            message: 'Registration Successfully deleted'
        });
    };
    registrationService.delete(request.params.registerID, callback);
};