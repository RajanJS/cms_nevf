// all errors caught by async wrapper and sent to error handler
// no need for try catch
exports.AsyncWrapper = func => (req, res, next) => func(req, res, next).catch(next);