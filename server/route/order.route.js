import { Router } from 'express'
import auth from '../middleware/auth.js'
import { CashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookStripe } from '../controllers/order.controller.js'
import { processOnlineOrderController } from '../controllers/processOnlineOrder.js'

const orderRouter = Router()

orderRouter.post("/cash-on-delivery",auth,CashOnDeliveryOrderController)
orderRouter.post('/checkout',auth,paymentController)
orderRouter.post('/webhook',webhookStripe)
orderRouter.post('/process-online-order',auth,processOnlineOrderController)
orderRouter.get("/order-list",auth,getOrderDetailsController)

export default orderRouter