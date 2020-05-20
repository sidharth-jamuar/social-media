const express= require('express');
const router=express.Router();

router.get('/',(req,res)=> res.send('auth route')); //public route 


module.exports= router;