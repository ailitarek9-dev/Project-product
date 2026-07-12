const { defineConfig } = require("cypress")
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: true,
    html: false,
    json: true
  },
  env: {
    allure: true,
    allureResultsPath: 'allure-results',
    allureReuseAfterSpec: true,
  },
  e2e: {
    baseUrl: 'https://demoblaze.com',
    video: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    setupNodeEvents(on, config) {
      allureWriter(on, config)
      return config
    },
  },
})