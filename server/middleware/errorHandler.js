exports.notFound = (req, res) => res.status(404).json({ error: "Not found." });

// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "Please send a valid message." });
  if (err.type === "entity.too.large") return res.status(413).json({ error: "That request is too large." });
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
};
