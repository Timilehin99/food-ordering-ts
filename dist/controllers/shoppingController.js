"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRestaurantByID = exports.GetFoods = exports.GetQuick = exports.GetTopRated = exports.GetFoodAvailability = void 0;
const models_1 = require("../models");
const GetFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pinCode: pincode, serviceAvailable: false })
        .sort({ "rating": -1 })
        .populate("foods");
    if (result.length > 0) {
        return res.status(200).send(result);
    }
    return res.status(400).send({ message: "No food for you" });
});
exports.GetFoodAvailability = GetFoodAvailability;
const GetTopRated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pinCode: pincode, serviceAvailable: true })
        .sort({ "rating": -1 });
    if (result.length > 0) {
        return res.status(200).send(result);
    }
    return res.status(400).send({ message: "No food for you" });
});
exports.GetTopRated = GetTopRated;
const GetQuick = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pinCode: pincode, serviceAvailable: true })
        .populate("foods");
    if (result.length > 0) {
        let quickFood = [];
        result.map(vendor => {
            const foods = vendor.foods;
            quickFood.push(...foods.filter(food => food.prepTime <= 30));
        });
        return res.status(200).send(quickFood);
    }
    return res.status(400).send({ message: "No food for you" });
});
exports.GetQuick = GetQuick;
const GetFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pinCode: pincode, serviceAvailable: true })
        .populate("foods");
    if (result.length > 0) {
        let foodComp = [];
        result.map(vendor => {
            foodComp.push(...vendor.foods);
        });
        return res.status(200).send(foodComp);
    }
    return res.status(400).send({ message: "No food for you" });
});
exports.GetFoods = GetFoods;
const findRestaurantByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield models_1.Vendor.findById(id);
    if (result) {
        return res.status(200).send(result);
    }
    return res.status(400).send({ message: "No food for you" });
});
exports.findRestaurantByID = findRestaurantByID;
//# sourceMappingURL=shoppingController.js.map