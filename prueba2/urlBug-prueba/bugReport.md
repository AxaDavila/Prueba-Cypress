---
name: "Error 500 al acceder por GET al endpoint /v1/qa/test2"
about: endpoint errado (sin servicio)
title: 'GET /v1/qa/test2 retorna Error 500 Internal Server '
labels: 'bug, backend, urgent'  
assignees: '(@nameDev)'

---

### Environment
URL: https://echo-serv.tbxnet.com/v1/qa/test2
Stage: QA

<!-- link to screenshot or video -->

### Logs
No hay logs locales disponibles; el error ocurre en el servidor remoto.  
La respuesta del servidor es un status code `500 Internal Server Error`.
<!-- Response: {"code":"SYS-ERR","message":"An Error","details":"SYSTEM_ERROR","status":500} -->

Adjunto cURL:
curl 'https://echo-serv.tbxnet.com/v1/qa/test2' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8' \
  -H 'accept-language: es-419,es;q=0.9' \
  -H 'cache-control: max-age=0' \
  -H 'dnt: 1' \
  -H 'priority: u=0, i' \
  -H 'sec-ch-ua: "Chromium";v="140", "Not=A?Brand";v="24", "Brave";v="140"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: none' \
  -H 'sec-fetch-user: ?1' \
  -H 'sec-gpc: 1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'

---

### Network Requests




### Browser Metadata
| Field      | Value                       |
|------------|----------------------------|
| Browser    | Chrome                     |
| Version    | 140.0.0.0                  |
| Dimensions | 1440x887                   |
| ...        | ...                        |

### Device Metadata
| Field      | Value          |
|------------|---------------|
| Device     | Macbook Pro   |
| Dimensions | 1440x887      |
| ...        | ...           |

### User Data
| Field      | Value                                                        |
|------------|--------------------------------------------------------------|
| Id         | 1Vm7Va                                                       |
| Local Time | Mon Sep 15 2025 18:11:00 GMT-05 (Central Daylight Time)      |
| ...        | ...                                                          |

### Custom Data
| Field      | Value         |
|------------|--------------|
| ...        | ...          |

---

### Notas técnicas

| Field      | Value         |
|------------|--------------|
|500 Internal Server Error.  | indica un fallo inesperado del servidor backend.  |
|El endpoint mal configurado |sobrecargado o tener una excepción no manejada.  |
|Verificar logs de servidor  | estado de servicios internos asociados para identificar la causa.|


