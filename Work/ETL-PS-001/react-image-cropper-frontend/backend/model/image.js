const mongoose=require('mongoose')
const ImageSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    croppedImage:{
        type:Buffer,
        required:true
    }
})

const Data=mongoose.model("data",ImageSchema)

module.exports=Data