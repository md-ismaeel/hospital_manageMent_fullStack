const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRoutes = require('./Routes/user.routes')

const app = express();
app.use(express.json())

dotenv.config()
const Port = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/hospitalManagement')
    .then(() => console.log('MongoDb connection stablish successfully'))
    .catch(() => console.log('Error, while connecting with mongoDb'))

app.use('/api/v1/user', userRoutes)

app.use('/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'path not found'
    })
})

app.listen(Port, () => console.log(`Server is up and running on port ${Port}`))