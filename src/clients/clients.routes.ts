import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { handleRequest } from '../utils';
import { container } from 'tsyringe';
import { ClientsController } from './clients.controller';
import {
  ICreateClientDTO,
  IFindManyClientsDTO,
  IUpdateClientDTO,
} from './structures';
import { validationError } from '../errors';
import { joiDateWithoutTimeValidation } from '../utils';

export function configureClientRoutes(server: Hapi.Server) {
  const clientsController = container.resolve(ClientsController);

  server.route({
    method: 'GET',
    path: '/clients',
    handler: (req, res) =>
      handleRequest(
        clientsController.findMany(req.query as IFindManyClientsDTO),
        res,
      ),
    options: {
      validate: {
        query: Joi.object<IFindManyClientsDTO, true>({
          page: Joi.number().min(0),
          itemsPerPage: Joi.number().min(1),
          deleted: Joi.boolean(),
        }),
        failAction: validationError,
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/clients/{id}',
    handler: (req, res) =>
      handleRequest(clientsController.findOne(req.params.id), res),
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().uuid().required(),
        }),
        failAction: validationError,
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/clients',
    handler: (req, res) =>
      handleRequest(
        clientsController.create(req.payload as ICreateClientDTO),
        res,
        201,
      ),
    options: {
      validate: {
        payload: Joi.object<ICreateClientDTO, true>({
          document: Joi.string().required(),
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          phone: Joi.string()
            .pattern(/^\+?[1-9][0-9]{7,14}$/)
            .required(),
          birthDate: Joi.string()
            .custom(joiDateWithoutTimeValidation)
            .required(),
          password: Joi.string().min(6).required(),
        }),
        failAction: validationError,
      },
    },
  });

  server.route({
    method: 'PATCH',
    path: '/clients/{id}',
    handler: (req, res) =>
      handleRequest(
        clientsController.update(
          req.params.id as string,
          req.payload as IUpdateClientDTO,
        ),
        res,
      ),
    options: {
      validate: {
        params: Joi.object<{ id: string }, true>({
          id: Joi.string().uuid().required(),
        }),
        payload: Joi.object<IUpdateClientDTO, true>({
          document: Joi.string(),
          name: Joi.string(),
          email: Joi.string().email(),
          phone: Joi.string().pattern(/^\+?[1-9][0-9]{7,14}$/),
          birthDate: Joi.string().custom(joiDateWithoutTimeValidation),
          password: Joi.string().min(6),
          deletedAt: Joi.string().valid(null),
        }),
        failAction: validationError,
      },
    },
  });

  server.route({
    method: 'DELETE',
    path: '/clients/{id}',
    handler: (req, res) => {
      const { id } = req.params as { id: string };
      return handleRequest(clientsController.delete(id), res);
    },
    options: {
      validate: {
        params: Joi.object<{ id: string }, true>({
          id: Joi.string().uuid().required(),
        }),
        failAction: validationError,
      },
    },
  });
}
