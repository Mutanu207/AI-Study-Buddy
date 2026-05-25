import jwt from 'jsonwebtoken';
export const verifyToken= (req,res,next) => {
    try{
    const authHeader= req.headers.authorization;//we need to get the token from the header sent from frontend//
    if(!authHeader)
        { return res.status(401).json({message:"No token provided"});
    } 
    const token= authHeader.split(" ")[1]; //we need to split the token from the header and get the token value by converting the string to an array//
    const decoded= jwt.verify(token, process.env.JWT_SECRET); //we need to verify the token using the secret key if its for my website//
    req.user= decoded; //we need to attach the decoded token that had id and email to req, so that i can use req.user.id//
    next(); //we need to call the next middleware function//
}
catch(error){
    return res.status(401).json({message:"Invalid token"}); //if the token is invalid we need to send an error message//
}};