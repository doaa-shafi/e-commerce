class ApiError extends Error{
    constructor(message){
        super(message)
        this.statusCode=500
    }
}

class ValidationError extends Error{
    constructor(message){
        super(message)
        this.statusCode=400
    }
}
class AuthenticationError extends Error{
    constructor(message){
        super(message)
        this.statusCode=401
    }
}
class AuthorizationError extends Error{
    constructor(message){
        super(message)
        this.statusCode=403
    }
}
class NotFoundError extends Error{
    constructor(message){
        super(message)
        this.statusCode=404
    }
}

module.exports={
    ApiError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError
}