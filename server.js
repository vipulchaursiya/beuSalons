const express = require("express");
var bodyParser = require('body-parser')
const db = require("./db.js"); 
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
var morgan = require('morgan');
app.use(morgan('dev'));
// import express route
const usersRoute = require("./routes/users.route");
const ordersRoute = require("./routes/orders.route");

app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);


var port = '1000';
app.listen(port, () => console.log(`Backend app listening on port ${port}!`));

