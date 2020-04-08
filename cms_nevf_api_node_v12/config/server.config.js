import Express from "express";
import cors from "cors";
import helmet from "helmet";
// import DbConfig from "./db.config";
// import { RateLimiterConfig } from ".";
import morgan from "morgan";
import paginate from "express-paginate";
import { ConfigService, FirebaseService } from "../services";

export default class ServerConfig {

    constructor({ port, middlewares, routers }) {
        this.app = Express();
        this.app.set("env", ConfigService.NODE_ENV);
        // this.app.set("env", process.env.NODE_ENV);
        this.app.set("port", port);
        this.registerCORSMiddleware()
            .registerHelmetMiddleware()
            // .registerRateLimiter()
            .registerMorganMiddleware()
            // .registerAuthenticationMiddleware()
            .registerJSONMiddleware()
            .registerExpressPaginateMiddleware();

        middlewares &&
            middlewares.forEach(mdlw => {
                this.registerMiddleware(mdlw);
            });

        this.app.get("/", (req, res, next) => {
            // const er = new Error("my bad");
            // er.statusCode = 501;
            // throw er;
            res.json({
                message: "Ok"
            });
        });

        this.app.get("/ping", (req, res, next) => {
            res.send("pong");
        });

        routers &&
            routers.forEach(({ baseUrl, router }) => {
                this.registerRouter(baseUrl, router);
            });

        this.registerMiddleware(
            // catch 404 and forward to error handler
            function (req, res, next) {
                var err = new Error("Not Found");
                err.statusCode = 404;
                next(err);
            }
        );
        this.registerErrorHandlingMiddleware();
    }

    get port() {
        return this.app.get("port");
    }

    set port(number) {
        this.app.set("port", number);
    }

    /**
     * register any middleware
     * @param {*} middleware
     */
    registerMiddleware(middleware) {
        this.app.use(middleware);
        return this;
    }

    /**
     * register Express router
     * @param {*} router
     */
    registerRouter(baseUrl, router) {
        this.app.use(baseUrl, router);
        return this;
    }

    /**
    * register Morgan middleware for request logging
    */
    registerMorganMiddleware() {
        this.registerMiddleware(morgan("combined"));
        return this;
    }

    /**
     * register Express JSON middleware to handle requests with JSON body
     */
    registerJSONMiddleware() {
        this.registerMiddleware(Express.json());
        return this;
    }

    /**
 * register Express Paginate middleware for pagianted data response
 */
    registerExpressPaginateMiddleware() {
        this.registerMiddleware(paginate.middleware(0, 100));
        return this;
    }

    /**
     * register CORS middleware for cross origin requests
     */
    registerCORSMiddleware() {
        this.registerMiddleware(cors());
        return this;
    }

    /**
     * register Helmet middleware for Security HTTP headers
     */
    registerHelmetMiddleware() {
        this.registerMiddleware(helmet());
        return this;
    }

    /**
  * Register Rate Limiter middleware to prevent Denial of Service (DoS) attacks
  */
    // registerRateLimiter() {

    //     const rateLimitConf = new RateLimiterConfig({
    //         maxRequests: ConfigService.get("RATE_LIMIT_MAX_REQUESTS"),
    //         windowMs: ConfigService.get("RATE_LIMIT_WINDOW_MS")
    //     });

    //     const limiter = rateLimitConf.apiRateLimiter;

    //     this.registerMiddleware(limiter);
    //     return this;
    // }

    /**
     * register the Express Error Handling middleware
     */
    registerErrorHandlingMiddleware() {
        this.app.get("env") === "development"
            ? this.registerMiddleware(
                ({ statusCode = 500, message, stack }, req, res, next) => {
                    res.status(statusCode);
                    res.json({
                        statusCode,
                        message,
                        stack
                    });
                }
            )
            : this.registerMiddleware(({ statusCode, message }, req, res, next) => {
                res.status(statusCode);
                res.json({ statusCode, message });
            });
        return this;
    }

    async listen() {
        try {
            // const dbConf = new DbConfig("contactsdb", "images");
            // await dbConf.connectDb();

            return this.app.listen(this.port, () => {
                console.log(`Listening on port: ${this.port}`);
                // console.log(`Listening on port: ${this.port} in ${ConfigService.get("NODE_ENV")}`);
            });
        } catch (error) {
            console.error(` Error: ${error.message}`);
        }

    }
}