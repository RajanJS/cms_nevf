/**
 * Created by rajan on 5/7/17.
 */
/*
 * Development environment configurations
 */
const path = require('path');
const rootPath = path.normalize(__dirname + '/../');

exports.app = {
    PATH: rootPath,
    host: 'localhost', // <= Change this to reflect the domain name this site is available on.
    port: process.env.PORT || 3000, // <= process.env.PORT overrides this, for hosted environments such as Heroku. Change to 443 if hosting for SSL.
    env_mode: 'prod',
    baseURL: '/',
};