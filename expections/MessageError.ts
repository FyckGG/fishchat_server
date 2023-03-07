export default class MessageError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors: string[] = []
  ) {
    super(message);
  }

  static BadRequest(message: string, errors = []) {
    return new MessageError(400, message, errors);
  }
}
