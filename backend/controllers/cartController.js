import CartProductModel from "../models/cartModel.js";

// Add to cart
export async function addToCartController(req, res) {
  try {
    const userId = req.userId; //middleware
    const {
      productTitle,
      brand,
      image,
      rating,
      price,
      oldPrice,
      discount,

      quantity,
      subTotal,
      productId,
      countInStock,
    } = req.body;

    if (!productId) {
      return res.status(402).json({
        message: "Provide Product_Id",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return res.status(400).json({
        message: "Item already in cart",
      });
    }

    const cartItem = new CartProductModel({
      productTitle: productTitle,
      brand: brand,
      image: image,
      rating: rating,
      price: price,
      oldPrice: oldPrice,
      discount: discount,

      quantity: quantity,
      subTotal: subTotal,
      productId: productId,
      countInStock: countInStock,
      userId: userId,
    });
    const save = await cartItem.save();

    return res.status(200).json({
      data: save,
      message: "Item add successfully",
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

// get cart itme
export async function getCartItemController(req, res) {
  try {
    const userId = req.userId;

    const cartItems = await CartProductModel.find({
      userId: userId,
    });

    return res.status(200).json({
      data: cartItems,
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

// Update Cart
export async function updateCartQtyController(req, res) {
  try {
    const userId = req.userId;
    const { _id, qty, subTotal } = req.body;

    if (!_id || !qty) {
      return res.status(400).json({
        message: "Provide_id, qty",
      });
    }

    const updateCartItem = await CartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        quantity: qty,
        subTotal: subTotal,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Updated cart",
      error: false,
      success: true,
      data: updateCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Delete Cart
export async function deleteCartItem(req, res) {
  try {
    const userId = req.userId; //middleware
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Provide id",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({
      _id: id,
      userId: userId,
    });

    if (!deleteCartItem) {
      return res.status(404).json({
        message: "The product in the cart not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item Remove",
      error: false,
      success: true,
      data: deleteCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Empty cart
export async function emptyCartControll(req, res) {
  try {
    const userId = req.params.id; //middleware

    await CartProductModel.deleteMany({ userId: userId });
    return res.status(200).json({
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
