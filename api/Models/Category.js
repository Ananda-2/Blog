const mongoose = require('mongoose') 

const CategorySchema = new mongoose.Schema({

    name:{
        type:Array,
        require:true,
    }
},
    { tymestamps:true}
);


module.exports = mongoose.model("Category",CategorySchema) ;