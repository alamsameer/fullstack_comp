const User = require("../modal/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register =async (req, res) => {
    try {
        const { first_name, last_name, bio, password, email } = req.query
        if (!first_name && last_name && password && email) {
            console.log(" i am here invalid one ");
            res.sendStatus(400)
        }
        else {

            // get user if exist
            const oldUser = await User.findOne({ email })
            console.log(oldUser, "i am old one")
            // // check wheater the user's email exist
            if (oldUser) {
                res.sendStatus(409)
            }

            else {
                let hash = await bcrypt.hash(password, 10)
                // create a new user  if not 
                const newUser = await User.create({
                    first_name,
                    last_name,
                    email: email.toLowerCase(), // sanitize: convert email to lowercase
                    password: hash

                })
                // // create jwt  token 
                const token = jwt.sign({ userId: newUser._id, email }, process.env.secret, { expiresIn: "5h" })
                // // send to client the data
                console.log(newUser, token)
                res.json(token)
            }
        }


    }
    catch (err) {
        console.log(err);
    }
}

module.exports=register