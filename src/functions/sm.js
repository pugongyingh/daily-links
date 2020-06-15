


//require('dotenv').config()
//const result = require('dotenv').config()
const nodemailer = require('nodemailer');

const mailUtils = require("../mail");
export async function handler(event, context, callback){
 // const { user, pass} = process.env
 const  body = JSON.parse(event.body);
    var min = "10000";
   // const max = 99999;
   // const num = Math.floor(Math.random() * (max - min + 1)) + min;
var  mm = process.env.mm;
var  tmp;
 var  sub;
  var  ss = parseInt(body.send);
  var  tt = parseInt(body.tmp);
  //var  str = body.name;
 //             if(str.includes("先生")||str.includes("小姐")||str.includes("女士")||str.includes("经理")||str.includes("老师"))
  //            {
  //            }else {
//body.name = str + "经理";
//    };

     mm =mm.split('!')[ss];

 
   switch (tt) {
    case 1:
      tmp = mailUtils.getMailBody1(body);
      break;
    case 2:
      tmp = mailUtils.getMailBody2(body);
      break;
    case 3:
      tmp = mailUtils.getMailBody3(body);
      break;
    case 4:
      tmp = mailUtils.getMailBody4(body);
      break;
    case 5:
      tmp = mailUtils.getMailBody5(body);
      break;
    default:
      tmp = mailUtils.getMailBody1(body);
  }
   switch (tt) {
    case 1:
      sub = mailUtils.getMailSub1(body);
      break;
    case 2:
      sub = mailUtils.getMailSub2(body);
      break;
    case 3:
      sub = mailUtils.getMailSub3(body);
      break;
    case 4:
      sub = mailUtils.getMailSub4(body);
      break;
    case 5:
      sub = mailUtils.getMailSub5(body);
      break;
    default:
      sub = mailUtils.getMailSub1(body);
  }
 var  mmm=mm.split(';')[0];
 var  pp=mm.split(';')[1];
 var  sss = mmm.split('@')[1];
 var  hh;
           if(sss == "sina.com.cn")
          {
             hh="smtp.sina.com";
          }
          else
          {
              hh="smtp."+ sss;
          }
    const transport = nodemailer.createTransport({
    host: hh, // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: mmm,
        pass: pp
    }
    });

    //const { email }  = JSON.parse(event.body) 
    let mailOptions = {
      from: mmm,
      to: `${body.email}`,
      subject: sub,
      text: tmp,
  };

try{
 //min="777";
  let value = await transport.sendMail(mailOptions);
  //transport.sendMail(mailOptions);
  //console.log(value, mailOptions )
 min= JSON.stringify(value.response);
 //min= JSON.stringify(body.name);
// min=process.env.yyy;
  return {
    statusCode: 200,
     headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
    body: min,
    cors: true
  }
}catch(err){
//console.log(err)
  return {
    statusCode: 400,
     headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
    body: "err",
    cors: true
  };
}

}
