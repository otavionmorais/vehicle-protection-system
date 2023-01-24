# vehicle-protection-system

Service to register clients, accidents and affected third parties.

## Endpoints documentation

You can find the endpoints documentation [here](https://documenter.getpostman.com/view/10600065/Tz5qZQ9o).

<br>

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (> v16)
- [PostgreSQL](https://www.postgresql.org/) (> v10)

### Runnig the project

First, you need to create a `.env` file in the root of the project, based on the `.env.example` file.

Then, you need to install the dependencies:

```sh
npm install
```

Insert Postgres connection string in the `.env` file (`DATABASE_URL` variable) and run the migrations:

```sh
npm run migrations:execute
```

And finally, you can run the project:

```sh
npm run start
```

That's it! The project will be running on `localhost:${PORT}`.  
<br>

## Useful commands

### Creating migrations:

```sh
npm run typeorm migration:create src/database/migrations/{migrationName}
```

### Running tests:

```sh
npm run test
```

### Running lint verification:

```sh
npm run lint
```
