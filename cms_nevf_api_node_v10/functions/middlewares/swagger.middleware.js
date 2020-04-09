const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

module.exports = function SwaggerMiddleware(version, servers, apis) {

    // Swagger set up
    const options = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "Contacts Management API",
                version,
                description:
                    "The Contacts API is a prototype API for applying REST architecture best practices",
                license: {
                    name: "MIT",
                    url: "https://choosealicense.com/licenses/mit/"
                },
                contact: {
                    name: "Swagger",
                    url: "https://swagger.io",
                    email: "Info@SmartBear.com"
                }
            },
            servers
        },
        apis
    };

    this.specs = swaggerJsdoc(options);

    this.swaggerUiHandlers = function () {
        return swaggerUi.serve;
    }

    this.swaggerUiMiddleware = function () {
        return swaggerUi.setup(this.specs, {
            explorer: true
        });
    }
}