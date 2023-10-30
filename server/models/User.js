const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    Fullname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        
    },
    Password: {
        type: String,
        required: true,
    }
    
   
});

module.exports = mongoose.model('User', UserSchema);