

const Order = require('../models/order');
const { verify } = require('./middleware.js');


module.exports= (app) =>{

   app.post('/api/orders',
   verify,
   async (req , res) =>{
      /* if(req.body.orderItems.length === 0){
        res.status(400).send({message : 'cart is empty'})

       }*/
       console.log(req.body);
       
       const order = new Order({
        orderItems:req.body.orderItems,
        shippingAddress:req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod,
        itemsPrice:req.body.itemsPrice,
        shippingPrice:req.body.shippingPrice,
        taxPrice:req.body.taxPrice,
        totalPrice:req.body.totalPrice,
        user:req.body._id,
        
    });
    const createdOrder = await order.save();
    res.status(201).send({message:'New order created' , order: createdOrder});

   }
   
   );
   app.get('/api/orders/:id',  async (req , res) =>{
       const order = await Order.findById(req.params.id);
       if(order){
           res.send(order)
       }else{
           res.status(404).send({message:'Order not found'})
       }
   } );


   app.put('/api/orders/:id/pay'  , async(req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true ;
        order.paidAt = Date.now();
        order.paymentResult = {
             id : req.body.id , 
             status: req.body.status,
             update_time: req.body.update_time, 
             email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        res.send({message: 'Order Paid', order:updatedOrder})
    } else{
        res.status(404).send({ message : 'order not Found '})
    }


   });
   // delete
   app.delete('/api/orders/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  }
);

//orderhistory

app.get('/api/orders/mine',verify ,async (req , res) =>{
    const orders = await Order.find({user: req.user._id});
        res.send(orders);
   
} );


  
}