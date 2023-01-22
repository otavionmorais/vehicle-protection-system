import { configureClientRoutes } from './clients/clients.routes';
import Hapi from '@hapi/hapi';

export function configureRoutes(server: Hapi.Server) {
  configureClientRoutes(server);
}
