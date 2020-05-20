const express =require('express');
const connectDB= require('./config/db');
var bodyParser = require('body-parser');
const app=express();
//connect databse
connectDB();  
//very imp :always define middleware and then the routes
app.use(express.json({extended:false}))

//define routes
app.use('/api/users', require('./routes/api/users')); //gives access to '/' in users.js
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

//bodyParser-earlier :bodyParserr.json()
//extended:false is to dget the data inside req.body
  
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use(bodyParser.urlencoded({
//     extended: true
//   }))

app.get('/',(req,res)=> res.send('api running'));


const PORT =process.env.PORT || 3004;

app.listen(PORT,()=>console.log(`Server started on ${PORT}`));
