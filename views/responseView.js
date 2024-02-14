class ResponseView {
    static success(res, status, message,data) {
      res.status(status).json(({
        success:"true",
        message:message,
        data:data
      }))
    }
  
    static error(res, status, message) {
      res.status(status).json({ error: message });
    }
  }
  
  module.exports = ResponseView;