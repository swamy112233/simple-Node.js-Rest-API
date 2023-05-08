 

const mongoose=require('mongoose');
const User = mongoose.Schema({
    user:{
         

    
    Firstname:{
        type:String,
        required:true

    },
    Lastname:{
        type:String,
        required:true

    },

   city:{
    type:String,
    required:true

},

   company:{
    type:String,
    required:true

},
data:{
    type:Date,
    default : Date.now
}
    }

})
module.exports=mongoose.model("user ",User)