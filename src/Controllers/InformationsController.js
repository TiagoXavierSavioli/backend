const User = require('../Models/User/User')
const Information = require('../Models/User/Information')

module.exports = {
    async editProfile(req, res) {
        const { user_id } = req.params
        const { phone, email, birthday, username, description } = req.body

        const userInformation = await Information.findOne({
            user_id: user_id
        })

        const user = await User.findOne({
            id: user_id
        })

        if(userInformation && user){

            const selectorI = {
                where: {user_id: user_id}
            }
            const valuesI = {
                    phone: phone,
                    email : email,
                    birthday: birthday                 
            }
            const informationUpdate = await Information.update(valuesI, selectorI)

            const selectorU = {
                where: {id: user_id}
            }
            const valuesU = {
                username: username,
                description: description             
            }
            const userUpdate = await User.update(valuesU, selectorU)
            return res.status(200).json(userUpdate, informationUpdate)
        }else{ throw new Error('This information not exists')}
        
        return res.status(200).json(userInformation)
    }
}