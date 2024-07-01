import { TWILIO_AUTH, TWILIO_SID } from "../config";

 export const GenerateOTP = ()=>{

    const otp = Math.floor(100000 + Math.random() * 900000)
    let otp_expiry = new Date();
    otp_expiry.setTime(otp_expiry.getTime() + 5 * 60_000)

    return {otp_expiry, otp}
 }

 export const sendOTP = async(otp: number, phoneNumber: string) => {

   // const accountSid = TWILIO_SID
   // const authToken = TWILIO_AUTH
   // const client = require('twilio')(accountSid, authToken)

   // const response = await client.message.create({
   //    body: `Your OTP is ${otp}`,
   //    from: `Foodie`,
   //    to: phoneNumber
   // })

   // return response

   console.log(otp)


 }