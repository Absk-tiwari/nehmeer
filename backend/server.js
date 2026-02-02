require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Model } = require('objection');
const Knex = require('knex');
const path = require('path');
const { mysqlConfig } = require('./db');
// const buildPath = path.join(__dirname, 'client/build');

const knex = Knex(mysqlConfig);

Model.knex(knex);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'media')));
// app.use(express.static(buildPath));

app.use("/auth", require("./routes/auth"));
app.use("/config", require("./routes/config"));

app.listen(port);