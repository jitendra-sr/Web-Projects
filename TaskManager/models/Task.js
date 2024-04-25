const mongoose=require('mongoose');
// const taskSchema=new mongoose.Schema({
//     name: String,
//     completed: Boolean
// });
// // Now if we pass any third property in our post method to save in db, then it will be ignored because of schema. If we don't define the schema then different type of document can be stored.

const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        // maxlength:20
        maxlength:[20,'length must be 20']
    },
    // completed: Boolean 
    completed:{
        type:Boolean,
        default:false
    }
})





module.exports=mongoose.model('Task',taskSchema);
// taskSchema defines the structure of the data, and model provide the interface to play with data using schema

// Now we create the instance of Task and pass the data into it.