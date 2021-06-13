const User = require('../Models/User');
const bcrypt = require('bcrypt')

module.exports = {
    async login(req, res) {
        const { username, password } = req.body

        try{
            const validUsername = await User.findOne({
                username: username
            })
            if(!validUsername) {
                return res.status(400).json({message: 'user does not exist'})
            }

            const validPassword = await bcrypt.compare(password, validUsername.password)
            if(!validPassword) {
                return res.status(400).json({message: 'Wrong password'})
            }
            
            const loggedIn = validUsername
            console.log(loggedIn)
            return res.status(200).json({message: 'success', data: loggedIn}, res.send(loggedIn))


            
        } catch(err) {
            return res.status(400).json(err)
        }
    },
}