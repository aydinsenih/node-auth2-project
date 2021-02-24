const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const UserRouter = require("./user/user-router");
const AuthRouter = require("./auth/auth-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", UserRouter);
server.use("/api", AuthRouter);

server.get("/", (req, res) => {
    res.json({ data: "User API" });
});

server.get("/*", (req, res) => {
    res.json({ data: "Wrong way" });
});

module.exports = server;
