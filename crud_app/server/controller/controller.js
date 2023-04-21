const Userdb = require('../modules/model')
exports.create = async(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"content can not be empty!"
            
        })
        return;
    }
    const users = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    // sava user to the database
    // user
    .save()
    .then(data =>{
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"some error occured while creating a create operation"
        })
    })
}
//newuser

// retrieve and return all users/retrieve or return single user
exports.find=(req,res) =>{
    const id = req.query.id
    if(id){
        Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(400).send({
                    message:"user with the id not found"+id
                })
            }else{
                res.send(data)
            }
        }).catch(err=>{
            res.status(500).send({
                message:"failed to retrieve the data from database"
            })
        })
    }else{
        Userdb.find()
        .then(users=>{
            res.status(200).json(users)
        }).catch(err =>{
            res.status(500).send({
                message:"failed",
                error: err
          })
        })
    }
}
  
// update a new identified user
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty"})
    }
    const id = req.params.id
    console.log("The user id:",id)
    //req.params is used to access information in URL but req.body can not be used to access info in url bcs it is not the part of url
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
    .then(data =>{
        if(!data){
            res.status(404).send({
                message:`can not update use with ${id}.May be user not found`
        })
        }else{
            Userdb.find({})
            .then((users)=>{
                res.render('index',{users:users})
            })
          .catch((err)=>{
            res.status(500).send({
                message: "Some error occured while retrieving users"
            })
          })
        }
    }).catch(err=>{
        res.status(500).send({
            message:"error update user information"
        })
    })
}
// delete the user with specified user id in the request
exports.delete = (req,res)=>{
   const id = req.params.id
   Userdb.findByIdAndDelete(id)
   .then(data =>{
    if(!data){
        res.status(400).send({
            message:`can not delete with id ${id}. may be the id is wrong`
        })
    }else{
        res.send(data)
    }
   }).catch(err =>{
    res.status(500).send({
        message: `Could not delete User with id=${id}. Error: ${err.message}`
    })
   })
}
// Your controller function to render the view
