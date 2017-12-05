// load the things we need
var mongoose = require('mongoose');


// define the schema for our user model
var vehicleSchema = mongoose.Schema({

    local            : {
        name         : String,
        image        : { data: Buffer, contentType: String },
    }

});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Vehicle', vehicleSchema);