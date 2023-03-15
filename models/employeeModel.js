const mongoose=require('mongoose')

let employeeSchema= new mongoose.Schema({
    FirstName: {
        type:String,
        required:true
    },
    LastName: {
        type:String,
        required:true
    },
    Email: {
        type:String,
        required:true
    }
},
{
    collection:"Employee"
}
)
module.exports=mongoose.model("employee",employeeSchema)