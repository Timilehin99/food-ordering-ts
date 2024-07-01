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
exports.sendOTP = exports.GenerateOTP = void 0;
const GenerateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let otp_expiry = new Date();
    otp_expiry.setTime(otp_expiry.getTime() + 5 * 60000);
    return { otp_expiry, otp };
};
exports.GenerateOTP = GenerateOTP;
const sendOTP = (otp, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    // const accountSid = TWILIO_SID
    // const authToken = TWILIO_AUTH
    // const client = require('twilio')(accountSid, authToken)
    // const response = await client.message.create({
    //    body: `Your OTP is ${otp}`,
    //    from: `Foodie`,
    //    to: phoneNumber
    // })
    // return response
    console.log(otp);
});
exports.sendOTP = sendOTP;
//# sourceMappingURL=notification.js.map