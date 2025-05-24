import { Router } from "express";
import { basicSSR , ejsSSR } from "../controllers/test.js";

const router = Router();

router.get("/", basicSSR)
router.get("/ejs", ejsSSR);

export default router