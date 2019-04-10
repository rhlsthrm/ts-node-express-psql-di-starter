# Typescript Node Starter Kit
This repo provides a good starting point to build a modern, scalable backend with proven technologies. This framework is currently being used in production by [Connext](https://github.com/ConnextProject) as well as [Spankchain](https://github.com/SpankChain). The repo provides a development toolset which includes dependency injection, Typescript, PostgreSQL, Redis, and Web3 to provide solid backend infrastructure for planet-scale Web3 dApps (or even personal pet projects). A full production example can be found in a version of Connext's Indra [state channel hub](https://github.com/ConnextProject/indra/tree/master/modules/hub).

# Getting Started

## Installing Prerequisites
* Clone this repo.
* `npm i` to install dependencies.
* `brew install postgres` for easiest [PostgreSQL](https://www.postgresql.org) installation (macOS only).
* `brew install redis` for easiest [Redis](https://redis.io) installation (macOS only).

## Running the Server
`npm run start:dev` will run the server in dev mode, with hot reloading. The server will start by default on port 8080.

## Built in API Routes
### Authentication
* GET `/auth/status` - Check authentication status.
* POST `/auth/challenge` - Get a nonce to complete an authentication challenge.
* POST `/auth/response` - Send a private key signed nonce, which if successfully recovered will authenticate your public key.

### CRUD
* POST `/item/` - Create an `item` with an optional `{ data: { ... } }` POST body that can take arbitrary JSON data.
* POST `/item/count` - Update counter on the `item`.
* GET `/item/:id` - Get an `item` by ID.

# Features
* Authentication by Ethereum public key.
* Dependency injection for ease of testing.
* "Full-stack" backend with API, service, and data layers.
* Set up to use Web3.

# Contribution
PRs and feedback always welcome.

# Thanks
Thank you to [David Wolever](https://github.com/wolever) and [Matthew Slipper](https://github.com/mslipper) for building this framework from the ground up.