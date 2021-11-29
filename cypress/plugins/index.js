const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(
    "..",
    "automation-course/cypress/configFiles",
    `${file}.json`
  );

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  const file = config.env.fileConfig || "stage";
  return getConfigurationByFile(file);
};
