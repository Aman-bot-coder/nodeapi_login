const { default: axios } = require('axios');
const send = require('axios');
const { response } = require('express');
class optService {
    static generateOTP() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    static async sendOtp(mobileNumber,otp){
    // const tempId = '1207170712940147856'
 let msg = `Your OTP for login into GeoCode is ${otp}. Valid for 10 minutes. Please do not share with anyone.Regards,Augmentaa Digital`

    // const smsUri = `https://smsdigiwhiff.com/SMSApi/send?userid=augmentapi&password=Swanswan@@@1&sendMethod=quick&mobile=${mobileNumber}&msg=${msg}&senderid=AUGMEV&msgType=text&dltEntityId=1201170324712333916&dltTemplateId=1207170712940147856&duplicatecheck=true&output=json`
    // const response = await axios.post(smsUri);
    // console.log(response);            // this link is perfectly work , commenting it down for implemenet other services 
    return true;
   
}

    
}


module.exports = optService;