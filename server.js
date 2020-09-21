const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/error');
const dotenv = require('dotenv')
const colors = require('colors');
const dbConnect = require('./config/db');

//load env vars
dotenv.config({ path : './config/config.env'});

//connect to database 
dbConnect() ;

const app = express();


//body parser
app.use(express.json());

const submissions = require('./routes/submissions');
const users = require('./routes/users');
const questionnaires = require('./routes/questionnaires')


//body parser
app.use(express.json());


app.use('/api/v1/submissions',submissions);
app.use('/api/v1/users',users);
app.use('/api/v1/questionnaires',questionnaires)

app.use(errorHandler);

const PORT = process.env.PORT || 3000 ;


const server = app.listen(
    PORT 
    , console.log(`Server running on port ${process.env.NODE_ENV} on port ${PORT} `.yellow.bold)
);