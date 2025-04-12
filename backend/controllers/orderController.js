import OrderModel from "../models/orderModel.js";
import ProductModel from "./../models/productModel.js";

// create order
export async function createOrderController(req, res) {
  try {
    let order = new OrderModel({
      userId: req.body.userId,
      products: req.body.products,
      paymentId: req.body.paymentId,
      payment_status: req.body.payment_status,
      delivery_address: req.body.delivery_address,
      totalAmt: req.body.totalAmt,
      date: req.body.date,
    });

    if (!order) {
      res.status(400).json({
        error: true,
        success: false,
      });
    }

    for (let i = 0; i < req.body.products.length; i++) {
      await ProductModel.findByIdAndUpdate(
        req.body.products[i].productId,
        {
          countInStock: parseInt(
            req.body.products[i].countInStock - req.body.products[i].quantity
          ),
        },
        {
          new: true,
        }
      );
    }

    order = await order.save();

    return res.status(200).json({
      message: "Order Placed",
      success: true,
      error: false,
      order: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Get Order
export async function getOrderDetailsController(req, res) {
  try {
    const userId = req.userId; //order id

    const orderlist = await OrderModel.find({ userId: userId })
      .sort({ createdAt: -1 })
      .populate("delivery_address userId");

    return res.status(200).json({
      message: "Order List",
      data: orderlist,
      success: true,
      error: false,
    });
    W;
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Order Status
export async function updateOrderStatus(req, res) {
  try {
    const { id, order_status } = req.body;

    const updateOrder = await OrderModel.updateOne(
      {
        _id: id,
      },
      {
        order_status: order_status,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "update order status",
      error: false,
      success: true,
      data: updateOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
