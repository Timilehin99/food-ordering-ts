"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopping = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const shoppingController_1 = require("../controllers/shoppingController");
const router = (0, express_1.Router)();
exports.shopping = router;
router.use(middleware_1.validate);
router.get("/:pincode", shoppingController_1.GetFoodAvailability);
router.get("top-rated/:pincode", shoppingController_1.GetTopRated);
router.get("/quick/:pincode", shoppingController_1.GetQuick);
router.get("/restaurant/:id", shoppingController_1.findRestaurantByID);
router.get("/foods", shoppingController_1.GetFoods);
//# sourceMappingURL=shopping.js.map