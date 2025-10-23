const express = require('express');
const cors = require('cors');
require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    apiPrefix: process.env.API_PREFIX || '/api/v1',
    corsOrigin: process.env.CORS_ORIGIN || '*',
};

const app = express();
//cors
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is healthy and running!',
    });
});

app.use(config.apiPrefix, apiRouter);

app.get('/', (req, res) => {
    res.status(200).send('Server is healthy and running!');
});

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    console.error(err.stack);

    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: config.nodeEnv === 'production' ? '🥞' : err.stack,
    });
};

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port} in ${config.nodeEnv} mode.`);
    console.log(`Access the API at http://localhost:${config.port}${config.apiPrefix}`);
});
