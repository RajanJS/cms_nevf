/**
 * Created by rajan on 5/7/17.
 */
/*
 * Production environment configurations
 */
const path = require('path');
const rootPath = path.normalize(__dirname + '/../');

exports.app = {
    PATH: rootPath,
    host: 'https://us-central1-cms-nevf.cloudfunctions.net/app', // <= Change this to reflect the domain name this site is available on.
    port: process.env.PORT || 9000, // <= process.env.PORT overrides this, for hosted environments such as Heroku. Change to 443 if hosting for SSL.
    env_mode: 'prod',
    baseURL: '/',
};