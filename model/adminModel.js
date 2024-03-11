const mysql2 = require('mysql2');
require('dotenv').config();


class AdminModel {
  constructor() {
    this.db = mysql2.createConnection({
      host:"localhost",
      user:"root",
      password:"Aman@1234",
      database:"loginaugmentaa"
    });

    this.db.connect(err => {
        if(err){
            console.log(err);
        }else{ console.log('Connected to MySQL database');}
     
    });
  }

  registerAdmin(firstName, lastName, email, mobileNumber) {
    return new Promise((resolve, reject) => {
      this.db.query('INSERT INTO adminregister (firstName, lastName, email, mobileNumber) VALUES (?, ?, ?, ?)', [firstName, lastName, email, mobileNumber], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  getAdminByMobileNumber(mobileNumber) {
    return new Promise((resolve, reject) => {
        this.db.query('SELECT * FROM adminregister WHERE mobileNumber = ?', [mobileNumber], (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

getAdminByEmail(email) {
    return new Promise((resolve, reject) => {
        this.db.query('SELECT * FROM adminregister WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

    getAdminById(id){
      return new Promise((resolve,reject)=>{
        this.db.query('SELECT * FROM adminregister WHERE id =?',[id],(err,results)=>{
          if (err) {
            console.error('Error fetching admin by ID:', err);
            reject(err);
        } else {
            resolve(results[0]); 
            console.log(results[0]);
        }

        });
          
       
      });
    }
    // getAdminPassword(mobileNumber){
    //   return new Promise((resolve,reject)=>{
    //     this.db.query('SELECT adminPassword FROM adminregister WHERE mobileNumber = ?',[mobileNumber],(err,results)=>{
    //       if(err){
    //         console.log("Sorry Could not get the adminPassword",err);
    //         reject(err);
    //       }else{
    //         if (results.length === 0) {
    //           resolve(null)
    //       } else {
    //           const adminPassword = results[0].adminPassword;
    //           resolve(adminPassword);
    //       }
    //       }
    //     })
    //   });
    // }

    getUser(mobileNumber){
      return new Promise((resolve,reject)=>{
        this.db.query('SELECT * FROM adminregister WHERE mobileNumber = ?',[mobileNumber],(err,result)=>{
          if(err){
            console.log(err)
            reject(err);
          }else{
            console.log(result);
            resolve(result);
          }
        });

      })
    }
    savedOtp(mobileNumber,Otp){
      return new Promise (async (resolve,reject)=>{
        let connection;
        const checkD =  await this.checkDuplicates(mobileNumber);
        console.log(checkD);
        try{
            if (checkD.length === 0) {

                console.log('There is no duplicate ... Inserting the new record');
                this.db.query(`INSERT INTO otpservice (mobileNumber, otp) VALUES (?, ?)`, [mobileNumber, Otp], (err, result) => {
                    if (err) {
                        reject(err);
                        console.error(err);
                    } else {
                        resolve(result);
                        console.log(result);
                    }
        });
        }else{
          console.log('Found Duplicate record now updating the otp....');
          this.db.query(`UPDATE otpservice SET otp = ? WHERE mobileNumber = ?`, [Otp, mobileNumber], (err, result) => {
              if (err) {
                  reject(err);
                  console.error(err);
              } else {
                  resolve(result);
                  console.log(result);
              }
          });
        }
      }catch(err){
        console.log(err)
      }
      
        

      });
    }  
  checkDuplicates(mobileNumber){
      return new Promise((resolve,reject)=>{
        const checkDups = 'Select * From otpservice where mobileNumber = ?';
        this.db.query(checkDups,[mobileNumber],(err,result)=>{
          if(err){
            reject(err);
          }else{
            resolve(result);
          }
        })
      })
    }
    
  verifyOtp(mobileNumber,otp){
    return new Promise((resolve,reject)=>{
      this.db.query(`Select otp from otpservice where mobileNumber = ${mobileNumber}`,(err,result)=>{
        if(err){
          reject(err);
          console.log(err);
        }else{
          resolve(result);
          console.log(result);
        }
      });
    });
  }
  


 
}


module.exports = AdminModel;