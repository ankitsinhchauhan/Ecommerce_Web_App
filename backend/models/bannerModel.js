import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    bannerTitle: {
      type: String,
      default: "",
      required: true,
    },

    catId: {
      type: String,
      default: "",
      required: true,
    },
    price: {
      type: Number,
      default: "",
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BannertModel = mongoose.model("banner", bannerSchema);

export default BannertModel;
