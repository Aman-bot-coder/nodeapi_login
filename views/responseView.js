class ResponseView {
    static success(res, status, message,data,token) {
      res.status(status).json(({
        success:"true",
        message:message,
        data:data,
        token:token
        
      }))
    }
  
    static error(res, status, message) {
      res.status(status).json({ error: message });
    }
  }
  
  module.exports = ResponseView;