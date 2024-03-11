const bcrypt = require('bcrypt');
const AdminModel = require('../model/adminModel');
const ResponseView = require('../views/responseView');
const adminModel = new AdminModel();
const jwt = require('jsonwebtoken');
const optService = require('../services/optService');
const { json } = require('express');
const moment = require('moment-timezone');
const secretKey = 'Persh@1234'

class AdminController {
  static async signup(req, res) {
    const { firstName, lastName, email, mobileNumber } = req.body;

    try {
      // validate mobile number ...
      const mobileNumberPattern = /^(?!0|1|2|3|4|5)\d{10}$/;
      if (!mobileNumber.match(mobileNumberPattern)) {
        return ResponseView.error(res, 400, 'Invalid mobile number format');
      }

      // Validate email format
      const emailPattern = /\S+@\S+\.\S+/;
      if (!email.match(emailPattern)) {
        return ResponseView.error(res, 400, 'Invalid email format');
      }

      const existingAdminPromise = adminModel.getAdminByMobileNumber(mobileNumber);
      const existingByEmailPromise = adminModel.getAdminByEmail(email);
  
      const [existingAdmin, existingByEmail] = await Promise.all([existingAdminPromise, existingByEmailPromise]);
  
      if (existingAdmin !== null) {
          ResponseView.error(res, 400, 'Mobile number already exists');
      } else if (existingByEmail.length > 0) {
          ResponseView.error(res, 400, "Email Already Exist");
      }
      else {
        const { insertId } = await adminModel.registerAdmin(firstName, lastName, email, mobileNumber);
        // sendVerifyEmail(firstName,lastName,email,insertId);
        const registerAdmin = await adminModel.getAdminById(insertId);
        console.log(registerAdmin);

        console.log(insertId);
        ResponseView.success(res, 201, 'Admin registered successfully',registerAdmin);
      }
    } catch (error) {
      ResponseView.error(res, 500, error.message);
    }
  }

  static async login(req, res) {
    const { mobileNumber} = req.body;

    try {
      const admin = await adminModel.getAdminByMobileNumber(mobileNumber);
      console.log(admin);
      if(!admin){
        return ResponseView.error(res,400,'Mobile Number Does not exist');
      }else{
        const otp = optService.generateOTP();
        console.log(otp);
        try{
          const send = optService.sendOtp(mobileNumber,otp);
          console.log(send)
        }catch(error){
          console.log(`Error Sending the message`)
        }
        const send = optService.sendOtp(mobileNumber,otp);
        if(send){
          
          const savedService = await adminModel.savedOtp(mobileNumber,otp);
          console.log(savedService)
          if(savedService){
            ResponseView.success(res,200,'Otp Send Sucessfully, Please Verify the otp',otp);
          }else{
            ResponseView.error(res,400,'Some Error Occured');
          }
        }else{
          ResponseView.error(res,400,'Error Sending the OTP');
        }
        }   
        }catch (error) {
      ResponseView.error(res, 500, error.message);
    }
  }
  static async verifyOTPService(req,res){
    const{mobileNumber,otp} = req.body;
    if(req.body.mobileNumber==null||req.body.otp==null){
      ResponseView.error(res,400,'Kindly add mobile Number and OTP');
    }
    const verifyNumber = await adminModel.getAdminByMobileNumber(mobileNumber)
    if(!verifyNumber){
      ResponseView.error(res,400,'Mobile Number is not valid')
    }else{
      const verifyuser = await adminModel.verifyOtp(mobileNumber,otp);
      const orignalOtp = verifyuser[0].otp
      if(otp===orignalOtp){
        const token =  jwt.sign({verifyNumber},secretKey);
        console.log(token);
        ResponseView.success(res,200,'Otp has been verified',verifyNumber,token);
        
      }else{
        ResponseView.error(res,400,'Invalid Otp');
      }
    }
    
  }
  
}
  


module.exports = AdminController;