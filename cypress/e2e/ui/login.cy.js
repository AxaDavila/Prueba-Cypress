describe('User Login Tests', () => {
  beforeEach(() => {
    cy.visit('/')//extrae desde cypress.config.js la url de consulta
  })

  it('Should successfully login with valid credentials', () => {
    // Primero crear un usuario para hacer login
    const timestamp = Date.now()
    const userData = {
      name: `Test Alexa ${timestamp}`,
      email: `testAlexa${timestamp}@example.com`,
      password: 'LoginPass123!'
    }

    // Crear usuario
    cy.get('a[href="/login"]').click()
    cy.get('input[data-qa="signup-name"]').type(userData.name)
    cy.get('input[data-qa="signup-email"]').type(userData.email)
    cy.get('button[data-qa="signup-button"]').click()

    // Completar registro rápido
    cy.get('#id_gender1').check()
    cy.get('input[data-qa="password"]').type(userData.password)
    cy.get('select[data-qa="days"]').select('1')
    cy.get('select[data-qa="months"]').select('January')
    cy.get('select[data-qa="years"]').select('2000')
    cy.get('input[data-qa="first_name"]').type('Login')
    cy.get('input[data-qa="last_name"]').type('User')
    cy.get('input[data-qa="address"]').type('123 Test St')
    cy.get('select[data-qa="country"]').select('United States')
    cy.get('input[data-qa="state"]').type('CA')
    cy.get('input[data-qa="city"]').type('LA')
    cy.get('input[data-qa="zipcode"]').type('90210')
    cy.get('input[data-qa="mobile_number"]').type('1234567890')
    cy.get('button[data-qa="create-account"]').click()
    cy.get('a[data-qa="continue-button"]').click()

    // Logout para probar el login
    cy.get('a[href="/logout"]').click()

    // Probar login
    cy.get('a[href="/login"]').click()
    cy.url().should('include', '/login')
    
    // Verificar elementos de login
    cy.get('h2').contains('Login to your account').should('be.visible')
    
    // Realizar login
    cy.get('input[data-qa="login-email"]').type(userData.email)
    cy.get('input[data-qa="login-password"]').type(userData.password)
    cy.get('button[data-qa="login-button"]').click()

    // Verificar login exitoso
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('a').contains('Logged in as').should('be.visible')
    cy.get('a').contains(userData.name).should('be.visible')

    // Cleanup
    cy.get('a[href="/delete_account"]').click()
    cy.get('h2[data-qa="account-deleted"]').should('contain', 'Account Deleted!')
  })

  it('Should show error message for invalid credentials', () => {
    cy.get('a[href="/login"]').click()
    
    // Intentar login con credenciales inválidas
    cy.get('input[data-qa="login-email"]').type('noExiste@email.com')
    cy.get('input[data-qa="login-password"]').type('wrongpass')
    cy.get('button[data-qa="login-button"]').click()

    // Verificar mensaje de error
    cy.get('p').contains('Your email or password is incorrect!').should('be.visible')
    cy.url().should('include', '/login')
  })

  it('Should validate email format', () => {
    cy.get('a[href="/login"]').click()
    
    // Intentar con email inválido y confirmar mensaje
    cy.get('input[data-qa="login-email"]').type('invalid-email')
    cy.get('input[data-qa="login-password"]').type('somepassword')
    cy.get('button[data-qa="login-button"]').click()
    cy.get('input[data-qa="login-email"]').then($input => {
      expect($input[0].validationMessage).to.contain('Incluye un signo "@" en la dirección de correo electrónico')
    })
  })

  it('Should require both email and password fields', () => {
    cy.get('a[href="/login"]').click()
    
    // Intentar enviar formulario vacío
    cy.get('button[data-qa="login-button"]').click()

    // Verificar validación de campos requeridos
    cy.get('input[data-qa="login-email"]').then($input => {
      expect($input[0].validationMessage).to.not.be.empty
    })
  })

  it('Should navigate to signup from login page', () => {
    cy.get('a[href="/login"]').click()
    
    // Verificar que ambos formularios están presentes
    cy.get('h2').contains('Login to your account').should('be.visible')
    cy.get('h2').contains('New User Signup!').should('be.visible')
    
    // Verificar elementos del formulario de signup
    cy.get('input[data-qa="signup-name"]').should('be.visible')
    cy.get('input[data-qa="signup-email"]').should('be.visible')
    cy.get('button[data-qa="signup-button"]').should('be.visible')
  })
})