 import jwt from 'jsonwebtoken';

// User does action in FE --> auth middleware for permission -> backend controller

 const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        // Check if token is from Google or us
        const isCustomToken = token.length < 500;

        let decodedData;

        if (token && isCustomToken) {
            decodedData = jwt.verify(token, "test");
            req.userId = decodedData?.id;

        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();

    } catch(error) {
        console.log(`Error: ${error}`);
    }
 };

export default auth;