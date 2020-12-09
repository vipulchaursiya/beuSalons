const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const User = require("../models/user.model");


// for maing new user
router.post("/makeUser", async (req, res) =>  {
  try {
      var reqBody = req.body;
      var newUser = new User(reqBody);
      newUser = await newUser.save();
      res.json(newUser)  
  } catch (e) {
      console.log("Exception in creating user:", e);
      res.status(500).send(false);
  }
});

// for this we have uncomment the noOfOrders key in user.model.js
router.get("/updateKey", async (req, res) =>  {
  try {
      var allOrders = await Order.aggregate([
        {
          '$group': {
            '_id': '$userId', 
            'noOfOrders': {
              '$sum': 1
            }
          }
        }, {
          '$project': {
            'userId': '$_id', 
            '_id': 0, 
            'noOfOrders': 1
          }
        }
      ]);
      var allUsers = await User.find({});
      var allOrdersId = allOrders.map(elem => elem.userId.toString());
      allUsers.forEach( async elem => {
        var index =  allOrdersId.indexOf(elem._id.toString());
        if(index > -1){
          elem["noOfOrders"] = allOrders[index].noOfOrders;          
          await elem.save();
        }
      });
      res.json({success: true, message : 'Successfully updated'})  
  } catch (e) {
      console.log("Exception in creating user:", e);
      res.status(500).send(false);
  }
});

module.exports = router;
