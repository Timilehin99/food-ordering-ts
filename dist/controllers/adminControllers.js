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
exports.getVendorID = exports.getVendors = exports.createVendor = exports.checkDB = void 0;
const models_1 = require("../models");
const utilities_1 = require("../utilities");
const checkDB = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const vendor = yield models_1.Vendor.findOne({ email: email });
        return vendor;
    }
    else {
        const vendor = yield models_1.Vendor.findById(id);
        return vendor;
    }
});
exports.checkDB = checkDB;
const createVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerName, pinCode, location, password, foodType, email, phoneNo } = req.body;
    const vendorCheck = yield (0, exports.checkDB)('', email);
    if (vendorCheck) {
        return res.status(400).send("This user already exists.");
    }
    const newPassword = yield (0, utilities_1.hashPassword)(password);
    const newV = yield models_1.Vendor.create({
        name: name,
        ownerName: ownerName,
        pinCode: pinCode,
        location: location,
        password: newPassword,
        foodType: foodType,
        email: email,
        phoneNo: phoneNo,
    });
    return res.status(200).json(newV);
});
exports.createVendor = createVendor;
const getVendors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield models_1.Vendor.find({}).sort({ "name": 1 });
    return res.status(200).json(vendors);
});
exports.getVendors = getVendors;
const getVendorID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorID = req.params.id;
    const vendor = yield (0, exports.checkDB)(vendorID);
    if (vendor) {
        return res.status(200).send(vendor);
    }
    else {
        return res.status(400).send(`Vendor was not found.`);
    }
});
exports.getVendorID = getVendorID;
//# sourceMappingURL=adminControllers.js.map