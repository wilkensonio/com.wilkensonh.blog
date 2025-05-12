const mongoose = require("mongoose");


const subscribeSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    }, 
    
    verificationToken: {
        type: String, 
        required: true 
    },

    deviceId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    verrified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }, 

});

const Subscribe = mongoose.model('Subscribe', subscribeSchema);
module.exports = Subscribe;