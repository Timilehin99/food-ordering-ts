"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customer = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
exports.customer = router;
router.post("/signup", controllers_1.newCustomer);
router.post("/login", controllers_1.CustomerLogin);
router.use(middleware_1.validate);
router.patch("/verify", controllers_1.verifyCustomer);
router.get("/otp", controllers_1.RequestOTP);
router.get("/profile", controllers_1.GetCustomerProfile);
router.patch("/profile", controllers_1.EditCustomerProfile);
//# sourceMappingURL=customer.js.map