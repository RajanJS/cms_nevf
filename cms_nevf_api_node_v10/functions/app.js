/**
 * Module dependencies.
 */
const express = require('express');
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
require('dotenv').config()

const config = require('./config');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration with default env as dev if not specified env
 */
const env = process.env.NODE_ENV || 'dev';

require('./config/express.config')(app, config, env);

module.exports = app;