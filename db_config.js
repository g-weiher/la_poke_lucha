//mongoose setup
const mongoose = require('mongoose');
const { DBPW, DBUSER, DBHOST, DBNAME } = process.env;
const mongoDB = `mongodb+srv://${DBUSER}:${DBPW}@${DBHOST}/${DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));