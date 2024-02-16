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
    static getCount(year,month,date){
      return new Promise((resolve,reject)=>{
        const query1 = 'SELECT COUNT(*) FROM geocodelogs';
        const ytdQuery = 'SELECT COUNT(*) FROM geocodelogs WHERE YEAR(timestamp) = ?';
        const mtdQuery = 'SELECT COUNT(*) FROM geocodelogs WHERE YEAR(timestamp)=? AND MONTH(timestamp)=?';
        const ftdQuery = 'SELECT COUNT(*) FROM geocodelogs WHERE YEAR(timestamp) =? AND MONTH (timestamp)=? AND DAY(timestamp)=?';
        const groupByQuery = 'SELECT success, COUNT(*) AS count FROM geocodelogs GROUP BY success';

        db.query(query1,(error,results)=>{
          if(error){
            reject(error);
            console.log(error);
          }else{
            resolve(results);
          }
        });
      });
    }
  }
  
  
  module.exports = GeoCodeModel;