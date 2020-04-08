import RateLimit from "express-rate-limit";

export default class RateLimiterConfig {
    #maxRequests;
    #windowMs;

    constructor(limiterConfig) {
        this.#maxRequests = limiterConfig.maxRequests;
        this.#windowMs = limiterConfig.windowMs;
    }

    get apiRateLimiter() {
        return new RateLimit({
            max: this.#maxRequests,
            windowMs: this.#windowMs
        });
    }
}