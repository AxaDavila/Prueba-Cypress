# Cypress E-commerce & API Test Suite

### Tests de UI (Automation Exercise)

#### 1. **Registro de Usuario** (`user-registration.cy.js`)
- ✅ Registro exitoso con datos válidos
- ✅ Validación de email duplicado
- ✅ Validación de campos requeridos
- ✅ Limpieza automática de cuentas de prueba

**Validaciones incluidas:**
- Navegación correcta entre páginas
- Completado de formularios multi-paso
- Verificación de mensajes de confirmación
- Validaciones HTML5 de campos requeridos

#### 2. **Login de Usuario** (`user-login.cy.js`)
- ✅ Login exitoso con credenciales válidas
- ✅ Manejo de credenciales inválidas
- ✅ Validación de formato de email
- ✅ Validación de campos requeridos
- ✅ Navegación entre formularios de login y registro

**Validaciones incluidas:**
- Creación automática de usuario para pruebas
- Verificación de estado de sesión
- Manejo de errores de autenticación
- Validación de elementos de UI

### Tests de API (Echo Server)

#### 1. **Endpoint GET /qa/test1**
- ✅ Validación de status code (200)
- ✅ Tiempo de respuesta < 3 segundos
- ✅ Validación de headers (Content-Type, etc.)
- ✅ Estructura y contenido del response body
- ✅ Consistencia entre múltiples requests

#### 2. **Endpoint GET /qa/test2**
- ✅ Validación de status code (200)
- ✅ Tiempo de respuesta < 3 segundos
- ✅ Validación de headers específicos
- ✅ Validación de encoding y content-type
- ✅ Manejo de parámetros inválidos

#### 3. **Tests de Casos Edge y Manejo de Errores**
- ✅ Endpoints no existentes (404)
- ✅ Métodos HTTP no permitidos (405)
- ✅ Disponibilidad y uptime de la API
- ✅ Validación de headers de error

#### 3. **Tests de cURL/JSON Validation** (`curl-validation.cy.js`)
- ✅ Validación de sintaxis JSON malformada
- ✅ Corrección de escape de comillas en JSON
- ✅ Demostración de técnicas de escape apropiadas
- ✅ Replicación de request cURL corregido
- ✅ Validación previa de estructura JSON

**Validaciones incluidas:**
- Detección de JSON inválido (comillas sin escapar)
- Comparación entre request original vs corregido
- Técnicas de escape para diferentes casos
- Análisis completo de errores de sintaxis
- Status codes apropiados
- Tiempos de respuesta medidos y validados
- Headers de seguridad y CORS
- Estructura JSON consistente
- Manejo graceful de errores

## 🔧 Comandos Personalizados

El proyecto incluye varios comandos personalizados para mejorar la reutilización:

- `cy.createTestUser()` - Creación automatizada de usuarios
- `cy.loginUser(email, password)` - Login simplificado
- `cy.verifyUserLoggedIn(userName)` - Verificación de sesión
- `cy.deleteAccount()` - Limpieza de cuentas de prueba
- `cy.timedRequest(options)` - Requests con medición de tiempo
- `cy.validateApiResponse(response, options)` - Validación robusta de respuestas API

## ⚙️ Configuración

### Cypress Config (`cypress.config.js`)
- **Base URL**: `https://automationexercise.com`
- **API Base URL**: `https://echo-serv.tbxnet.com/v1`
- **Viewport**: 1280x720
- **Timeouts**: Configurados para estabilidad
- **Video/Screenshots**: Habilitados para debugging

### Variables de Entorno
- `apiBaseUrl`: URL base para tests de API
- Configuraciones adicionales disponibles en `cypress.config.js`

## 📊 Reportes y Resultados

Los tests generan automáticamente:
- **Videos** de ejecución (en `cypress/videos/`)
- **Screenshots** en caso de fallos (en `cypress/screenshots/`)
- **Logs detallados** en consola con tiempos de respuesta
- **Reportes** de cobertura disponibles tras la ejecución

## 🐛 Bugs Encontrados y Mejoras Sugeridas

*Consultar la carpeta `results/` para documentación detallada de issues encontrados durante las pruebas.*

### UI (Automation Exercise)
- Algunos elementos podrían beneficiarse de mejores selectores data-qa
- Validaciones de frontend podrían ser más descriptivas

### API (Echo Server)
- Documentación de endpoints podría ser más detallada
- Headers de seguridad adicionales recomendados

## 🔍 Debugging y Troubleshooting

### Tests de UI Fallando
1. Verificar conectividad a `https://automationexercise.com`
2. Revisar si cambió la estructura del DOM
3. Verificar timeouts en `cypress.config.js`

### Tests de API Fallando
1. Verificar disponibilidad de `https://echo-serv.tbxnet.com`
2. Revisar logs de red en las Developer Tools
3. Validar estructura de respuesta esperada

### Comandos Útiles para Debugging
```bash
# Ejecutar test específico
npx cypress run --spec "cypress/e2e/ui/user-registrater.cy.js"

# Ejecutar con navegador visible
npx cypress run --headed --browser chrome

# Abrir con DevTools
npx cypress open --browser chrome
```


## 📝 Notas Técnicas

- **Estabilidad**: Los tests incluyen esperas explícitas y manejo de elementos dinámicos
- **Limpieza**: Automática eliminación de datos de prueba para evitar interferencias
- **Paralelización**: Los tests están diseñados para ejecutarse independientemente
- **Cross-browser**: Configurados para Chrome, Firefox y Edge

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Autor**: Sr QA Engineer  
**Fecha**: 2025 
**Versión**: 1.0.0
