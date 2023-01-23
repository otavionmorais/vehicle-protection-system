import { configureClientRoutes } from './clients/clients.routes';
import Hapi from '@hapi/hapi';
import { configureAccidentRoutes } from './accidents/accidents.routes';

export function configureRoutes(server: Hapi.Server) {
  configureClientRoutes(server);
  configureAccidentRoutes(server);
}
