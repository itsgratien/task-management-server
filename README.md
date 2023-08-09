# express app boilerplate

express app boilerplate

## Prerequisites

Make sure you have the following tools installed in your PC.

- [NodeJS V16](https://nodejs.org)
- [Postgresql](https://www.postgresql.org/download/)
- [Typescript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## How to start a server (Locally)?

- Clone this repo & open project in your vscode editor (or any editor of your choice)
- Create new environment variables in your `.bashrc`
- In Your `.bashrc` add the following environment variables

```sh
export UPG_DATABASE_URI=postgres://postgres:user:pass@localhost:5432/payment
export UPG_TEST_DATABASE_URI=postgres://user:pass@localhost:5432/payment_test
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
