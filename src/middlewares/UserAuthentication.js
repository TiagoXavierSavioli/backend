const User = require('../Models/User.js');

async function UserAuthentication (req, res, next) {
    
    const userFind = await User.findById({_id: req.params.you})

    if(userFind){
        return next()
    }else{
        return res.status(401).json({ error: 'user do not exists' })    
    }
        
}
module.exports = UserAuthentication