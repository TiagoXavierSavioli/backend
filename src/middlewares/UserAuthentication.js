const UserAuthentication = (req, res, next) => {
    const userExists = true
    if(userExists){
        return next()
    }
    return res.status(401).json({
        error: 'user do not exists'
    })        
}
module.exports = UserAuthentication