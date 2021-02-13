const express = require('express');
const router = express.Router();

const User = require('../models/user-model')

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


// GET /api/checkuser

router.get("/checkuser", (req, res, next) => {
  if (req.session.currentUser) {
    res.json({ userDoc: req.session.currentUser });
  } else {
    res.json({ userDoc: null });
  }
});

// /api/user-signup

router.post('/user-signup', (req, res, next) => {

  const pass = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(pass, salt);

  User.create({
    username: req.body.username,
    password: hashPass
  }).then((createdUser) => {
    res.json(createdUser) // this is only one different from module 2 projects
  })
});


router.put('/user-edit', (req, res, next) => {

  const pass = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(pass, salt);

  User.create({
    username: req.body.username,
    password: hashPass
  }).then((createdUser) => {
    res.json(createdUser) // this is only one different from module 2 projects
  })
});


router.post('/login', (req, res, next) => {

  User.findOne({ username: req.body.username }).then((user) => {
    // compareSync does these two lines and then compares with user.password (which is a hash)
    // const salt = bcrypt.genSaltSync(bcryptSalt);
    // const hashPass = bcrypt.hashSync(password, salt);
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.currentUser = user;
      res.json(user)
    }
  })

});

router.post('/logout', (req, res) => {
  req.session.destroy()
  res.json({
    msg: 'logged out success'
  })
})

module.exports = router;