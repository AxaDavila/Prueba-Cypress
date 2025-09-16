describe('Echo Server API Tests', () => {
  const apiBaseUrl = 'https://echo-serv.tbxnet.com/v1'
  
  describe('GET /qa/test1 - First Endpoint Test', () => {
    it('Should return successful response with correct status code', () => {
      const startTime = Date.now()
      
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/qa/test1`,
        timeout: 10000
      }).then((response) => {
        const endTime = Date.now()
        const responseTime = endTime - startTime

        // Validar Status Code
        expect(response.status).to.eq(200)
        
        // Validar Response Time (menor a 3 segundos)
        expect(responseTime).to.be.lessThan(3000)
        cy.log(`Response time: ${responseTime}ms`)
        
        // Validar Headers
        expect(response.headers).to.have.property('content-type')
        expect(response.headers['content-type']).to.include('application/json')
        
        // Validar estructura del Response Body
        expect(response.body).to.be.an('object')
        
        // Log del response para debugging
        cy.log('Response Body:', JSON.stringify(response.body, null, 2))
        
        // Validaciones adicionales del response body si contiene datos específicos
        if (response.body.hasOwnProperty('message')) {
          expect(response.body.message).to.be.a('string')
        }
        
        if (response.body.hasOwnProperty('status')) {
          expect(response.body.status).to.be.a('string')
        }
        
        if (response.body.hasOwnProperty('timestamp')) {
          expect(response.body.timestamp).to.be.a('string')
          // Validar que el timestamp sea una fecha válida
          expect(new Date(response.body.timestamp).toString()).to.not.eq('Invalid Date')
        }
      })
    })

    it('Should handle request headers correctly', () => {
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/qa/test1`,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Cypress-Test-Runner'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        
        // Validar que la respuesta sea JSON
        expect(response.headers['content-type']).to.include('application/json')
        
        // Validar headers de seguridad o CORS si están presentes
        if (response.headers.hasOwnProperty('access-control-allow-origin')) {
          expect(response.headers['access-control-allow-origin']).to.be.a('string')
        }
      })
    })

    it('Should maintain consistent response structure', () => {
      // Hacer múltiples requests para verificar consistencia
      const requests = Array(3).fill(null).map(() => 
        cy.request(`${apiBaseUrl}/qa/test1`)
      )

      requests.forEach((request, index) => {
        request.then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('object')
          cy.log(`Request ${index + 1} - Status: ${response.status}`)
        })
      })
    })
  })
})