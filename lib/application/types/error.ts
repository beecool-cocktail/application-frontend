export class NetworkIssueError extends Error {
  constructor(cause: Error) {
    super('Network Issue Error', { cause })
    this.name = this.constructor.name
  }
}

export class RequestSetupError extends Error {
  constructor(cause: Error) {
    super('Error occurred duration request setup', { cause })
    this.name = this.constructor.name
  }
}

export class UnauthorizedError extends Error {
  constructor(cause: Error) {
    super('Invalid or expired token', { cause })
    this.name = this.constructor.name
  }
}

export class HttpStatusError extends Error {
  constructor(public code: number, message: string, cause: Error) {
    super(`${String(code)} ${message}`, { cause })
    this.name = this.constructor.name
  }
}

export class ResponseCodeError extends Error {
  constructor(
    public code: string,
    message: string | undefined,
    cause: unknown
  ) {
    super(message || code, { cause })
  }
}
