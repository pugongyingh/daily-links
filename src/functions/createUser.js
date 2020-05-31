// @ts-check
const { app, registerDefaultErrorHandler } = require('./bootstrap/app');
const awsServerlessExpress = require('aws-serverless-express');
const faunadb = require('faunadb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const q = faunadb.query;

const client = new faunadb.Client({
  secret:`fnADs5ccBTACCm5kbmjncetPrz6o9t2bqV5gQvZl`,
});





exports.handler = async (event,context,callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
             let body;
        try{
                body = JSON.parse(event.body);
        }catch(ex){
                body = event.body;
        }

        let username = body.username;
        let password = body.password;
   // const { username, password } = event.body;

    /** @type { { data: { username: string, password: string } } }  */
   // const user = await client.query(
  //    q.Get(q.Match(q.Index('users_by_username'), username)),
 //   );
 //   if (user == null) {
    /** @type { { data: { username: string } } }  */
    const user = await client.query(
      q.Create(q.Collection('users'), {
        data: { username, password: await bcrypt.hash(password, 10) },
      }),
    );
 //   }
  var token = jwt.sign({name: username}, 'shhhhh');  
       //callback(null,token)
  var ttt =   ""  ;
jwt.verify(token, 'shhhhh', function (err, decoded) {
    if (!err){
          ttt=decoded.name;  //会输出123，如果过了60秒，则有错误。
     }
})      
      
  return {
    status: 200,
    type: 'text/html; charset=utf8',
    body: '<h1>Hello world44!' + ttt +'</h1>',
    cors: true,
  }      
    } catch (err) { 
        const error = {
            status: err.status || 500,
            message: err.message || "Internal server error."
        }
        callback(JSON.stringify(error));
    } 
}
