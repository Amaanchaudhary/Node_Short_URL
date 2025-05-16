import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timeStamps: { type: String },
        userIp: {
          type: String,
        },
        userAgent: {
          type: String,
        },
        referer: {
          type: String,
        },
        locationData: {
          city: { type: String },
          country: { type: String },
          region: { type: String },
        },
      },
    ],
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const URL = mongoose.model("url", urlSchema);
