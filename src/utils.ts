import { ResponseToolkit } from '@hapi/hapi';
import { parse } from 'date-fns';

export async function treatRequest(fn: Promise<unknown>, res: ResponseToolkit) {
  try {
    const res = await fn;
    return res;
  } catch (err) {
    return res
      .response({
        statusCode: err.httpCode || 500,
        error: err.identifier || err.message,
        message: err.message,
      })
      .code(err.httpCode || 500);
  }
}

export function validateEnvironmentVariables() {
  const requiredVariables = ['PORT', 'DATABASE_URL'];

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
