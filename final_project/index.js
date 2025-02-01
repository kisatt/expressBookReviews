const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
});
 
const PORT =5500;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));

// cd expressBookReviews/final_project/
// curl localhost:5500/
// curl localhost:5500/isbn/1
// curl localhost:5500/author/Chinua%20Achebe
// curl localhost:5500/title/Fairy%20tales
// curl localhost:5500/review/1
// curl --request POST "http://localhost:5500/register?username=Kisa&password=Hello"
// curl --request POST "http://localhost:5500/customer/login?username=Kisa&password=Hello"
// curl --request PUT  "http://localhost:5500/customer/auth/review/1?review=OK"
// curl --request DELETE "http://localhost:5500/customer/auth/review/1"