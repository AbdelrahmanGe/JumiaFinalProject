/*  install express*/
const express = require('express');
var cors = require('cors');



const app = express();
app.use(cors());

const userRoutes = require('./routes/user_route')
const orderRoutes = require('./routes/order_route')
const dataRoutes = require('./routes/data_route')
const reviewRoute=require('./routes/review_route');
const indexRoutes = require('./routes/index_route')
const search_subcategoryFilter_Routes = require('./routes/search_subcategory and filter_routes')
const adminRoutes = require('./routes/Admin_route')
const dotenv = require('dotenv');
dotenv.config();
/* connected mongodb */ 
/*const mongoose = require('mongoose')

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true,  useUnifiedTopology: true,  useCreateIndex: true,},
    () => console.log('connected to db')
);*/
const mongoose = require('mongoose')
const url ='mongodb+srv://jumia:iti-jumia123@cluster0.crjwu.mongodb.net/jumiadb?retryWrites=true&w=majority'
const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams,(err)=>{
if(err){
  console.log(err)
}else{
  console.log('connected to DB .....')
}

});



// any request parse as json 
const bodyParser = require('body-parser');
app.use(bodyParser.json());





userRoutes(app)
orderRoutes(app)
dataRoutes(app)
reviewRoute(app);
indexRoutes(app)
search_subcategoryFilter_Routes(app)
adminRoutes(app)
let paypalOf='AWm9kKA2Ot65D8fvWeEjvbrwimaM1iVZDAtHBa8ujPUNM-AyK_i8EIvb5qYxmbN91WAEFy3QuUN3n8Rq'
app.get('/api/config/paypal' , (req, res) =>{
  res.send(paypalOf || 'sb');
});

app.use((err, req, res, next)=>{
    // any error should return from response
    console.log(err.message);
    res.status(422).send({err: err.message})
})



module.exports= app;