# QYT Task Management

Task Management Application

## Prerequisites

Make sure you have the following tools installed in your PC.

- [NodeJS V16](https://nodejs.org)
- [Postgresql](https://www.postgresql.org/download/)
- [Typescript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## How to start a server (Locally)?

- Clone this repo & open project in your vscode editor (or any editor of your choice)
- Create new environment variables in your `.env`
- In Your `.env` add the following environment variables

```sh
DATABASE_URI="postgres://postgres:gramdb@localhost:5432/qt"
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD="yourredispassword"
SECRET_KEY="your secretKey"

```

- Then run `source ~/.bashrc`

- After In your terminal, inside project directory run `yarn install`
- And run `yarn dev` to start your local server

## API Documentation

Currently we are using swagger to document our API

- Using localhost

```sh
http://localhost:4000/api-docs/v1
```
