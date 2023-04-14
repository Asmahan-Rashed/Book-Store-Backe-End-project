const {Router}= require('express');
const orderRouter= Router();

const orderController= require('../controllers/order_controller');

orderRouter.post('/', orderController.addOrder);
orderRouter.put('/:userId/:orderId', orderController.editOrder);
orderRouter.delete('/:userId/:orderId', orderController.deleteOrder);

orderRouter.get('/confirm/:userId', orderController.confirmOrder);


module.exports= {
    orderRouter,
};
