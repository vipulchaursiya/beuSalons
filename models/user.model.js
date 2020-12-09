const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  _created: {
    type: Date,
    default: Date.now
  },
  // noOfOrders:{
  //   type: Number,
  //   default : 0
  // }
});

const User = mongoose.model('User', UserSchema);
module.exports = User; 