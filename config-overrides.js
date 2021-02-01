const rewireUglifyjs = require("react-app-rewire-uglifyjs");

module.exports = function override(config, env) {
  config = rewireUglifyjs(config);
  return config;
};
