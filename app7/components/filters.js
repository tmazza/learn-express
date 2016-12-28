exports.mustLogin = function(req, res, next) {
    next();
  // if (req.session.user) {
  //   next();
  // } else {
  //   req.session.error = 'Identifique-se!';
  //   res.redirect('/login');
  // }
}

