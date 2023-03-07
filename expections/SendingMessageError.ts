export default class SendingMessageError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors: string[] = []
  ) {
    super(message);
  }

  static BadRequest(message: string, errors = []) {
    return new SendingMessageError(400, message, errors);
  }
}
