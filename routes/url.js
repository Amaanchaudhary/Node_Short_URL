import { Router } from "express";
import {
  generateNewShortUrl,
  getAnalytics,
  getRealUrl,
} from "../controllers/url.js";

const router = Router();

router.post("/", generateNewShortUrl);
router.get("/:shortId", getRealUrl);
router.get("/analytics/:shortId", getAnalytics);

export default router;
