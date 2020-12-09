var mongoose = require('mongoose');
var host = "localhost:27017";
var database = "beusalons";
var dbURI = 'mongodb://' + host + '/' + database;
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection created in \"' + process.env.NODE_ENV + '\" mode');
});
// If the connection throw    s an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
  });
});
