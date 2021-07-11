isAdmin = async (req, next, done) => {
    const user = req.user;
    if(!user) {
        done(null, false)
    }

    if(user.role == "admin"){
        next();
        return;
    }
    else{
        done(null,user)
    }  
};

module.exports = isAdmin;