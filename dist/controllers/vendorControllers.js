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
exports.getFoods = exports.addFood = exports.UpdateVendorCoverImage = exports.UpdateVendorService = exports.UpdateVendorProfile = exports.GetVendorProfile = exports.vendorLogin = void 0;
const models_1 = require("../models");
const adminControllers_1 = require("./adminControllers");
const utilities_1 = require("../utilities");
const vendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const validUser = yield (0, adminControllers_1.checkDB)("", email);
    if (validUser) {
        const passTrue = yield (0, utilities_1.verifyPassword)(password, validUser.password);
        if (passTrue) {
            const userSig = (0, utilities_1.createSignature)({ _id: validUser.id,
                name: validUser.name,
                email: validUser.email,
                foodType: validUser.foodType });
            return res.json(userSig);
        }
        else {
            return res.status(400).json({ "message": "Check your credentials." });
        }
    }
    return res.status(400).json({ "message": "Check your credentials." });
});
exports.vendorLogin = vendorLogin;
const GetVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const validUser = yield models_1.Vendor.findById(user._id);
        return res.status(200).json(validUser);
    }
    return res.status(400).json({ message: "user not found" });
});
exports.GetVendorProfile = GetVendorProfile;
const UpdateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, foodType, phoneNo } = req.body;
    const user = req.user;
    if (user) {
        const validUser = yield models_1.Vendor.findById(user._id);
        if (validUser) {
            validUser.name = name;
            validUser.location = location;
            validUser.foodType = foodType;
            validUser.phoneNo = phoneNo;
            const result = yield validUser.save();
            return res.status(200).json(result);
        }
        return res.status(400).json({ message: "This user does not exist." });
    }
});
exports.UpdateVendorProfile = UpdateVendorProfile;
const UpdateVendorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const validUser = yield models_1.Vendor.findById(user._id);
        if (validUser) {
            validUser.serviceAvailable = !(validUser.serviceAvailable);
            const result = yield validUser.save();
            return res.status(200).json(validUser);
        }
        return res.status(400).json({ message: "This user does not exist." });
    }
});
exports.UpdateVendorService = UpdateVendorService;
const UpdateVendorCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vendor = yield models_1.Vendor.findById(user._id);
        if (vendor) {
            const files = req.files;
            const names = files.map((file) => file.filename);
            vendor.coverImage.push(...names);
            const result = yield vendor.save();
            return res.json(result);
        }
        return res.status(400).json({ message: "This user does not exist." });
    }
});
exports.UpdateVendorCoverImage = UpdateVendorCoverImage;
const addFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const { name, description, price, category, prepTime, foodType } = req.body;
        const vendor = yield models_1.Vendor.findById(user._id);
        if (vendor) {
            const files = req.files;
            const names = files.map((file) => file.filename);
            const food = yield models_1.Food.create({
                vendorId: vendor._id,
                name: name,
                price: price,
                description: description,
                category: category,
                prepTime: prepTime,
                images: names,
                foodType: foodType
            });
            vendor.foods.push(food);
            const result = yield vendor.save();
            return res.status(200).json(result);
        }
        return res.json({ message: "Error on the dancefloor!!" });
    }
    return res.json({ message: "Error on the dancefloor" });
});
exports.addFood = addFood;
const getFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const foods = yield models_1.Food.find({ vendorId: user._id });
        if (foods) {
            return res.json(foods);
        }
    }
    const foods = yield models_1.Food.find({}).sort({ "name": 1 });
    return res.json({ foods });
});
exports.getFoods = getFoods;
//# sourceMappingURL=vendorControllers.js.map