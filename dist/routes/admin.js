"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
exports.admin = router;
router.post("/vendor/create", controllers_1.createVendor);
router.use(middleware_1.validate);
router.get("/vendors", controllers_1.getVendors);
router.get("/vendor/:id", controllers_1.getVendorID);
//# sourceMappingURL=admin.js.map