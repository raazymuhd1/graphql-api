"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = require("../controllers/user.controller.js");
const router = express_1.default.Router();
router.get("/name", (req, res) => {
    res.json({ msg: "mohammed raazy" });
});
router.post("/upload-image", user_controller_js_1.uploadImage);
router.post("/upload-banner", user_controller_js_1.uploadBanner);
exports.default = router;
