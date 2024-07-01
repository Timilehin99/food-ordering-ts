"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendor = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
exports.vendor = router;
const imgStore = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: function (res, file, cb) {
        cb(null, '_' + file.originalname);
    }
});
const images = (0, multer_1.default)({ storage: imgStore }).array('images', 5);
router.post("/login", controllers_1.vendorLogin);
router.use(middleware_1.validate);
router.get("/profile", controllers_1.GetVendorProfile);
router.patch("/profile", controllers_1.UpdateVendorProfile);
router.patch("/service", controllers_1.UpdateVendorService);
router.patch("/cover", images, controllers_1.UpdateVendorCoverImage);
router.post("/food", images, controllers_1.addFood);
router.get("/foods", controllers_1.getFoods);
//# sourceMappingURL=vendor.js.map