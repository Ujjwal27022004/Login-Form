const {getUser} = require("../service/auth")

async function restrictTologgedinUserOnly(req,res,next){
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/");
    const user = getUser(userUid)

    if(!user) return res.redirect("");

    req.user = user;
    next();
}

module.exports = {
    restrictTologgedinUserOnly
}