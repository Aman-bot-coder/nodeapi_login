
const GeoCodeModel = require('../model/geoCodeModel');
const ResponseView = require('../views/responseView');
const geoCodeModel = new GeoCodeModel();
class geocodeController {
    static async getByDate(req, res) {
      const { year,month,date } = req.body;
      try{
        const result = await GeoCodeModel.getByDate(year,month,date);
        if(result===null){
          console.log(result);
          ResponseView.error(res,500,"Record Does not Exist");
      }else{
        if(result==null){
          ResponseView.success(res,500,'Error',result);
        }else if(result){
              ResponseView.success(res,200,'Sucessful',result);
          }else{
              ResponseView.error(res,400);
          } 
      }
      }catch(error){

      }
     

      
      
      };
    
  
    static async getByYear(req, res) {
      const { year } = req.body;
      try{
        const result = await GeoCodeModel.getByYear(year);
        if(result===null){
            console.log(result);
            ResponseView.error(res,400,"Invaid Year");
        }else{
            if(result){
                ResponseView.success(res,200,'Sucessful',result);
            }else{
                ResponseView.error(res,400);
            }  
        }
        
        
      }catch (err){
        console.log(err);


      }
    }
  
    static async getByMonth(req, res) {
      const { year, month } = req.body;
     try{
        const result = await GeoCodeModel.getByMonth(year,month);
        if(result){
            ResponseView.success(res,200,'Get the data by month',result);
        }else{
            ResponseView.success(res,401,'Did not fetch the data',result);
        }

            
        
  }catch(err){
    console.log(err);
  }
}
}
  
  module.exports = geocodeController;
