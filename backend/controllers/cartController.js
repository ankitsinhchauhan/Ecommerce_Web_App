import CartProductModel from "../models/cartProductModel.js";
import UserModel from "./../models/userModel.js";

// Add to cart
export async function addToCartController(req, res) {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(402).json({
        message: "Provide Product id",
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
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const save = await cartItem.save();

    //update cart User
    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

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

    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    return res.status(200).json({
      data: cartItem,
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
    const { _id, qty } = req.body;

    if (!_id || !qty) {
      return res.status(400).json({
        message: "Provide id, qty",
      });
    }

    const updateCartItem = await CartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        quantity: qty,
      }
    );

    return res.status(200).json({
      message: "Update cart",
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
    const { _id, productId } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Provide id",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });

    if (!deleteCartItem) {
      return res.status(404).json({
        message: "The product in the cart not found",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({
      _id: userId,
    });

    const cartItems = user?.shopping_cart;

    const updatedUserCart = [
      ...cartItems.slice(0, cartItems.indexOf(productId)),
      ...cartItems.slice(cartItems.indexOf(productId) + 1),
    ];

    user.shopping_cart = updatedUserCart;
    await user.save();

    return res.status(200).json({
      message: "Remove Item!",
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
