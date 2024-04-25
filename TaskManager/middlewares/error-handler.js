const {CustomAPIError}=require('../errors/custom-error');
// We have imported the extended error class to identify whether the error generated is instance of custom error or some other error type.
const errorHandlerMiddleware=(err,req,res,next)=>{
    // return res.status(500).json({error:err});
    
    // const st=(err.status)?err.status:500;
    // return res.status(st).json({error:err.message});
    
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({error:err.message});
    }
    return res.status(500).json({error:err.message});
}
module.exports=errorHandlerMiddleware;