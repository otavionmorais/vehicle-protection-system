import { Request, ResponseToolkit } from '@hapi/hapi';

export enum ErrorIdentifier {
  INTERNAL_SERVER_ERROR = 'INT.001',
  VALIDATION_ERROR = 'VAL.001',
  CLIENT_NOT_FOUND = 'CL.001',
  CLIENT_ALREADY_EXISTS = 'CL.002',
  CLIENT_INVALID_PASSWORD = 'CL.003',
  THIRD_PARTY_PERSON_NOT_FOUND = 'TPP.001',
  ACCIDENT_NOT_FOUND = 'ACC.001',
}

export class CustomError extends Error {
  public httpCode: number;
  public identifier: ErrorIdentifier;

  constructor(message: string, identifier: ErrorIdentifier, httpCode: number) {
    super(message);
    this.identifier = identifier;
    this.httpCode = httpCode;
  }

  public toObject() {
    return {
      statusCode: this.httpCode,
      error: this.identifier,
      message: this.message,
    };
  }
}

export const validationError = (
  _request: Request,
  h: ResponseToolkit,
  err: Error,
) => {
  const customError = new CustomError(
    err.message,
    ErrorIdentifier.VALIDATION_ERROR,
    400,
  );
  return h
    .response(customError.toObject())
    .code(customError.httpCode)
    .takeover();
};
