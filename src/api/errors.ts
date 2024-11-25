import { isAxiosError } from 'axios';
import { ZodError } from 'zod';

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleAPIError = (error: unknown): never => {
  if (error instanceof ZodError) {
    throw new APIError('Invalid data format received from API');
  }

  if (isAxiosError(error)) {
    throw new APIError(
      error.response?.data?.message || 'API request failed',
      error.response?.status
    );
  }

  throw new APIError('An unexpected error occurred');
};