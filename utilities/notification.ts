 export const GenerateOTP = ()=>{

    const otp = Math.floor(100000 + Math.random() * 900000)
    let expiry = new Date();
    expiry.setTime(expiry.getTime() + 5 * 60_000)

    return {expiry, otp}
 }