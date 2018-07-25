'use strict';

var express = require('express');
const sgMail = require('@sendgrid/mail');
var router = express.Router();

var data = require('./data');
var user = 'Dev krishan';
// const SENDGRID_API_KEY="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";

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
  nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: 'melfocua5bmxr6um@ethereal.email', // generated ethereal user
              pass: 'Q2j47vhsPuJ5byaJDf' // generated ethereal password
          }
      });
      let mailOptions = {
          from: req.query.email_id, // sender address
          to: 'devkrishnalamror@gmail.com', // list of receivers
          subject: req.query.subject, // Subject line
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



module.exports = router;
