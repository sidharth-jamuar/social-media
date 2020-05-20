const express= require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');// for body and req validation using express
const User= require('../../models/User');
const gravtar =require('gravatar');
const bcrypt=require('bcryptjs');

//register api so tht we can send data
// router.get('/',(req,res)=> res.send('user route'));

router.post('/',[
    check('name','the name is required').not().isEmpty(),
    check('email','please include valid email').isEmail(),
    check('password','enter password os min 6 characters').isLength({ min:6 })
],
async (req,res)=> {
    console.log(req.body); //body.parsers )req.body)=? object of data that is going to come
    const errors=validationResult(req);//to validate response
    if(!errors.isEmpty()){
        //if there are errors
      return res.status(400).json({errors:errors.array()})
    }

    const {name,email,password} = req.body; //destructuring req.body for ease
    try{
        //see if user exists
        let user= await User.findOne({email});
         if(user){
            return  res.status(400).json({errors:[{msg:'User already exists'}]});
         }
       //user gravtar
        const avatar= gravtar.url(email,{
            //default size,rating,default img{user icon}
            s:'200',
            r:'pg',
            d:'mm'
        })
        //create instance of user {db User}
         user=new User({
             name,
             email,
             avatar,
             password
         });
        //hash password using brcypt
        //the more (10) the slower it gets.default s 10
        const salt=await bcrypt.genSalt(10);
        //hash passwd we created 
        user.password= await bcrypt.hash(password,salt);
        await user.save();

        //return json webtoken

        res.send('user registered');

    }catch(err){
     console.log(err.message);
     res.status(500).send('server error')

    }
}); 


module.exports = router;