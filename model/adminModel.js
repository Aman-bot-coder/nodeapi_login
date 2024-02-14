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

  registerAdmin(firstName, lastName, email, adminPassword, mobileNumber) {
    return new Promise((resolve, reject) => {
      this.db.query('INSERT INTO adminregister (firstName, lastName, email, adminPassword, mobileNumber) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, email, adminPassword, mobileNumber], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  getAdminByMobileNumber(mobileNumber) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM adminregister WHERE mobileNumber = ?', [mobileNumber], (err, results) => {
        if (err) reject(err);
        resolve({ insertId: results.insertId, results });
      });
    });
  }
  getAdminByEmail(email){
    return new Promise((resolve,reject)=>
      this.db.query('SELECT * FROM adminregister WHERE email = ?',[email],(err,results)=>{
        if(err) reject(err);
        resolve(results);
      })
    )};

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
    getAdminPassword(mobileNumber){
      return new Promise((resolve,reject)=>{
        this.db.query('SELECT adminPassword FROM adminregister WHERE mobileNumber = ?',[mobileNumber],(err,results)=>{
          if(err){
            console.log("Sorry Could not get the adminPassword",err);
            reject(err);
          }else{
            if (results.length === 0) {
              resolve(null)
          } else {
              const adminPassword = results[0].adminPassword;
              resolve(adminPassword);
          }
          }
        })
      });
      
  


  }
}


module.exports = AdminModel;