const mongoose=require('mongoose')

let DepartmentSchema= new mongoose.Schema({
    Department: {
        type:String,
        required:true
    }
    
},
{
    collection:"Department"
}
)
module.exports=mongoose.model("department",DepartmentSchema)