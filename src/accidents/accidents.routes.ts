import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { handleRequest } from '../utils';
import { container } from 'tsyringe';
import { AccidentsController } from './accidents.controller';
import {
  ICreateAccidentDTO,
  IFindManyAccidentsDTO,
  IUpdateAccidentDTO,
} from './structures';
import { validationError } from '../errors';
import { joiDateWithoutTimeValidation } from '../utils';
import { ICreateThirdPartyPersonDTO } from '../third_party_people/structures';

export function configureAccidentRoutes(server: Hapi.Server) {
  const accidentsController = container.resolve(AccidentsController);

  server.route({
    method: 'GET',
    path: '/accidents',
    handler: (req, res) =>
      handleRequest(
        accidentsController.findMany(req.query as IFindManyAccidentsDTO),
        res,
      ),
    options: {
      validate: {
        query: Joi.object<IFindManyAccidentsDTO, true>({
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
    path: '/accidents/{id}',
    handler: (req, res) =>
      handleRequest(accidentsController.findById(req.params.id), res),
    options: {
      validate: {
        params: Joi.object<{ id: string }>({
          id: Joi.string().uuid().required(),
        }),
        failAction: validationError,
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/accidents',
    handler: (req, res) =>
      handleRequest(
        accidentsController.create(req.payload as ICreateAccidentDTO),
        res,
        201,
      ),
    options: {
      validate: {
        payload: Joi.object<ICreateAccidentDTO, true>({
          clientId: Joi.string().uuid().required(),
          vehiclePlate: Joi.string().required(),
          vehicleModel: Joi.string().required(),
          vehicleColor: Joi.string().required(),
          description: Joi.string().required(),
          thirdPartyPeople: Joi.array().items(
            Joi.object<ICreateThirdPartyPersonDTO, true>({
              document: Joi.string().required(),
              name: Joi.string().required(),
              email: Joi.string().email().required(),
              phone: Joi.string()
                .pattern(/^\+?[1-9][0-9]{7,14}$/)
                .required(),
              birthDate: Joi.string().custom(joiDateWithoutTimeValidation),
            }),
          ),
        }),
        failAction: validationError,
      },
    },
  });

  server.route({
    method: 'PATCH',
    path: '/accidents/{id}',
    handler: (req, res) =>
      handleRequest(
        accidentsController.update(
          req.params.id as string,
          req.payload as IUpdateAccidentDTO,
        ),
        res,
      ),
    options: {
      validate: {
        params: Joi.object<{ id: string }, true>({
          id: Joi.string().uuid().required(),
        }),
        payload: Joi.object<IUpdateAccidentDTO, true>({
          clientId: Joi.string().uuid(),
          vehiclePlate: Joi.string(),
          vehicleModel: Joi.string(),
          vehicleColor: Joi.string(),
          description: Joi.string(),
          deletedAt: Joi.string().valid(null),
          thirdPartyPeople: Joi.array().items(
            Joi.object<ICreateThirdPartyPersonDTO, true>({
              document: Joi.string(),
              name: Joi.string(),
              email: Joi.string().email(),
              phone: Joi.string().pattern(/^\+?[1-9][0-9]{7,14}$/),
              birthDate: Joi.string().custom(joiDateWithoutTimeValidation),
            }),
          ),
        }),
        failAction: validationError,
      },
    },
  });

  server.route({
    method: 'DELETE',
    path: '/accidents/{id}',
    handler: (req, res) =>
      handleRequest(accidentsController.delete(req.params.id), res),
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
