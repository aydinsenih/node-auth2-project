const router = require("express").Router();
const User = require("./user-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

module.exports = router;
