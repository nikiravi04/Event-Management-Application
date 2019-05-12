'use strict';
const mongoose1 = require('mongoose');
const Schema = mongoose1.Schema;

/**
 * Mongoose schema for contacts object.
 */
let RegistrationSchema = new Schema({
    /**
     * Name of the user
     */
    UserName: {
        type: String,
        required: "Name is required"
    },

    /**
     * UserID of the user
     */
    UserID: {
        type: String,
        required: "UserID is required"
    },

    /**
     * Event name
     */
    EventName: {
        type: String,
        required: "EventName is required"
        
    },
    /**
     * Event ID
     */
    EventID: {
        type: String,
        required: "EventID is required"
    },
    /**
     * Phone number of the user
     */
    PhoneNumber: {
        type: String,
       required: "Phone Number is required"
    },
    /**
     * Email ID of the user
     */
    EmailID: {
        type: String,
       required: "Email ID is required"
    },
    /**
     * Number of tickets for the event
     */
    AttendeesNum: {
        type: String,
       required: "Attendees is required"
    }
}, {
    versionKey: false
});

module.exports = mongoose1.model('registrations', RegistrationSchema);