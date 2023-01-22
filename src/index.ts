import 'reflect-metadata';
import 'dotenv/config';
import Hapi from '@hapi/hapi';
import { configureRoutes } from './routes';

const server = Hapi.server({
  port: process.env.PORT,
  routes: {
    cors: true,
  },
});

configureRoutes(server);

const init = async () => {
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
