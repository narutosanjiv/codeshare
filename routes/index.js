const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer')
const config = require('../config')
const transporter = nodemailer.createTransport(config.mailer)

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Code4Share - a platform for sharing code.' });
});

router.get('/about', (req, res) => {
  res.render('about', {title: 'Code4Share - a platform for sharing code.'})
})

router.route('/contact')
  .get((req, res, next) => {
    res.render('contact', {title: 'Code4Share - a platform for sharing code.'})
  })
  .post((req, res, next) => {
    req.checkBody('name', 'Empty name').notEmpty()
    req.checkBody('email', 'Invalid Email').isEmail()
    req.checkBody('message', 'Empty message').notEmpty()
    const errors = req.validationErrors()

    if(errors){
      res.render('contact', {
        title: 'Code4Share - a platform for sharing code.',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      })
    } else {

      const mailOptions = {
        from: 'narutosanjiv@gmail.com',
        to: 'narutosanjiv@gmail.com',
        subject: 'You got a new message from visitor  👄',
        text: req.body.message
      }

      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
          console.log(err.message)
        } else{
          res.render('thank', {title: 'Code4Share - a platform for sharing code.'})
        }
      })

    }
  })

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login your account' })
})

router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Register a new account' })
})


module.exports = router;
