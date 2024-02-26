const mongoose = require("mongoose");


const UserDetailsSchema = new mongoose.Schema(
    {
        ModelName:String,
        Color:String,
        HeadphoneType:String,
        Price:String
    },
    {
        collection:"login"
    });

    module.exports = mongoose.model("login",UserDetailsSchema);
