# Proyecto Lab9 - Serie Fibonacci

## Descripción
Este proyecto implementa un servidor web con Express para calcular y devolver la serie de Fibonacci para un número dado. También incluye un frontend sencillo que permite al usuario ingresar un número y ver la serie generada.

## Objetivos
- Crear un endpoint en Express que retorne la serie de Fibonacci.
- Implementar la lógica matemática para calcular la serie.
- Manejar parámetros en una petición GET.
- Consumir el endpoint desde el frontend usando `fetch`.

## Especificaciones

### Backend
- **Framework:** Express
- **Endpoint:** `GET /fibonacci/:n` retorna la serie de Fibonacci en formato JSON.
- **Lógica:** Función que genera la serie hasta `n` elementos.
- **CORS:** Habilitado para permitir solicitudes desde el frontend.

### Frontend
- **HTML y CSS:** Formulario para ingresar un número y mostrar la serie.
- **JavaScript:** Uso de `fetch` para consumir el endpoint y mostrar el resultado.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.1.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

