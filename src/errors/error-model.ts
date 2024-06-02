export class ErrorModel {
  /**
   * Unique error code which identifies the error.
   */
  public name = '';
  /**
   * Status code of the error.
   */
  public statusCode = 200;
  /**
   * Any additional data that is required for translation.
   */
  public metaData?: unknown;
}
