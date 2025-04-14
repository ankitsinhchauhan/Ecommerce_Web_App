import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import BannertModel from "../models/bannerModel.js";

// cloudinary
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//  Image Upload
var imagesArr = [];
export async function uploadImages(req, res) {
  try {
    imagesArr = [];

    const image = req.files;
    console.log(image);

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${req.files[i].filename}`);
        }
      );
    }

    return res.status(200).json({
      images: imagesArr,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Add Banner
export async function addBanner(req, res) {
  try {
    let banner = new BannertModel({
      bannerTitle: req.body.bannerTitle,
      images: imagesArr,
      catId: req.body.catId,
      price: req.body.price,
    });
    if (!banner) {
      return res.status(400).json({
        message: "Banner not created",
        error: true,
        success: false,
      });
    }
    await banner.save();

    imagesArr = [];
    return res.status(200).json({
      message: "Banner created successfully!",
      error: false,
      success: true,
      banner: banner,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Get Banner
export async function getBanner(req, res) {
  try {
    const banners = await BannertModel.find();

    if (!banners) {
      return res.status(400).json({
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: banners,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Delete banner
export async function deleteBanner(req, res) {
  try {
    const banner = await BannertModel.findById(req.params.id);
    const images = banner.images;
    let img = "";
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];

      const imageName = image.split(".")[0];

      if (imageName) {
        cloudinary.uploader.destroy(imageName, (error, result) => {
          // console.log(error, result);
        });
      }
    }

    const deleteBanner = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deleteBanner) {
      res.status(404).json({
        message: "Banner not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Banner Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Upadate banner
export async function updateBanner(req, res) {
  try {
    const bannner = await BannertModel.findByIdAndUpdate(
      req.params.id,
      {
        bannerTitle: req.body.bannerTitle,
        images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
        catId: req.body.catId,
        price: req.body.price,
      },
      { new: true }
    );

    if (!category) {
      return res.status(500).json({
        message: "Bannner cannot be updated",
        error: true,
        success: false,
      });
    }

    imagesArr = [];

    res.status(200).json({
      error: false,
      success: true,
      bannner: bannner,
      message: "Banner updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Get Single banner
export async function getSingleBanner(req, res) {
  try {
    const banner = await BannertModel.findById(req.params.id);
    if (!banner) {
      res.status(500).json({
        message: "The Banner with the given ID was not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      banner: banner,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
