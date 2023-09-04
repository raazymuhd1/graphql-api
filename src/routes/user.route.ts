import express from "express"
import { uploadImage, uploadBanner } from "../controllers/user.controller.js"
const router = express.Router()

router.get("/name", (req, res) => {
    res.json({ msg: "mohammed raazy" })
})
router.post("/upload-image", uploadImage)
router.post("/upload-banner", uploadBanner)

export default router;