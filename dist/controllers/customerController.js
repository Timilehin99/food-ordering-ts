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
exports.EditCustomerProfile = exports.GetCustomerProfile = exports.RequestOTP = exports.CustomerLogin = exports.verifyCustomer = exports.newCustomer = void 0;
const customer_dto_1 = require("../dto/customer.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const customer_1 = require("../models/customer");
const utilities_1 = require("../utilities");
const newCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInput = (0, class_transformer_1.plainToClass)(customer_dto_1.CreateCustomer, req.body);
    const inputErr = yield (0, class_validator_1.validate)(customerInput, { validationError: { target: true } });
    if (inputErr.length > 0) {
        return res.status(400).json(inputErr);
    }
    const { username, email, phone, password, } = customerInput;
    const existing_user = yield customer_1.Customer.findOne({ $or: [{ email: email }, { username: username }] });
    if (existing_user) {
        return res.status(400).json({ message: "This user already exists" });
    }
    const hash_pwd = yield (0, utilities_1.hashPassword)(password);
    const { otp, otp_expiry } = (0, utilities_1.GenerateOTP)();
    const result = yield customer_1.Customer.create({
        username: username,
        email: email,
        password: hash_pwd,
        otp: otp,
        otp_expiry: otp_expiry,
        phone: phone,
        lat: 0,
        long: 0
    });
    if (result) {
        yield (0, utilities_1.sendOTP)(otp, phone);
        const signature = (0, utilities_1.createSignature)({
            _id: result.id,
            email: result.email,
            verified: result.verified
        });
        return res.status(200).json({ signature: signature });
    }
    return res.status(400).json({ message: "Signup error" });
});
exports.newCustomer = newCustomer;
const verifyCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const savedProfile = yield profile.save();
                const newSig = (0, utilities_1.createSignature)({
                    _id: savedProfile.id,
                    email: savedProfile.email,
                    verified: savedProfile.verified
                });
                return res.status(200).json({ signature: newSig });
            }
        }
    }
    return res.status(400).json({ error: "Something went wrong" });
});
exports.verifyCustomer = verifyCustomer;
const CustomerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInput = (0, class_transformer_1.plainToClass)(customer_dto_1.LoginInfo, req.body);
    const loginErrors = yield (0, class_validator_1.validate)(loginInput, { validationError: { target: true } });
    if (loginErrors.length > 0) {
        return res.status(400).json({ error: loginErrors });
    }
    const { email, password } = loginInput;
    const user = yield customer_1.Customer.findOne({ email: email });
    if (user) {
        const passT = yield (0, utilities_1.verifyPassword)(password, user.password);
        if (passT) {
            const signature = (0, utilities_1.createSignature)({
                _id: user.id,
                email: user.email,
                verified: user.verified
            });
            return res.status(200).json({ message: signature });
        }
        return res.status(400).json({ message: "Login failed" });
    }
    return res.status(400).json({ message: "Login failed" });
});
exports.CustomerLogin = CustomerLogin;
const RequestOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield customer_1.Customer.findById(customer._id);
        if (profile) {
            const { otp, otp_expiry } = (0, utilities_1.GenerateOTP)();
            profile.otp = otp;
            profile.otp_expiry = otp_expiry;
            const result = yield profile.save();
            yield (0, utilities_1.sendOTP)(otp, profile.phone);
            return res.status(200).json({ message: "OTP generated successfully" });
        }
        return res.status(400).json({ message: "OTP generation error." });
    }
    return res.status(400).json({ message: "OTP generation error." });
});
exports.RequestOTP = RequestOTP;
const GetCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const profile = yield customer_1.Customer.findById(user._id);
        if (profile) {
            return res.status(200).json(profile);
        }
        return res.status(400).json({ message: "Error retrieving profile" });
    }
    return res.status(400).json({ message: "Error retrieving profile" });
});
exports.GetCustomerProfile = GetCustomerProfile;
const EditCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const EditInput = (0, class_transformer_1.plainToClass)(customer_dto_1.EditInfo, req.body);
    const EditErrors = yield (0, class_validator_1.validate)(EditInput, { validationError: { target: true } });
    if (EditErrors.length > 0) {
        return res.status(400).json({ error: EditErrors });
    }
    const { username, address, } = EditInput;
    if (user) {
        const profile = yield customer_1.Customer.findById(user._id);
        if (profile) {
            profile.username = username;
            profile.address = address;
            const result = yield profile.save();
            return res.status(200).json({ message: "Profile update successfully." });
        }
        return res.status(400).json({ message: "Error updating profile" });
    }
    return res.status(400).json({ message: "Error updating profile" });
});
exports.EditCustomerProfile = EditCustomerProfile;
//# sourceMappingURL=customerController.js.map