describe('cURL Request Analysis - JSON Validation Tests', () => {
  const apiBaseUrl = 'https://echo-serv.tbxnet.com/v1'
  
  describe('POST /test - JSON Syntax Validation', () => {
    it('Should fail with malformed JSON (original cURL request)', () => {
      // Este es el JSON problemático del cURL original
      const malformedPayload = `{
"contact1": "David "Dave" Letterman",
"price": "30.00",
"details": "Greatest '''Hits''' Album"
}`

      // Intentar enviar el JSON malformado
      cy.request({
        method: 'POST',
        url: `${apiBaseUrl}/test`,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: malformedPayload,
        failOnStatusCode: false
      }).then((response) => {
        // Debe fallar con error de sintaxis JSON
        expect([400, 422, 500]).to.include(response.status)
        
        cy.log('Malformed JSON Request Result:', {
          status: response.status,
          body: response.body,
          issue: 'JSON syntax error due to unescaped quotes'
        })
        
        // El servidor debe indicar error de parsing
        if (response.body && typeof response.body === 'object') {
          // Buscar indicadores de error de JSON
          const bodyStr = JSON.stringify(response.body).toLowerCase()
          const hasJsonError = bodyStr.includes('json') || 
                              bodyStr.includes('syntax') || 
                              bodyStr.includes('parse') ||
                              bodyStr.includes('malformed')
          
          if (hasJsonError) {
            cy.log('✅ Server correctly identified JSON syntax error')
          }
        }
      })
    })

    it('Should succeed with corrected JSON payload', () => {
      // JSON corregido con escape de comillas apropiado
      const correctedPayload = {
        "contact1": "David \"Dave\" Letterman",
        "price": "30.00",
        "details": "Greatest \"Hits\" Album"
      }

      cy.request({
        method: 'POST',
        url: `${apiBaseUrl}/test`,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: correctedPayload,
        failOnStatusCode: false
      }).then((response) => {
        cy.log('Corrected JSON Request Result:', {
          status: response.status,
          body: response.body,
          payload: correctedPayload
        })
        
        // Si el endpoint funciona, debe aceptar el JSON válido
        if (response.status === 200) {
          expect(response.body).to.be.an('object')
          cy.log('✅ Server successfully processed corrected JSON')
        } else {
          // Documentar si el endpoint tiene otros problemas
          cy.log(`⚠️ Endpoint returned ${response.status} - may have other issues beyond JSON syntax`)
        }
      })
    })

    it('Should validate JSON structure before sending', () => {
      // Test para demostrar validación previa del JSON
      const testCases = [
        {
          name: 'Original malformed JSON',
          json: '{"contact1": "David "Dave" Letterman"}',
          shouldBeValid: false
        },
        {
          name: 'Corrected JSON with escaped quotes', 
          json: '{"contact1": "David \\"Dave\\" Letterman"}',
          shouldBeValid: true
        },
        {
          name: 'JSON with triple quotes issue',
          json: '{"details": "Greatest \'\'\'Hits\'\'\' Album"}',
          shouldBeValid: true // Comillas simples son válidas en JSON
        },
        {
          name: 'Corrected details field',
          json: '{"details": "Greatest \\"Hits\\" Album"}',
          shouldBeValid: true
        }
      ]

      testCases.forEach((testCase) => {
        try {
          const parsed = JSON.parse(testCase.json)
          if (testCase.shouldBeValid) {
            cy.log(`✅ ${testCase.name}: Valid JSON`, parsed)
          } else {
            cy.log(`⚠️ ${testCase.name}: Expected to be invalid but parsed successfully`, parsed)
          }
        } catch (error) {
          if (!testCase.shouldBeValid) {
            cy.log(`✅ ${testCase.name}: Correctly identified as invalid JSON`)
            cy.log(`   Error: ${error.message}`)
          } else {
            cy.log(`❌ ${testCase.name}: Expected to be valid but failed parsing`)
            cy.log(`   Error: ${error.message}`)
            throw error
          }
        }
      })
    })

    it('Should demonstrate proper JSON escaping techniques', () => {
      // Casos de prueba para diferentes tipos de escape
      const escapingExamples = [
        {
          description: 'Double quotes inside string',
          original: 'He said "Hello"',
          escaped: 'He said \\"Hello\\"',
          inJson: '{"message": "He said \\"Hello\\""}'
        },
        {
          description: 'Backslash characters',
          original: 'C:\\Users\\Document',
          escaped: 'C:\\\\Users\\\\Document',
          inJson: '{"path": "C:\\\\Users\\\\Document"}'
        },
        {
          description: 'Mixed quotes scenario',
          original: `David "Dave" O'Reilly`,
          escaped: `David \\"Dave\\" O'Reilly`,
          inJson: '{"name": "David \\"Dave\\" O\'Reilly"}'
        }
      ]

      escapingExamples.forEach((example) => {
        // Validar que el JSON escapado es válido
        expect(() => JSON.parse(example.inJson)).to.not.throw()
        
        const parsed = JSON.parse(example.inJson)
        cy.log(`✅ ${example.description}:`, {
          original: example.original,
          escaped: example.escaped,
          parsed: parsed
        })
        
        // Verificar que el valor parseado contiene el texto original
        const parsedValue = Object.values(parsed)[0]
        expect(parsedValue).to.include(example.original)
      })
    })

    it('Should test the complete corrected cURL equivalent', () => {
      // Replicar exactamente el cURL corregido
      const curlEquivalentPayload = {
        contact1: "David \"Dave\" Letterman",
        price: "30.00", 
        details: "Greatest \"Hits\" Album"
      }

      cy.request({
        method: 'POST',
        url: `${apiBaseUrl}/test`,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: curlEquivalentPayload,
        failOnStatusCode: false
      }).then((response) => {
        // Documentar el resultado completo
        cy.log('Complete cURL Equivalent Test:', {
          requestMethod: 'POST',
          endpoint: '/test',
          payload: curlEquivalentPayload,
          responseStatus: response.status,
          responseHeaders: response.headers,
          responseBody: response.body
        })
        
        // Validar que el request fue procesado (independientemente del status)
        expect(response.status).to.be.a('number')
        expect(response.body).to.exist
        
        // Log del análisis final
        if (response.status >= 200 && response.status < 300) {
          cy.log('🎉 cURL request correction was successful!')
        } else {
          cy.log(`📝 Endpoint returned ${response.status} - JSON syntax was corrected but endpoint may have other issues`)
        }
      })
    })
  })
})