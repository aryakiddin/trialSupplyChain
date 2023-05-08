const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db')
require('dotenv').config()

const app = express();
app.use(bodyParser.json());

// Other configurations and middleware can be added here

// Routes
app.use('/auth', authRoutes);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
  
    app.listen(port, () =>
  
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();