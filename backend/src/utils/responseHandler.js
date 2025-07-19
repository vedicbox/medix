import MESSAGES from "./message.js";
import STATUS_CODES from "./statusCodes.js";

class Response {
  constructor(status, message = null, data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  toJSON() {
    return {
      status: this.status,
      msg: this.message,
      payload: this.data,
    };
  }
}

export class ServiceResponse extends Response {
  // For use in service layer
}

export class HttpHandler {
  static send(res, response) {
    // If response has a status property, use it; otherwise default to 200
    const status = response.status || STATUS_CODES.OK;
    // If response has toJSON(), use it; otherwise use the object directly
    const data = typeof response.toJSON === 'function' ? response.toJSON() : response;
    return res.status(status).json(data);
  }

  static error(res, error, customMessage = MESSAGES.GENERIC_ERROR, status = STATUS_CODES.INTERNAL_SERVER_ERROR) {
    console.error("API Error:", error); // Log the full error

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(STATUS_CODES.CONFLICT).json({
        status: STATUS_CODES.CONFLICT,
        msg: MESSAGES.RESOURCE_EXISTS,
        payload: {
          error: customMessage,
          details: "Duplicate key violation",
        },
      });
    }

    // Handle Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = {};
      for (const [field, errObj] of Object.entries(error.errors)) {
        messages[field] = errObj.message;
      }

      return res.status(STATUS_CODES.BAD_REQUEST).json({
        status: STATUS_CODES.BAD_REQUEST,
        msg: MESSAGES.VALIDATION_FAILED,
        payload: {
          error: customMessage,
          details: messages,
        },
      });
    }

    // Default error response (with both custom message and error details)
    return res.status(status).json({
      status: status,
      msg: customMessage,
      payload: {
        error: error.message, // Original error message
        details: error.stack?.split("\n")[0], // First line of stack trace
      },
    });
  }
}

