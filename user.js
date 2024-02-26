const mongoose = require("mongoose");


const UserDetailsSchema = new mongoose.Schema(
    {
        username:String,
        password:String
    },
    {
        collection:"login"
    });

    module.exports = mongoose.model("login",UserDetailsSchema);