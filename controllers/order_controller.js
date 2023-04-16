const { Order }= require('../modles/order');
const {Book} = require('../modles/book');



//api 
const addOrder= async (req, res)=>{
    try{
       const book= await Book.findOne({_id: req.body.bookId});
        

        if(book.count >= req.body.quantity ){
          //  console.log("hiii1111111111111111111111");
        if(book._id== req.body.bookId)
        { //console.log("hii222222222222222222222222");
        const order = await Order.create(req.body);
            order.quantity= req.body.quantity;
            order.amount= book.price*order.quantity;
            await order.save();
            res.status(200).send(order);
            }
        }
    else{
        //console.log("hii333333333333");
        
        res.status(200).send(" we don’t have this quantity now ");   
    }
    }catch(error){
        res.status(400).send(error);
    }
};

//userId  , orderId
const editOrder= async (req, res) =>{
    
    try{
        const order= await Order.findOne({_id: req.params.orderId});
        const book= await Book.findOne({_id: order.bookId});

        //for authorization purpose
        if(req.params.userId== order.userId){
            if(req.body.phoneNumber){
                order.phoneNumber= req.body.phoneNumber;
                await order.save();

               
            }
            if(req.body.address){
                order.address= req.body.address;
                await order.save();
            }
            if(req.body.quantity){
                if(book.count >= req.body.quantity ){
                order.quantity= req.body.quantity;
                order.amount= book.price*order.quantity;
               // book.count -=order.quantity;
               await order.save();

               res.status(200).send(order);
                }
                else{
                    res.status(200).send("edit we don’t have this quantity now");
                }
            }
            else{
                res.status(200).send(order);
            }
           
        }
            
        else{
            res.status(400).send(error);
            //console.log("not valid user id");
        }

        //await book.save();
        
        
            
    }catch(error){
        res.status(400).send(error);
    }
};


//api user_id, order_id
const deleteOrder= async (req, res)=>{
    try{
        const order = await Order.findOne({_id: req.params.orderId});
        //console.log("hiiiiiiiiiiiiiiiii7777777777777");
        if( order.userId == req.params.userId){
          //  console.log("hiiiiiiiiiiiiiiiii");
            await Order.deleteOne({_id: req.params.orderId})
        }
        res.status(200).send(order);
    }catch(error){
        res.status(400).send(error);
    }
};

//api user_id
const confirmOrder= async (req, res)=>{

    var x=0;
    var book;

    try{
       // find return list
        const allOrders=  await Order.find({userId: req.params.userId});
        let book;
        //const allBooks= await Book.find({_id: order.bookId});
        //console.log(allOrders.amount);
        for(let i=0; i<allOrders.length; i++){
           // console.log("hiiiiiiiii"+allOrders.length);
            x +=allOrders[i].amount;
            book= await Book.findOne({_id: allOrders[i].bookId});
            book.count -= allOrders[i].quantity;
            await book.save();
           // console.log(allOrders[i].bookId.count);
        } 
        
        console.log(x);       
        res.status(200).send("your total order price is "+ x+ " EGP");
    }catch(error){
        res.status(400).send(error);
    }
};



module.exports={

    addOrder,
    editOrder,
    confirmOrder,
    deleteOrder,
};