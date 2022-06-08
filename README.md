## API REST - CSMM

[![CircleCI](https://img.shields.io/circleci/project/github/contentful/the-example-app.nodejs.svg)](https://circleci.com/gh/contentful/the-example-app.nodejs)

API REST del Gestor Escolar del Colegio Santa María del Mar.

Despliegue de staging en <a href="https://csmm-api.herokuapp.com/v1" target="_blank">Heroku</a>.

## Requisitos

* Node 16
* Git

## Setup

Clonar el repositorio y pedir credenciales de acceso a la base de datos, crear un archivo .env con estas.

```bash
git clone https://github.com/CSMM-A-Coruna/CSMM_API-REST.git
cd CSMM_API-REST
```

```bash
npm install
```

## Entorno de desarrollo

Para iniciar el servidor de desarrollo utiliza:

```bash
npm run dev
```

Se iniciará una instancia en [http://localhost:3000](http://localhost:3000).

## Uso de Docker (Pendiente)

Despliegue en contenedor de Docker.

Step 1: Build docker image

```bash
docker build -t csmm_apirest .
```

Step 3: Iniciar el contenedor de docker con la imagen creada.

```bash
docker run -p 3000:3000 -d csmm_apirest
```
