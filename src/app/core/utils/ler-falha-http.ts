import { HttpErrorResponse } from '@angular/common/http';

export function lerFalhaHttp(error: HttpErrorResponse): string {
  if (!error.error) return error.message;

  if (Array.isArray(error.error) && error.error.length > 0) {
    return error.error[0];
  }
  if (typeof error.error === 'string') {
    return error.error;
  }
  if (typeof error.error === 'object' && error.error.Message) {
    return error.error.Message;
  }

  return error.message;
}