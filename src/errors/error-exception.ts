import { ErrorCode } from './error-code';

export class ErrorException extends Error {
  public statusCode = 500;
  public metaData: unknown = null;
  constructor(name: string = ErrorCode.UnknownError, metaData: unknown = null) {
    super(name);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = 500;
    this.metaData = metaData;
    switch (name) {
      case ErrorCode.Validation:
        this.statusCode = 400;
        break;
      case ErrorCode.AsyncError:
        this.statusCode = 400;
        break;
      case ErrorCode.NotFound:
        this.statusCode = 404;
        break;
      default:
        this.statusCode = 500;
        break;
    }
  }
}
