const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

exports.verify = (req, res, next) => {
    const token = req.headers.authorization

   if (!token) res.status(403).json({error: "please provide a token"})
    else {
        // res.send("xxxxxxxxxxxxx")
        jwt.verify(token, tokenSecret, (err,value)=> {
            if(err){
                console.log(err)
                res.status(500).json({error: 'failed to authenticate token'})
            }else{
                next()
            }

            /*
            if (err) res.status(300).json({error: 'failed to authenticate token'})
            //req.user = value.data
            next()
            */
        }
        )
    }
};


