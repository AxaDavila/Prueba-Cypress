const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    watchForFileChanges: false,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // API testing configuration
    env: {
      apiBaseUrl: 'https://echo-serv.tbxnet.com/v1'
    },

    // Test file patterns
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/examples/*'],
  },
})