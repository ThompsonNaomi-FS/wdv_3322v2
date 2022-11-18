const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('../api/routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const options = require('../config/swaggerOptions');

// middleware for routers first (use)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// actuator
app.get('/', (req,res) => {
    res.status(200).json({ message: 'Service is up' });
});

// router
app.use('/users', userRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(options));

// errors: use middleware for errors and bad paths
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    })
});

mongoose.connect(process.env.mongoDBURL, (err) => {
    if (err) {
        console.error("Error: ", err.message);
    }
    else {
        console.log("MongoDB connection established.");
    }
});


module.exports = app;