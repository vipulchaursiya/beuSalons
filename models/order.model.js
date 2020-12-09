const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  subTotal:{
    type:Number
  },
  date: {
    type: Date,
    default: Date.now
  },
});


const Order = mongoose.model('Order', OrderSchema);
module.exports = Order; 