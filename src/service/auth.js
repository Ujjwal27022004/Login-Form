const SessionIDtoUserMap = new Map();

function setUser(id,user){
    SessionIDtoUserMap.set(id,user)
}

function getUser(id){
    return SessionIDtoUserMap.get(id);
}


module.exports={
    setUser,
    getUser
}