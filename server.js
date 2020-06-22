require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


/** Constants **/
const PORT = process.env.PORT;


/** Middleware **/
app.use(cors());
app.use(express.json());


/** Routes **/
const routes = require('./routes');
const testRoutes = require('./routes/testRoutes');
app.use('/', routes);
app.use('/test', testRoutes);

/** For Heroku Deployment **/
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
};

app.listen(PORT, console.log(`Listening on port ${PORT}...`));