import { ResponseToolkit } from '@hapi/hapi';

export async function treatRequest(fn: Promise<unknown>, res: ResponseToolkit) {
  try {
    const res = await fn;
    return res;
  } catch (err) {
    return res
      .response({
        statusCode: err.code || 500,
        error: err.message,
        message: err.message,
      })
      .code(500);
  }
}
