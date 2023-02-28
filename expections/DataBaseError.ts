export default class DataBaseError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors: string[] = []
  ) {
    super(message);
  }

  static AddingAgainError() {
    return new DataBaseError(400, "Already been added.");
  }

  static CancelActionError() {
    return new DataBaseError(
      404,
      "it is not possible to cancel the operation because it was not performed earlier."
    );
  }

  static DocumentNotFound(message: string, errors = []) {
    return new DataBaseError(404, message, errors);
  }
}
