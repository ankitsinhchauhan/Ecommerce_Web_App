import OrderModel from "../models/orderModel.js";
import ProductModel from "./../models/productModel.js";
import UserModel from "./../models/userModel.js";

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
    const { page, limit } = req.query;

    const orderlist = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate("delivery_address userId")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await OrderModel.countDocuments(orderlist);

    return res.status(200).json({
      message: "Order List",
      data: orderlist,
      success: true,
      error: false,
      total: total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
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

// Get Total Order
export async function getTotalOrdersCountController(req, res) {
  try {
    const ordersCount = await OrderModel.countDocuments();

    return res.status(200).json({
      success: true,
      error: false,
      count: ordersCount,
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

// Total Users
export async function totalUsersController(req, res) {
  try {
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    let monthlyUsers = [
      { name: "JAN", TotalUsers: 0 },
      { name: "FAB", TotalUsers: 0 },
      { name: "MAR", TotalUsers: 0 },
      { name: "APR", TotalUsers: 0 },
      { name: "MAY", TotalUsers: 0 },
      { name: "JUN", TotalUsers: 0 },
      { name: "JULY", TotalUsers: 0 },
      { name: "AUG", TotalUsers: 0 },
      { name: "SEP", TotalUsers: 0 },
      { name: "OCT", TotalUsers: 0 },
      { name: "NOV", TotalUsers: 0 },
      { name: "DEC", TotalUsers: 0 },
    ];

    for (let i = 0; i < users.length; i++) {
      if (users[i]?._id?.month === 1) {
        monthlyUsers[0] = {
          name: "JAN",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 2) {
        monthlyUsers[1] = {
          name: "FEB",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 3) {
        monthlyUsers[2] = {
          name: "MAR",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 4) {
        monthlyUsers[3] = {
          name: "APR",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 5) {
        monthlyUsers[4] = {
          name: "MAY",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 6) {
        monthlyUsers[5] = {
          name: "JUN",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 7) {
        monthlyUsers[6] = {
          name: "JULY",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 8) {
        monthlyUsers[7] = {
          name: "AUG",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 9) {
        monthlyUsers[8] = {
          name: "SEP",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 10) {
        monthlyUsers[9] = {
          name: "OCT",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 11) {
        monthlyUsers[10] = {
          name: "NOV",
          TotalUsers: users[i].count,
        };
      }

      if (users[i]?._id?.month === 12) {
        monthlyUsers[11] = {
          name: "DEC",
          TotalUsers: users[i].count,
        };
      }
    }

    return res.status(200).json({
      TotalUsers: monthlyUsers,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Total Sales
export async function totalSalesController(req, res) {
  try {
    const currentYear = new Date().getFullYear();
    const ordersList = await OrderModel.find();

    let totalSales = 0;
    let monthlySales = [
      { name: "JAN", TotalSales: 0 },
      { name: "FAB", TotalSales: 0 },
      { name: "MAR", TotalSales: 0 },
      { name: "APR", TotalSales: 0 },
      { name: "MAY", TotalSales: 0 },
      { name: "JUN", TotalSales: 0 },
      { name: "JULY", TotalSales: 0 },
      { name: "AUG", TotalSales: 0 },
      { name: "SEP", TotalSales: 0 },
      { name: "OCT", TotalSales: 0 },
      { name: "NOV", TotalSales: 0 },
      { name: "DEC", TotalSales: 0 },
    ];

    for (let i = 0; i < ordersList.length; i++) {
      totalSales = totalSales + parseInt(ordersList[i].totalAmt);
      const str = JSON.stringify(ordersList[i]?.createdAt);
      const year = str.substr(1, 4);
      const monthStr = str.substr(6, 8);
      const month = parseInt(monthStr.substr(0, 2));

      if (currentYear == year) {
        if (month === 1) {
          monthlySales[0] = {
            name: "JAN",
            TotalSales: (monthlySales[0].TotalSales =
              parseInt(monthlySales[0].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 2) {
          monthlySales[1] = {
            name: "FEB",
            TotalSales: (monthlySales[1].TotalSales =
              parseInt(monthlySales[1].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 3) {
          monthlySales[2] = {
            name: "MAR",
            TotalSales: (monthlySales[2].TotalSales =
              parseInt(monthlySales[2].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 4) {
          monthlySales[3] = {
            name: "APR",
            TotalSales: (monthlySales[3].TotalSales =
              parseInt(monthlySales[3].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 5) {
          monthlySales[4] = {
            name: "MAY",
            TotalSales: (monthlySales[4].TotalSales =
              parseInt(monthlySales[4].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 6) {
          monthlySales[5] = {
            name: "JUN",
            TotalSales: (monthlySales[5].TotalSales =
              parseInt(monthlySales[5].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 7) {
          monthlySales[6] = {
            name: "JULY",
            TotalSales: (monthlySales[6].TotalSales =
              parseInt(monthlySales[6].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 8) {
          monthlySales[7] = {
            name: "AUG",
            TotalSales: (monthlySales[7].TotalSales =
              parseInt(monthlySales[7].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 9) {
          monthlySales[8] = {
            name: "SEP",
            TotalSales: (monthlySales[8].TotalSales =
              parseInt(monthlySales[8].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 10) {
          monthlySales[9] = {
            name: "OCT",
            TotalSales: (monthlySales[9].TotalSales =
              parseInt(monthlySales[9].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 11) {
          monthlySales[10] = {
            name: "NOV",
            TotalSales: (monthlySales[10].TotalSales =
              parseInt(monthlySales[10].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
        if (month === 12) {
          monthlySales[11] = {
            name: "DEC",
            TotalSales: (monthlySales[11].TotalSales =
              parseInt(monthlySales[11].TotalSales) +
              parseInt(ordersList[i].totalAmt)),
          };
        }
      }
    }

    return res.status(200).json({
      totalSales: totalSales,
      monthlySales: monthlySales,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
