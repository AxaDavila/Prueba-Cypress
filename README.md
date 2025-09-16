README.md

# Cypress E2E Pruebas UI & API

Proyecto para validación de la plataforma [Automation Exercise](https://automationexercise.com/), la API Echo Server con Cypress, validacion de cURL y documentaciøon de bug.

Características

Pruebas de UI: Registro de usuario, login y validaciones de formularios.
Pruebas de API: Validación de endpoints, tiempos de respuesta, headers y estructura de datos.
Comandos personalizados: Reutilización de código para operaciones comunes.
Configuración robusta: Manejo de errores y timeouts optimizados.
Estructura organizada: Separación clara entre pruebas de UI y API.
Esta misma puede ser reutilizada en un Pipeline para alinear con procesos de CI/CD que he agregado el archivo pero no funcionara hasta que se agreguen las Key's de Github y Cypress. Tampoco agrego archivo de .GitIgnored para que se vean todos los archivos. 

## Instalación Rápida

1. Clonar el repositorio:
git clone <URL_DE_TU_REPO>
cd <CARPETA_DEL_PROYECTO>

2. Instalar dependencias:
npm install // O mejor puede instalar desde requirements
pip install -r requirements.txt.

si ocurre un error al descargar Instala Cypress correctamente
En la raíz del proyecto (donde está package.json):

text
npm install cypress --save-dev


3. Ejecutar los tests desde Cypress:
npx cypress open

## Ejecutar los tests

Para ejecutar todos los tests en modo headless:
npm test
# o
npm run cy:run

Para abrir test runner con UI:
npm run cy:open


## Descripción de los tests implementados

- **registro_usuario.cy.js:** Valida el registro de un nuevo usuario en la plataforma ecommerce y la confirmación de éxito en el proceso de signup.
- **login.cy.js:** Verifica el flujo de login y la correcta autenticación en la aplicación de ecommerce.
- **get_test1.cy.js & get_test2.cy.js:** Prueban dos endpoints de Echo Server, validando código de estado, tiempo de respuesta inferior a 3 segundos, estructura de datos en el body y headers esperados.

## Resultados y mejoras

En la carpeta **results/** o **screenshots/** se documentan bugs encontrados en la web/API o sugerencias de mejora detectadas durante la automatización  

## Dependencias clave

- Node.js >=20.x
- Cypress >=14.x

## Referencias
- [Sitio test UI](https://automationexercise.com/)
- [API de prueba](https://echo-serv.tbxnet.com/explorer/#/QA/get_qa_test1)
