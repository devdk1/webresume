'use strict';

var express = require('express');
// const sgMail = require('@sendgrid/mail');
var router = express.Router();

var data = require('./data');
var user = 'Dev krishan';
// const SENDGRID_API_KEY="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";

router.get('/', function(req, res, next) {
    res.redirect('/devkrishan');    
});
/* GET home page. */
router.get('/devkrishan', function(req, res, next) {
  res.render('devkrishan', data['devkrishan']);
  user = 'Dev krishan';
});

router.get('/ramjeet', function(req, res, next) {
  res.render('ramjeet', { title: 'Ramjeet Saran\'s Resume' });
  user = 'Ramjeet Saran';  
});

const nodemailer = require('nodemailer');
router.get('/send', function(req, res, next) {
  // console.log("API key : "+sgMail);
  // sgMail.setApiKey(SENDGRID_API_KEY);
  // const msg = {
  //   to: 'devkrishnalamror@gmail.com',
  //   from: req.query.email_id,
  //   subject: req.query.subject,
  //   html: '<h4>Hello '+user+',</h4>'+
  //           '<div class="wr_margin_right_20">'+req.query.message+'</div>'+
  //           '<br><div>Thanks & Regards</div>'+
  //           '<strong>'+req.query.name+'</strong>'
  // };
  // sgMail.send(msg);
  // console.log(sgMail.send(msg));
  // res.end("sent");
  console.log(process.env.GMAIL_PWD);
  nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 587, false for other ports
          auth: {
              user: 'devkrishnalamror@gmail.com', 
              pass: process.env.GMAIL_PWD
          }
      });
      let mailOptions = {
          from: req.query.name+"  <"+req.query.email_id+">", // sender address
          to: 'devkrishnalamror@gmail.com', // list of receivers
          subject: req.query.subject+" from email "+req.query.email_id, // Subject line
          text: 'Hello Dev', // plain text body
          html: '<h4>Hello '+user+',</h4>'+
                    '<div class="wr_margin_right_20">'+req.query.message+'</div>'+
                    '<br><div>Thanks & Regards</div>'+
                    '<strong>'+req.query.name+'</strong>' // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
      });
      res.end("sent");
  });
});
router.get('*', function(req, res){
    res.render('404', data['devkrishan']);
});
module.exports = router;