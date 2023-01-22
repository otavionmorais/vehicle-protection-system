import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { isValidDateWithoutTime, treatRequest } from '../utils';
import { container } from 'tsyringe';
import { ClientsController } from './clients.controller';
import { ICreateClientDTO } from './structures';
import { validationError } from '../errors';

export function configureClientRoutes(server: Hapi.Server) {
  const clientsController = container.resolve(ClientsController);

  server.route({
    method: 'POST',
    path: '/clients',
    handler: (req, res) => {
      const payload = req.payload as ICreateClientDTO;
      return treatRequest(clientsController.create(payload), res);
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
          birth_date: Joi.string()
            .custom((value, helpers) => {
              const isValidBirthDate = isValidDateWithoutTime(value);

              if (!isValidBirthDate) {
                return helpers.error('any.invalid');
              }

              return value;
            })
            .required(),
          password: Joi.string().min(6).required(),
        }),
        failAction: validationError,
      },
    },
  });
}
