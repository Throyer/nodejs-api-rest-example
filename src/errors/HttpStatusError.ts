import { HttpStatus } from "../shared/HttpStatus";

export default class HttpStatusError extends Error {
    status: HttpStatus;
    constructor(message: string, status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
        super(message)
        this.status = status;
        Object.setPrototypeOf(this, HttpStatusError.prototype);
    }
}