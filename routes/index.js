'use strict';

var express = require('express');
const sgMail = require('@sendgrid/mail');
var router = express.Router();

var data = require('./data');
var user = 'Dev krishan';
const SENDGRID_API_KEY="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";

/* GET home page. */
router.get('/devkrishan', function(req, res, next) {
  res.render('devkrishan', data['devkrishan']);
  user = 'Dev krishan';
});

router.get('/ramjeet', function(req, res, next) {
  res.render('ramjeet', { title: 'Ramjeet Saran\'s Resume' });
  user = 'Ramjeet Saran';  
});

router.get('/send', function(req, res, next) {
  // console.log("API key : "+process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: 'devkrishnalamror@gmail.com',
    from: req.query.email_id,
    subject: req.query.subject,
    html: '<h4>Hello '+user+',</h4>'+
            '<div class="wr_margin_right_20">'+req.query.message+'</div>'+
            '<br><div>Thanks & Regards</div>'+
            '<strong>'+req.query.name+'</strong>'
  };
  sgMail.send(msg);
  res.end("sent");
});



module.exports = router;
