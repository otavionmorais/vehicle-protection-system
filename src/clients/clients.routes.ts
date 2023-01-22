import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { treatRequest } from '../utils';
import { container } from 'tsyringe';
import { ClientsController } from './clients.controller';
import { ICreateClientDTO } from './structures';

export function configureClientRoutes(server: Hapi.Server) {
  const clientsController = container.resolve(ClientsController);

  server.route({
    method: 'POST',
    path: '/clients',
    handler: (req, res) => {
      return treatRequest(
        clientsController.create(req.payload as ICreateClientDTO),
        res,
      );
    },
    options: {
      validate: {
        payload: Joi.object<ICreateClientDTO, true>({
          document: Joi.string().required(),
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          phone: Joi.string()
            .pattern(/^\+?[1-9][0-9]{7,14}$/)
            .required(),
          birth_date: Joi.date().required(),
          password: Joi.string().required(),
        }),
        failAction: (_request, _h, err) => {
          throw err;
        },
      },
    },
  });
}
