
module.exports = {
    isNotLoginAuthenticated: function (req, res, next){
        if (req.isAuthenticated()){ // function from passport itself
            return next();
        }
        req.flash('error_msg', 'Silahkan Login untuk mengisi KRRS Online');
        res.redirect('/users/login');
    },

    isLoginAuthenticated : function(req,res,next){
        if (req.isAuthenticated()){
           return res.redirect('/mainPage')
        }
        next();
    },

}