// Equivalent of the security headers configured in the original next.config.mjs.
exports.permissionsPolicy = (req, res, next) => {
  res.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
};
