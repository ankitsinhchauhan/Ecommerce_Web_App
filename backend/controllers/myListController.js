import MyListModel from "../models/myListModel.js";

// Add My List
export async function addToMyList(req, res) {
  try {
    const userId = req.userId; //middleware

    const {
      productId,
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      brand,
      discount,
    } = req.body;

    const item = await MyListModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (item) {
      return res.status(400).json({
        message: "Item already in my list",
      });
    }

    const myList = new MyListModel({
      productId,
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      brand,
      discount,
      userId,
    });

    const save = await myList.save();

    return res.status(200).json({
      message: "Product saved in the my list",
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

// Delete My List
export async function deleteToMyList(req, res) {
  try {
    const myListeItem = await MyListModel.findById(req.params.id);
    if (!myListeItem) {
      return res.status(500).json({
        message: "Item with this given id was not found",
        error: true,
        success: false,
      });
    }

    const deletedItem = await MyListModel.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(500).json({
        message: "Item is not deleted!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item removed from my list",
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

// get MyList
export async function getMyListController(req, res) {
  try {
    const userId = req.userId; //middleware

    const myListItems = await MyListModel.find({
      userId: userId,
    });

    return res.status(200).json({
      data: myListItems,
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
