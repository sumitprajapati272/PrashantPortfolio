const { loadPortfolio } = require("../utils/portfolioStore");

exports.getPortfolio = async (req, res, next) => {
  try {
    const { source, data } = await loadPortfolio();
    res.set("X-Data-Source", source).json(data);
  } catch (error) {
    next(error);
  }
};
