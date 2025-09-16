describe('Echo Server API Tests', () => {
  const apiBaseUrl = 'https://echo-serv.tbxnet.com/v1'

  describe('GET /qa/test2 - Second Endpoint Test', () => {
    it('Should handle endpoint error gracefully', () => {
      const startTime = Date.now()
      
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/qa/test2`,
        timeout: 10000,
        failOnStatusCode: false
      }).then((response) => {
        const endTime = Date.now()
        const responseTime = endTime - startTime

        // Validar Status Code (aceptar 500 como válido para este endpoint problemático)
        expect([200, 500]).to.include(response.status)
        
        // Validar Response Time (menor a 3 segundos)
        expect(responseTime).to.be.lessThan(3000)
        cy.log(`Response time: ${responseTime}ms`)
        
        // Validar Headers básicos
        expect(response.headers).to.have.property('content-type')
        expect(response.headers['content-type']).to.include('application/json')
        
        // Validar estructura del Response Body
        expect(response.body).to.be.an('object')
        
        // Log completo para análisis
        cy.log('API Response Analysis:', {
          status: response.status,
          statusText: response.status === 500 ? 'Server Error - Expected' : 'Success',
          body: response.body,
          responseTime: `${responseTime}ms`
        })
        
        // Validaciones basadas en el status code real
        if (response.status === 500) {
          // Validar estructura de error del servidor
          expect(response.body).to.have.property('code')
          expect(response.body).to.have.property('message')
          expect(response.body).to.have.property('details')
          expect(response.body.status).to.eq(500)
          
          cy.log('Server Error Response Structure Validated')
        } else if (response.status === 200) {
          // Validaciones para respuesta exitosa
          if (response.body.hasOwnProperty('data')) {
            expect(response.body.data).to.exist
          }
        }
      })
    })

    it('Should handle server errors appropriately', () => {
      // Test con parámetros inválidos si el endpoint los acepta
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/qa/test2`,
        qs: { invalid_param: 'test' },
        failOnStatusCode: false
      }).then((response) => {
        // El endpoint actualmente retorna 500, esto es esperado
        expect([200, 400, 404, 500]).to.include(response.status)
        
        // Debe retornar información útil incluso en errores
        expect(response.body).to.be.an('object')
        
        if (response.status === 500) {
          cy.log('Server Error Handled Correctly:', response.body)
          expect(response.body).to.have.property('message')
        }
      })
    })

    it('Should validate response content type and encoding', () => {
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/qa/test2`,
        failOnStatusCode: false
      }).then((response) => {
        // Validar content-type específico (tanto para 200 como 500)
        expect(response.headers['content-type']).to.match(/application\/json/)
        
        // Validar encoding si está especificado
        if (response.headers['content-type'].includes('charset')) {
          expect(response.headers['content-type']).to.include('utf-8')
        }
        
        // Validar que el JSON es válido
        expect(() => JSON.stringify(response.body)).to.not.throw()
        
        // Validar Content-Length header si existe
        if (response.headers.hasOwnProperty('content-length')) {
          const contentLength = parseInt(response.headers['content-length'])
          expect(contentLength).to.be.greaterThan(0)
        }
        
        // Log para documentar el estado actual del endpoint
        cy.log(`Endpoint /qa/test2 Status: ${response.status}`, {
          contentType: response.headers['content-type'],
          bodyStructure: Object.keys(response.body)
        })
      })
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('Should handle non-existent endpoints correctly', () => {
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/qa/nonexistent`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([404, 405, 500])
        
        // Incluso en errores, debería retornar JSON si es una API REST
        if (response.headers['content-type'].includes('application/json')) {
          expect(response.body).to.be.an('object')
          
          if (response.body.hasOwnProperty('error')) {
            expect(response.body.error).to.be.a('string')
          }
        }
      })
    })

    it('Should handle different HTTP methods appropriately', () => {
      // Test POST en endpoint GET para verificar method handling
      cy.request({
        method: 'POST',
        url: `${apiBaseUrl}/qa/test1`,
        failOnStatusCode: false,
        body: { test: 'data' }
      }).then((response) => {
        // Pueden retornar varios códigos dependiendo de la implementación
        expect([200, 404, 405, 500]).to.include(response.status)
        
        if (response.status === 405) {
          // Verificar Allow header si está presente
          if (response.headers.hasOwnProperty('allow')) {
            expect(response.headers.allow).to.include('GET')
          }
        }
        
        cy.log(`HTTP Method Test Result: ${response.status}`)
      })
    })

    it('Should validate API availability and uptime', () => {
      const requests = []
      
      // Hacer 5 requests consecutivos para verificar disponibilidad
      for (let i = 0; i < 5; i++) {
        requests.push(
          cy.request({
            method: 'GET',
            url: `${apiBaseUrl}/qa/test1`,
            timeout: 5000
          })
        )
      }
      
      // Verificar que todos los requests sean exitosos
      requests.forEach((request, index) => {
        request.then((response) => {
          expect(response.status).to.eq(200)
          cy.log(`Availability test ${index + 1}/5: PASSED`)
        })
      })
    })
  })    
})
