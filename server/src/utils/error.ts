export type ErrorFields = Record<string, string>;

export class ClientError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details: ErrorFields | null;

  constructor(message: string, status: number, code: string, details: ErrorFields | null = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends ClientError {
  constructor(message: string, details: ErrorFields) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}

export class UnauthorizedError extends ClientError {
  constructor(message: string) {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class InvalidCredentialsError extends ClientError {
  constructor(message: string) {
    super(message, 401, "INVALID_CREDENTIALS");
  }
}

export class JWTTokenInvalidError extends ClientError {
  constructor(message: string) {
    super(message, 401, "TOKEN_INVALID");
  }
}

export class JWTTokenExpiredError extends ClientError {
  constructor(message: string) {
    super(message, 401, "TOKEN_EXPIRED");
  }
}

export class ForbiddenError extends ClientError {
  constructor(message: string) {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends ClientError {
  constructor(message: string) {
    super(message, 404, "NOT_FOUND");
  }
}

export class ConflictError extends ClientError {
  constructor(message: string) {
    super(message, 409, "CONFLICT");
  }
}
