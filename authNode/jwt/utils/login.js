const User = require("../modal/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const { email, password } = req.query
        let registeredUser = await User.findOne({ email })
        console.log(await  bcrypt.compare(password, registeredUser.password));
        if (registeredUser && (await bcrypt.compare(password, registeredUser.password))) {
            const token = jwt.sign({ userId: registeredUser._id, email }, process.env.secret, { expiresIn: "5h" })
            // console.log(token);
            res.status(200).send(token)
        } else {
            res.status(409).send("false")
        }
    }
    catch (err) {
        console.log(err,"i am catch err")
        res.status(409).send("login in invalid")
    }

}

module.exports=login