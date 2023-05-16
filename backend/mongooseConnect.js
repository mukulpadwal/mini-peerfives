const mongoose = require("mongoose");

async function connect(){
    await mongoose.connect("mongodb://127.0.0.1:27017/miniDB")
    .then(() => console.log("Connected Successfully!!!"))
    .catch((e) => console.error(e));
}

module.exports = connect;