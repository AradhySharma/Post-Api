const express = require("express");
const { default: mongoose } = require('mongoose');
//const bodyParser = require('body-parser');
//const cors = require('cors');
const route = require("./routes/routes.js");

const app = express();

// Set up middleware
app.use(express.json());
//app.use(cors());

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://Aradhybly81:Aradhybly81@cluster0.tw2agat.mongodb.net/Blog', {
  useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});