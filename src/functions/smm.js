//require('dotenv').config()
//const result = require('dotenv').config()
const nodemailer = require('nodemailer');
const faunadb = require('faunadb');
const jwt = require('jsonwebtoken');
const q = faunadb.query;

const client = new faunadb.Client({
  secret: `fnADs5ccBTACCm5kbmjncetPrz6o9t2bqV5gQvZl`,
});
export async function handler(event, context, callback){
 // const { user, pass} = process.env
 const  body = JSON.parse(event.body);
    var min = "10000";
   // const max = 99999;
   // const num = Math.floor(Math.random() * (max - min + 1)) + min;
var  mm = process.env.mm;
 var username = body.email;
var  tmp ="8888";
 var  sub = "777“;
  var  ss = parseInt(body.send);
  var  tt = parseInt(body.tmp);
  //var  str = body.name;
 //             if(str.includes("先生")||str.includes("小姐")||str.includes("女士")||str.includes("经理")||str.includes("老师"))
  //            {
  //            }else {
//body.name = str + "经理";
//    };

     mm =mm.split('!')[ss];



 
    const user = await client.query(
      q.Get(q.Match(q.Index('users_by_username'), username)),
    );

 
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
          };
    const transport = nodemailer.createTransport({
    host: hh, // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: mmm,
        pass: pp
    }
    });

 
     const token = jwt.sign(
      {
        username: user.data.username,
      },
      'secret',
      {
        expiresIn: '1h',
      },
    );
const url = `http://127.0.0.1:8076/dy/change-password.html?` + token;
    //const { email }  = JSON.parse(event.body) 
    let mailOptions = {
      from: mmm,
      to: username,
      subject: sub,
      html: `Reset link: <a href="http://127.0.0.1:8076/dy/change-password.html?token=${token}">http://127.0.0.1:8076/dy/change-password.html?token=${token}</a>`,
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
