const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const User = require("../user/user-model");
const { isValid } = require("../user/user-service.js");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const hash = bcryptjs.hashSync(
            credentials.password,
            parseInt(process.env.BCRYPT_ROUNDS)
        );
        credentials.password = hash;

        User.add(credentials)
            .then((users) => {
                res.status(201).json(users);
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message:
                "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        User.findBy({ username: username })
            .then((user) => {
                console.log(user);
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = createToken(user);

                    res.status(200).json({
                        message: "Welcome" + user.username,
                        token,
                    });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message:
                "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

function createToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    };
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, process.env.SECRET, options);
}
module.exports = router;
