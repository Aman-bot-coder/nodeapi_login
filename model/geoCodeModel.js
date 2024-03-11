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
    static getCount(year, month, date) {
          const query1 = 'SELECT COUNT(*) FROM geocodelogs';
          const ytdQuery = 'SELECT COUNT(*) FROM geocodelogs WHERE YEAR(timestamp) = ?';
          const mtdQuery = 'SELECT COUNT(*) FROM geocodelogs WHERE YEAR(timestamp)=? AND MONTH(timestamp)=?';
          const ftdQuery = 'SELECT COUNT(*) FROM geocodelogs WHERE YEAR(timestamp) =? AND MONTH (timestamp)=? AND DAY(timestamp)=?';
          const groupByQuery = 'SELECT success, COUNT(*) AS count FROM geocodelogs GROUP BY success';
          const response = {};
          db.query(query1,(error1,result1)=>{
            if(error1){
              console.log(error1);
              callback(error1,null)
              response['query1_error'] = "Some Error Occured While Fetching the Count Data";
            }else{
              response['GetAllCount'] = result1;
            }
          })
            
            db.query(ytdQuery,[year],(err2,result2)=>{
            if(err2){
              console.log(err2);
              callback(err2,null)
              response['ytd_count'] ='Some Error Occured';

            }else{
              response['ytd_count'] = result2;
            }
          });
            
          db.query(mtdQuery,[year],[month],(err3,result3)=>{
            if(err3){
              console.log(err3);
              callback(err3,null)
              response['mtd_count'] = 'Some Error Occured';
            }else{
              response['mtd_count'] = result3;
            }
          });

            

          db.query(ftdQuery,[year],[month],[date],(err4,result4)=>{
            if(err4){
              console.log(err4);
              callback(err4,null)
              response['ftd_count']='Some Error Occured'
            }else{
              response['ftd_count'] = result4;
              callback(null,response);
            }
          });
        }
      }
  module.exports = GeoCodeModel;