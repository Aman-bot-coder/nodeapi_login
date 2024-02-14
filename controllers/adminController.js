const bcrypt = require('bcrypt');
const AdminModel = require('../model/adminModel');
const ResponseView = require('../views/responseView');
const adminModel = new AdminModel();

class AdminController {
  static async signup(req, res) {
    const { firstName, lastName, email, adminPassword, mobileNumber } = req.body;

    try {
      // validate mobile number ...
      const mobileNumberPattern = /^\d{10}$/;
      if (!mobileNumber.match(mobileNumberPattern)) {
        return ResponseView.error(res, 400, 'Invalid mobile number format');
      }

      // Validate email format
      const emailPattern = /\S+@\S+\.\S+/;
      if (!email.match(emailPattern)) {
        return ResponseView.error(res, 400, 'Invalid email format');
      }



      const existingAdmin = await adminModel.getAdminByMobileNumber(mobileNumber);
      const existingByemail = await adminModel.getAdminByEmail(email);
      if (existingAdmin.length > 0) {
        ResponseView.error(res, 400, 'Mobile number already exists');
      }else if(existingByemail.length> 0){
        ResponseView.error(res,400,"Email Already Exist");
      } 
      else {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const { insertId } = await adminModel.registerAdmin(firstName, lastName, email, hashedPassword, mobileNumber);
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
    const { mobileNumber, adminPassword } = req.body;

    try {
      const admin = await adminModel.getAdminByMobileNumber(mobileNumber);
      console.log(admin);
        const adminPasswordd = await adminModel.getAdminPassword(mobileNumber);
        if(adminPasswordd===null){
          ResponseView.error(res, 401, 'Mobile Number Does Not Exist');
        }else{
        const match = await bcrypt.compare(adminPassword,adminPasswordd);
        console.log(match)
        if (match) {
          req.isAdminAuthenticated = true; 
          next();
          ResponseView.success(res, 200, 'Login successful');
        } else {
          ResponseView.error(res, 401, 'Invalid Password Kindly Check Your Password Again');
        }
      }
     } catch (error) {
      ResponseView.error(res, 500, error.message);
    }
  }
  static async authenticate(req, res, next) {
    try {
      // Check if user is authenticated
      if (!req.isAdminAuthenticated) {
        return ResponseView.error(res, 401, 'Unauthorized. Please login first.');
        // You can also redirect to the login page
        // return res.redirect('/login');
    }else{
      next();
    }
     
    } catch (error) {
      ResponseView.error(res, 500, error.message);
    }
  }
}
  


module.exports = AdminController;