const db = require("../../database/connection.js");

function find() {
    return db("user");
}

async function add(user) {
    const [id] = await db("user").insert(user);
    return findById(id);
}

function findById(id) {
    return db("user").where({ id });
}

function findBy(filter) {
    return db("user").where(filter).first();
}

module.exports = { find, add, findById, findBy };
