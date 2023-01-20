const User = require('../models/user');

module.exports.renderRegister = (req,res) => {
    res.render('users/register');
}

module.exports.register = async(req,res) => {
    try{
        const{email,username,password} = req.body;
        const user = new User({email,username});
        const registereduser = await User.register(user,password);
        req.login(registereduser, err => {
            if(err)return next(err);
            req.flash('success','Welcome to YelpCamp');
            res.redirect('/campgrounds');
        })
    }catch(e){
        req.flash('error', e.message);
        res.redirect('/register')
    }
    
}

module.exports.renderlogin = (req,res) => {
    res.render('users/login')
}

module.exports.login = (req,res) => {
    req.flash('success','welcome Back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res) => {
    req.logout(function(err) {
        if (err) { res.send(err); }
        req.flash('success', "GoodBye");
        res.redirect('/campgrounds');
      });
}