const router = require("express").Router() ;
const User = require("../Models/User")  ;
const bcrypt = require("bcrypt")                // PASSWORD HASHING LIBRERY
const post = require("../Models/Post")



// UPDATE 

router.put("/:id",async(req,res)=> {

    if(req.body.userId === req.params.id){

        if(req.body.password){
            const saltRounds = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,saltRounds) ;
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body ,
            },{new:true});

            res.status(200).json(updatedUser) ;
        }   catch(err){
            res.status(500).json(err) ;
        }
    } else{
        res.status(401).json("you can update your account only !");
    }

})


// DELETE USER

router.delete("/:id", async (req,res) =>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id) ;
            try{
                // delete all post of user 
                await post.deleteMany({username:user.username}) ;

                // delete user
                await User.findByIdAndDelete(req.params.id) ;
                res.status(200).json("Account has been deleted...") ;

            } catch (err){
                res.status(500).json(err) ;
            }

        }catch(err){
            res.status(404).json("User not found") ;
        }
        
    } else{
        res.status(401).json("You can  only delete your account...");
    }
});


// get user

router.get("/:id" , async(req,res)=>{
    try{
        const user = await User.findById(req.params.id) ;

        const {password, ...others} = user._doc ;
        res.status(200).json(others) ;
    } catch(err){
        res.status(500).json(err) ;
    }
})


module.exports = router ;  