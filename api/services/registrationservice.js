'use strict';
const mongoose = require('mongoose'),
Registration = mongoose.model('registrations');

let throwError = function (error) {
    if (error) {
        throw Error(error);
    }
};

/**
 * Returns an array of event object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 * @param {function} callback {Sucess callback function}
 */
module.exports.search = function (params, callback) {
    let resultCallback = function (err, registrations) {
        throwError(err);
        callback(registrations);
    };
    Registration.find(params, resultCallback);
};

/**
 * Saves and returns the new event object.
 *
 * @param {Object} contact {Event object}
 * @param {function} callback {Sucess callback function}
 */
module.exports.save = function (registration, callback) {
    let newRegistration = new Registration(registration),
        resultCallback = function (err, registration) {
            //throwError(err);
            callback(registration);
    };
    newRegistration.save(resultCallback);
};

/**
 * Updates and returns the event object.
 *
 * @param {Object} contact {Event object}
 * @param {function} callback {Sucess callback function}
 */
module.exports.update = function (register, callback) {
    
    let resultCallback = function (err, register) {
        throwError(err);
        callback(register);
    };
   Registration.findOneAndUpdate({
        _id: register._id
    }, register, {
        new: true
    }, resultCallback);
};

/**
 * Deletes the event object matching the id.
 *
 * @param {string} contactId {Id of the event object}
 * @param {function} callback {Sucess callback function}
 */
module.exports.delete = function (registerID, callback) {
    let resultCallback = function (err, contact) {
        throwError(err);
        callback();
    };
    Registration.remove({
        EventID: registerID
    }, resultCallback);
};

module.exports.get = function (uid, callback) {
    
    let resultCallback = function (err, register) {
        throwError(err);
        callback(register);
    };
    Registration.find({UserID: uid}, resultCallback);
 };