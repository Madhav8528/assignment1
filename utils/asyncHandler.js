const asyncHandler = (handler) => {
    return (res, req, next) => {
        Promise.resolve(handler(res, req, next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}