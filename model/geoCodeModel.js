const mysql2 = require('mysql2');
require('dotenv').config();

let db;
class GeoCodeModel {
    constructor() {
        db = mysql2.createConnection({
          host:"localhost",
          user:"root",
          password:"Aman@1234",
          database:"loginaugmentaa"
        });
    
        db.connect(err => {
            if(err){
                console.log(err);
            }else{ console.log('Connected to MySQL database');}
         
        });
      }


    static getByDate(year,month,date) {
      return new Promise((resolve, reject) => {
        const query = 'SELECT latitude, longitude, address, success, timestamp FROM geocodelogs WHERE YEAR(timestamp) = ? AND MONTH(timestamp) = ? AND DAY(timestamp) = ?';
      
        db.query(query, [year,month,date], (error, results) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(results);
            console.log(results);
          }
        });
      });
    }
  
    static getByYear(year) {
      return new Promise((resolve, reject) => {
        
        const query = 'SELECT latitude, longitude, address, success, timestamp FROM geocodelogs WHERE YEAR(timestamp) = ?';
       
        db.query(query, [year], (error, results) => {
          if (error) {
            console.log(error);
            reject(error);
          }else if(results.length===null) {
            resolve(null);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      });
    }
  
    static getByMonth(year, month) {
      return new Promise((resolve, reject) => {
        const query = 'SELECT latitude, longitude, address, success, timestamp FROM geocodelogs WHERE YEAR(timestamp) = ? AND MONTH(timestamp) = ?';
        db.query(query, [year, month], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    }
    static getCount(){
      return new Promise((resolve,reject)=>{
        const query1 = 'SELECT COUNT FROM '
      })
    }
  }
  
  
  module.exports = GeoCodeModel;