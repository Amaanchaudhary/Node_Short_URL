import { nanoid } from "nanoid";
import { URL } from "../models/url.js";
import axios from "axios";

export const generateNewShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res
        .status(400)
        .json({ status: "Error", message: "URL is required" });
    }

    const shortId = nanoid(8);
    await URL.create({
      shortId,
      redirectURL: url,
      visitHistory: [],
    });

    return res.status(201).json({ status: "Success", id: shortId });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ status: "Error", message: error.message || "Server Error" });
  }
};

export const getRealUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    if (!shortId) {
      return res
        .status(400)
        .json({ status: "Error", message: "URL is required" });
    }

    const userAgent = req.headers["user-agent"];
    const referer = req.headers["referer"] || "Direct";

    // Optional: Get location from IP
    let locationData = {};
    try {
      const geo = await axios.get(`https://ipapi.co/${req.ip}/json/`);

      locationData = {
        city: geo.data?.city || "Unknown",
        country: geo.data?.country_name || "Unknown",
        region: geo.data?.region || "Unknown",
      };
    } catch (err) {
      console.log("Geo IP lookup failed:", err.message);
    }

    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timeStamps: new Date().toLocaleString(),
            userIp: req.ip,
            userAgent,
            referer,
            locationData,
          },
        },
        $inc: { clickCount: 1 },
      },
      {
        new: true,
      }
    );

    if (!entry) {
      return res
        .status(400)
        .json({ status: "Error", message: "URL Not found" });
    }

    return res.redirect(entry?.redirectURL);
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ status: "Error", message: error.message || "Server Error" });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;
    if (!shortId) {
      return res
        .status(400)
        .json({ status: "Error", message: "URL is required" });
    }

    const result = await URL.findOne({ shortId });

    if (!result) {
      return res
        .status(400)
        .json({ status: "Not Found", message: "No Analytics found" });
    }

    return res
      .status(200)
      .json({ count: result.clickCount, Analytics: result.visitHistory });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Error", message: error.message || "Server Error" });
  }
};
