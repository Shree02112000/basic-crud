const jwt=require('jsonwebtoken')

const validate=(req,res)=>{
    try{
            let token=req.headers.authorization.split(' ')[1];
            const isValid = token?true:false;
            const credentials =  {token} ;
            const artifacts=jwt.verify(token,'verySecretpass');
            return { isValid, credentials, artifacts };
    }
    catch(error)
    {
         return error;
        
    }
}


module.exports=validate