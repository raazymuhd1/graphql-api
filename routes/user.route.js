import express from "express"
import { uploadImage, uploadBanner } from "../controllers/user.controller.js"
const router = express.Router()

router.post("/upload-image", uploadImage)
router.post("/upload-banner", uploadBanner)

export default router;