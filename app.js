require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const morganBody = require("morgan-body");
const openApiConfig = require("./docs/swagger");
const loggerStream = require("./utils/logger.handler");
const dbConnectNoSql = require('./config/mongo');
const { dbConnectMySql } = require('./config/mysql');
const app = express();

const dbEngine = process.env.ENGINE_DB;
const environment = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400;
    }
});

app.use('/documentation', 
    swaggerUi.serve, 
    swaggerUi.setup(openApiConfig))

const port = process.env.PORT || 3000;

app.use("/api", require('./routes'));

if(environment !== 'test'){
    app.listen(port);
}



if (dbEngine === 'nosql') {
    dbConnectNoSql();
} else {
    dbConnectMySql();
} 

module.exports = app;