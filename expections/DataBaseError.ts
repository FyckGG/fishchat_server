export default class DataBaseError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors: string[] = []
  ) {
    super(message);
  }

  static DocumentNotFound(message: string, errors = []) {
    return new DataBaseError(404, message, errors);
  }
}
