const User = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecret = "my-token-secret";
var x;

module.exports = {
    all(req , res , next){
       // res.send('all')
       const limit =parseInt(req.query.limit) || ''
       User.find({}).limit(limit)
       .then(users => res.status(200).send(users))
       .catch(next)


    },
    userbyid(req , res , next){
      const userId = req.params.id;
      const limit =parseInt(req.query.limit) || ''
     User.find({_id:userId}).limit(limit)
     .then(users => res.status(200).send(users))
     .catch(next)
  
   },


    create(req , res , next){
       var userProps = req.body
       User.create(userProps)
      //  .then(user => res.status(201).send(user))
      .then(user=>{
       const tok=generateToken(user);
        res.status(200).json({_id:user._id,email:user.email,fullName:user.fullName,token:tok})
      })
       .catch(next)

    },

    delete(req , res , next){
        const userId = req.params.id;
        User.findByIdAndRemove({_id :userId})
        .then(user => res.status(204).send(user))
        .catch(next)

    },
    update(req , res , next){
        const userId = req.params.id;
        var userProps = req.body;
        User.findByIdAndUpdate({_id :userId}, userProps)
        .then(() => User.findById({_id :userId}))
        .then(user => res.status(200).send(user))
        .catch(next)

    },


    login(req, res, next) {
        User.findOne({ email: req.body.email })
          .then(user => {
            if (!user) res.status(404).json({ error: 'email not exist' })
            else {
              bcrypt.compare(req.body.password, user.password, (error, match) => {
                if (error) res.status(500).json(error)
                else if (match) {
                  const tok=generateToken(user);
                  x=tok;
                  res.status(200).header('auth-token',tok).json({_id:user._id,email:user.email,fullName:user.fullName,token:tok})
              }
                else res.status(403).json({ error: 'Invalid password' })
              })
            }
          }
          )
          .catch(next)
      },
      logout(req, res, next) {
        res.status(200).json(req.user)
      }

}

function generateToken(user) {
    const t=jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' });
    return t;
  }