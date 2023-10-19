const router = require("express").Router() ;
const User = require("../Models/User")  ;
const bcrypt = require("bcrypt")                // PASSWORD HASHING LIBRERY


 

// REGISTER 

router.post("/register",async(req,res)=> {
    try{


        // console.log({
        //     "username" : req.body.username ,
        //     "password" : req.body.password
        // }) ;

        // FOR PASSWORD HASHING 

        const saltRounds = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,saltRounds) ;

        // CREATING NEW USER 

        const newUser =  new User({
            username : req.body.username , 
            email : req.body.email , 
            password : hashPassword, 
        }) ;



        const user =  await newUser.save() ;
        res.status(200).json(user) ;

    }   catch(err){
        res.status(500).json(err) ;
    }
})


// LOGIN

router.post("/login",async (req,res)=>{
    try{

        const user = await User.findOne({username: req.body.username}) 

        // error on writing inline condition -->> !user &&  res.status(400).json("Wrong Credentials !"

        if(!user ) {
            return res.status(400).json("Wrong Credentials !")
        }

        // error on writing inline condition -->> !ValidPassword &&  res.status(400).json("Wrong Credentials !"

        const ValidPassword = await bcrypt.compareSync(req.body.password,user.password) ;

        if(!ValidPassword){
           return res.status(400).json(ValidPassword) 
        }

        // !ValidPassword &&   res.status(400).json(ValidPassword) 

        const {password , ...others} = user._doc ;          // SEND LOGIN DATA TO USER EXCEPT PASSWORD
        return res.status(200).json(user);


        

    }   catch(err){
        return res.status(500).json(err) ;
    }
})



module.exports = router ;  