const router = require("express").Router() ;
const User = require("../Models/User")  ;
const bcrypt = require("bcrypt")                // PASSWORD HASHING LIBRERY
const Post = require("../Models/Post");



// CREATE POST 

router.post("/",async(req,res)=> {

    const newpost = new Post(req.body) ;

    try{
        const savePost = await newpost.save() ;
        res.status(200).json(savePost) ;

    }catch(err){
        res.status(500).json(err) ;
    }

})


// UPDATE POST

router.put("/:id", async (req,res) =>{

        try{
            const post = await Post.findById(req.params.id) ;

            if(post.username === req.body.username){

                try{

                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                        $set:req.body 
                    },{new:true})

                    res.status(200).json(updatedPost)

                }catch(err){
                    res.status(500).json(err) ;
                }

            }else{
                res.status(404).json("You can update your post only !")
            }

            
            

        }catch(err){
            res.status(500).json(err) ;
        }
        
});

// DELETE POST

router.delete("/:id", async (req,res) =>{

        try{
            const post = await Post.findById(req.params.id) ;

            if(post.username === req.body.username){

                try{

                    const deletedPost = await Post.findByIdAndDelete(req.params.id)

                    res.status(200).json("Post deleted Sucessfully")

                }catch(err){
                    res.status(500).json(err) ;
                }

            }else{
                res.status(404).json("You can delete your post only !")
            }

            
            

        }catch(err){
            res.status(500).json(err) ;
        }
        
});


// get post

router.get("/:id" , async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id) ;
        res.status(200).json(post) ;
    } catch(err){
        res.status(500).json(err) ;
    }
})


// get all selected 

router.get("/" , async(req,res)=>{
    const username = req.query.user ;
    const cat = req.query.cat ;
    try{

        let posts ;

        if(username){
            posts = await Post.find({username}) ;
        }
        else if (cat){
            posts = await Post.find({cat : {
                $in : [cat],
            },
        });
        } else {
            posts =  await Post.find() ;
        }
        res.status(200).json(posts) ;

    } catch(err){
        res.status(500).json(err) ;
    }
})


module.exports = router ;  