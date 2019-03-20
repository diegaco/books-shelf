const {User} = require('./../models/user');

let auth = (req, res, next) => {
  let { auth } = req.cookies;

  User.findByToken(auth, (err, user) => {
    if (err) throw err;
    if(!user) return res.status(401).send({isAuth: false})
    req.token = auth;
    req.user = user;
    next();
  })
}

module.exports = { auth };