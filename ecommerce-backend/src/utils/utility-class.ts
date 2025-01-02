// It defines a custom error-handling class, ErrorHandler, which extends the built-in Error class in JavaScript. 
// This class is tailored for use in scenarios where you need to handle errors with a custom message and an associated HTTP status code.
// ErrorHandler is a subclass of the native Error class.
// By extending Error, it inherits properties like name and stack.
class ErrorHandler extends Error {
    constructor(public message: string, public statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
}
  
export default ErrorHandler;