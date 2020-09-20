const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv')
const dbConnect = require('./config/db');

//load env vars
dotenv.config({ path : './config/config.env'});

//connect to database 
dbConnect() ;

const app = express();


//body parser
app.use(express.json());

const answers = require('./routes/answers');
const users = require('./routes/users');



//body parser
app.use(express.json());


app.use('/api/v1/answers',answers);
app.use('/api/v1/users',users);


app.use(errorHandler);

const PORT = process.env.PORT || 3000 ;


const server = app.listen(
    PORT 
    , console.log(`Server running on port ${process.env.NODE_ENV} on port ${PORT} `.yellow.bold)
);