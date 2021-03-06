const mongoose = require('mongoose');
var _ = require('lodash');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    fullName:{
        type: String,
        minlength:3,
        required: true
      },     
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function(email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String(email).toLowerCase());
        },
        message: props => `${props.value} Email validation failed!`
      },
      required: [true, 'User Email required']
    
    },
    
    password:{
      type: String,
      required: true,
      minlength: 6,
     

    },
    phone:{
      type:String,
     // required
     validate: {
      validator: function(v) {
       // /\d{3}\d{3}\d{5}/
        return /^(010)|(011)|(012)[0-9]{8}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    //required: [true, 'User phone number required']
  },
 /* Address: {
    city: {
        type: String,
        default:''
    },
    state: {
        type: String,
        default:''
       
    },
    PostalCode:{
      type: String,
      default: ''

    },
    Country:{
      type: String,
      default:''

    }

},*/
/*order_item:[ {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'order_item',
  
}],*/

  },
  {
    toJSON:{
      transform:(doc, ret) => _.omit(ret ,['__v', 'password'])
    }
}



 );
  // To Encrypt the password
  AdminSchema.pre('save', async function() {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 10)
});

  const Admin = mongoose.model('admin' , AdminSchema ,'admin')
  module.exports = Admin ; 