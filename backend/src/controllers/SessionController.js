const User = require('../models/User.js')

module.exports = {
    async store(req,res) {
        const email = req.body.email
        const filter = { email }
        const dataToUpsert = { email }
        const user = await User.findOneAndUpdate(filter, dataToUpsert, {
            new: true,
            upsert: true
        })
        return res.json(user)
    }
}