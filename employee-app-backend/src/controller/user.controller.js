const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const saltRounds = 5;

//Register a User | guest
const createUser = async (req, res) => {
    if (req.body) {
        let email = req.body.email;
        await User.findOne({ email: email }, async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (!result) {

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, async function (err, hash) {
                            req.body.password = hash;

                            const user = new User(req.body);
                            await user.save()
                                .then(data => {
                                    console.log(data);
                                    res.status(200).send(data);
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.send(err);
                                });
                        });
                    });
                } else {
                    console.log("User Already Exist");
                    res.send({ message: "User Already Exist" });
                }
            }
        });
    }
}

//login Validate
const validateUser = async (req, res) => {
    console.log(req);
    await User.findOne({ email: req.body.email }, (err, users) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            if (users == null) return res.status(500).send("User Not Found");
            bcrypt.compare(req.body.password, users.password, function (err, result) {
                if (result) {
                    console.log(users);
                    res.send(users);
                } else {
                    console.log("Credentials Does Not Matched");
                    res.status(500).send("Credentials Does Not Matched");
                }
            });

        }
    });
}


//get All User
const getAllUser = async (req, res) => {
    await User.find()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}
//get User by ID
const getUserById = async (req, res) => {
    await User.find({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
};





module.exports = {
    createUser,
    getAllUser,
    validateUser
}