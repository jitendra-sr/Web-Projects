const asyncWrapper=(fn)=>{
    return async (req,res,next)=>{
        try {
            await fn(req,res,next);
        } catch (error) {
            next(error) 
            // Default error handler will work untill we don't setup our own custom error-handler middleware
        }
    }
}
module.exports=asyncWrapper;