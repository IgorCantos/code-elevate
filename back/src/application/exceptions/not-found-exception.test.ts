import HttpStatus from "@/infraestructure/utils/http-status";
import HttpError from "./not-found-exception";

describe("HttpError", () => {
  it("create an instance of HttpError with the correct message and statusCode", () => {
    const message = "Resource not found";
    const statusCode = HttpStatus.NOT_FOUND;

    const error = new HttpError(message, statusCode);

    expect(error).toBeInstanceOf(HttpError);
    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
    expect(error.name).toBe("HttpError");
  });
});
