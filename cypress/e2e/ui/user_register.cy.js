describe('User Registration Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should successfully register a new user', () => {
    // Datos únicos para cada test
    const timestamp = Date.now()
    const userData = {
      name: `Test Alexa ${timestamp}`,
      email: `testAlexa${timestamp}@example.com`,
      password: 'TestAlexa123!',
      firstName: 'Test',
      lastName: 'Alexa',
      company: 'Test Company',
      address: '123 Test Street',
      address2: 'Apt 4B',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90210',
      mobile: '1234567890'
    }

    // Navegar a la página de registro
    cy.get('a[href="/login"]').click()
    cy.url().should('include', '/login')
    
    // Verifica titulo de nuevo usuario
    cy.get('h2').contains('New User Signup!').should('be.visible')
    
    // Llenar formulario de registro inicial
    cy.get('input[data-qa="signup-name"]').type(userData.name)
    cy.get('input[data-qa="signup-email"]').type(userData.email)
    cy.get('button[data-qa="signup-button"]').click()

    // Verifica nuevo formulario de información detallada que la url contenga asersion y titulo visible
    cy.url().should('include', '/signup')
    cy.get('h2').contains('Enter Account Information').should('be.visible')

    // diligencia el formulario de información de cuenta
    cy.get('#id_gender1').check() // elegir Mr.
    cy.get('input[data-qa="password"]').type(userData.password)
    
    // selecciona fecha de nacimiento
    cy.get('select[data-qa="days"]').select('15')
    cy.get('select[data-qa="months"]').select('January')
    cy.get('select[data-qa="years"]').select('1990')

    // Checkboxes opcionales
    cy.get('#newsletter').check()
    cy.get('#optin').check()

    // Información de dirección
    cy.get('input[data-qa="first_name"]').type(userData.firstName)
    cy.get('input[data-qa="last_name"]').type(userData.lastName)
    cy.get('input[data-qa="company"]').type(userData.company)
    cy.get('input[data-qa="address"]').type(userData.address)
    cy.get('input[data-qa="address2"]').type(userData.address2)
    cy.get('select[data-qa="country"]').select(userData.country)
    cy.get('input[data-qa="state"]').type(userData.state)
    cy.get('input[data-qa="city"]').type(userData.city)
    cy.get('input[data-qa="zipcode"]').type(userData.zipcode)
    cy.get('input[data-qa="mobile_number"]').type(userData.mobile)

    // Enviar el formulario
    cy.get('button[data-qa="create-account"]').click()

    // Verifica que el registro fue exitoso
    cy.url().should('include', '/account_created')
    cy.get('h2[data-qa="account-created"]').should('contain', 'Account Created!')
    
    // Continua a la página principal
    cy.get('a[data-qa="continue-button"]').click()

    // Verifica que estamos logueados
    cy.get('a').contains('Logged in as').should('be.visible')
    cy.get('a').contains(userData.name).should('be.visible')

    // Cleanup: Eliminar la cuenta creada
    cy.get('a[href="/delete_account"]').click()
    cy.get('h2[data-qa="account-deleted"]').should('contain', 'Account Deleted!')
  })

  it('Should show error when registering with existing email', () => {
    // Intenta registrarse con un email que probablemente ya existe
    const existingEmail = 'test@example.com'
    
    cy.get('a[href="/login"]').click()
    cy.get('input[data-qa="signup-name"]').type('Test User')
    cy.get('input[data-qa="signup-email"]').type(existingEmail)
    cy.get('button[data-qa="signup-button"]').click()

    // Verifica mensaje de error (si existe)
    // Nota: Esto depende del comportamiento específico de la aplicación
    cy.get('body').then(($body) => {
      if ($body.find('p').length > 0) {
        cy.get('p').contains('Email Address already exist!').should('be.visible')
      }
    })
  })

  it('Should validate required fields in registration form', () => {
    cy.get('a[href="/login"]').click()
    
    // Intentar enviar formulario vacío
    cy.get('button[data-qa="signup-button"]').click()

    // Los campos requeridos deberían mostrar validación HTML5
    cy.get('input[data-qa="signup-name"]').then($input => {
      expect($input[0].validationMessage).to.not.be.empty
    })
    
    cy.get('input[data-qa="signup-email"]').then($input => {
      expect($input[0].validationMessage).to.not.be.empty
    })
  })
})