import AddressModel from "../models/addressModel.js";
import UserModel from "./../models/userModel.js";

// Add Address
export async function addAddressController(req, res) {
  try {
    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      landmark,
      userId,
      addressType,
    } = req.body;

    const address = new AddressModel({
      address_line1,
      city,
      state,
      country,
      pincode,
      mobile,
      landmark,
      userId,
      addressType,
    });
    const savedAddress = await address.save();

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          address_details: savedAddress?._id,
        },
      }
    );

    return res.status(200).json({
      data: savedAddress,
      message: "Address add successfully",
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

// Get Address

export async function getAddressController(req, res) {
  try {
    const address = await AddressModel.find({ userId: req?.query?.userId });
    if (!address) {
      return res.status(404).json({
        message: "address not found",
        error: true,
        success: false,
      });
    } else {
      const updatedUser = await UserModel.updateOne(
        { _id: req?.query?.userId },
        {
          $push: {
            address: address?._id,
          },
        }
      );

      return res.status(200).json({
        data: address,
        error: false,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Delete Address
export async function deleteAddressController(req, res) {
  try {
    const userId = req.userId; //middleware
    const _id = req.params.id;

    if (!_id) {
      return res.status(400).json({
        message: "Provide id",
        error: true,
        success: false,
      });
    }

    const deletedAddress = await AddressModel.deleteOne({
      _id: _id,
      userId: userId,
    });

    if (!deletedAddress) {
      return res.status(404).json({
        message: "The product in the database not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "address Remove",
      error: false,
      success: true,
      data: deletedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get Signle address
export async function getSingleAddress(req, res) {
  try {
    const id = req.params.id;
    const address = await AddressModel.findOne({ _id: id });
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      address: address,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
