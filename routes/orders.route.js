const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const User = require('../models/user.model');

// for give an order we need an _id of the user for this api 
router.post("/makeOrder", async (req, res) =>  {
  try {
      var reqBody = req.body;
      if(!reqBody.userId) return res.status(404).send({status: "please inlcude the userId of the users"})
      var isUser = await User.find({_id: ObjectId(reqBody.userId)},{_id:1});
      if(isUser && isUser._id){        
        var newOrder = new Order(reqBody);
        newOrder = await newOrder.save();
        return res.json(newOrder)  
      } 
      res.status(404).send({status: "User not Found for the given userId"})
  } catch (e) {
      console.log("Exception in creating user:", e);
      res.status(500).send(false);
  }
});

router.get("/orderStats", async (req, res) =>  {
  try {
      var response  = await Order.aggregate([
        {
          '$group': {
            '_id': '$userId', 
            'noOfOrders': {
              '$sum': 1
            }, 
            'avgBillValue': {
              '$avg': '$subTotal'
            }
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'name'
          }
        }, {
          '$unwind': {
            'path': '$name'
          }
        }, {
          '$project': {
            '_id': 0, 
            'userId': '$_id', 
            'name': '$name.name', 
            'noOfOrders': 1, 
            'avgBillValue': 1
          }
        }
      ]);
      res.json(response)  
  } catch (e) {
      console.log("Exception in creating user:", e);
      res.status(500).send(false);
  }
});

module.exports = router;
