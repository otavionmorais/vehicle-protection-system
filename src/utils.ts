import { ResponseToolkit, ResponseValue } from '@hapi/hapi';
import { parse } from 'date-fns';
import Joi from 'joi';
import { CustomError, ErrorIdentifier } from './errors';

export async function handleRequest(
  fn: Promise<unknown>,
  h: ResponseToolkit,
  successHttpCode?: number,
) {
  try {
    const res = await fn;
    return h.response(res as ResponseValue).code(successHttpCode || 200);
  } catch (err) {
    const statusCode = err.httpCode || 500;
    return h
      .response({
        statusCode,
        error: err.identifier || err.message,
        message: err.message,
      })
      .code(statusCode);
  }
}

export function validateEnvironmentVariables() {
  const requiredVariables = ['NODE_ENV', 'PORT', 'DATABASE_URL'];

  for (const variable of requiredVariables) {
    if (!process.env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  }
}

export function isValidDateWithoutTime(dateString: string): boolean {
  try {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(dateString)) {
      return false;
    }

    return !!parse(dateString, 'yyyy-MM-dd', new Date()).getTime();
  } catch {
    return false;
  }
}

export const joiDateWithoutTimeValidation: Joi.CustomValidator = (
  value,
  helpers,
) => {
  const isValidBirthDate = isValidDateWithoutTime(value);

  if (!isValidBirthDate) {
    return helpers.error('any.invalid');
  }

  return value;
};

export function handleDatabaseError(err: Error) {
  if (err instanceof CustomError) throw err;

  console.error('Database error: ', err);
  throw new CustomError(
    'An unexpected error occurred. Try again later.',
    ErrorIdentifier.INTERNAL_SERVER_ERROR,
    500,
  );
}
