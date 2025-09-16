// cypress/support/e2e.js - Simplified version

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test on uncaught exceptions
  if (err.message.includes('Script error') || err.message.includes('Non-Error promise rejection')) {
    return false
  }
  return true
})

// Global configuration for better test stability  
beforeEach(() => {
  cy.on('window:before:load', (win) => {
    win.addEventListener('error', (e) => {
      if (e.filename && e.filename.includes('googletagmanager')) {
        e.stopImmediatePropagation()
      }
    })
  })
})