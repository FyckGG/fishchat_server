export default class UserError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors: string[] = []
  ) {
    super(message);
  }

  static UnautorizedError() {
    return new UserError(401, "Unautorized user");
  }

  static BadRequest(message: string, errors = []) {
    return new UserError(400, message, errors);
  }
}
