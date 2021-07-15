isAdmin = () => { 
    return (req, res, next, done)=>{
        const user = req.user;
        if(!user) {
            done(null, false)
        }

        if(user.role == "admin"){
             next();
        }
        else{
            done(null,user)
        }  
    }
};

module.exports = isAdmin;