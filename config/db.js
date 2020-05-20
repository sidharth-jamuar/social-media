const mongoose = require('mongoose');
// const config=require ('config');
const db= require('./default');


const connectDB =async () =>{
    try{       
         console.log(db)
await mongoose.connect(db.mongoURI,{
    useNewUrlParser :true,
    useUnifiedTopology:true,
    useCreateIndex:true 
});
console.log('mongodb connected');
    }
    catch(err){
console.error("error");
process.exit(1); //we  want to exit the appl crash
}
}


module.exports = connectDB;




//npm run server