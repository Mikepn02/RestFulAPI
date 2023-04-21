const mongoose = require('mongoose')
const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.Database,{
            useNewurlparser: true,
            useUnifiedTopology:true
        })
        .then(() => console.log('connected to mongodb successfully....'))
    }catch(err){
       console.log(err);
       process.exit(1);
    }
}
module.exports = connectDB