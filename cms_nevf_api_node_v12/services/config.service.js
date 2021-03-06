export default class ConfigService {
    static NODE_ENV = 'production';//process.env.NODE_ENV;
    static CORS_WHITELIST = "";//process.env.CORS_WHITELIST | "";
    static RATE_LIMIT_MAX_REQUESTS = "100"//process.env.RATE_LIMIT_MAX_REQUESTS | 100;
    static RATE_LIMIT_WINDOW_MS = "900000"//process.env.RATE_LIMIT_WINDOW_MS | "900000";

    static get(name) {
        return process.env[name];
    }
}