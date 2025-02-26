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
      status,
      userId,
    } = req.body;

    console.log(address_line1, city, state, pincode, country, mobile, status);

    // const userId = req.userId;

    // if (
    //   !address_line1 ||
    //   !city ||
    //   !state ||
    //   !pincode ||
    //   !country ||
    //   !mobile ||
    //   !userId
    // ) {
    //   return res.status(404).json({
    //     message: "Please provide all the fields",
    //     error: true,
    //     success: false,
    //   });
    // }

    const address = new AddressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      userId,
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
    }

    return res.status(200).json({
      data: address,
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
