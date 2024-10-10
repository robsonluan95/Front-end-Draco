export class AuthTokenError extends Error{
    constructor(){
        super("Invalid or missing auth token");
    }
}