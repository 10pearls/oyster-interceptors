"use strict";

/* jshint ignore:start */
function getFailedResponse(err, req){
  var error_message;
  var http_code = err.httpCode ? err.httpCode : 500;

  if(http_code === 500){
    if(global.showExceptionToClient){
      error_message = err.error_message ? err.error_message : err;
    }
    else{
      error_message = global.internalServerErrorMessage || "Oh something bad happend on server, Please contact to system administrator";
    }
  }
  else{
    error_message = err.error_message;
  }

  if(error_message.constructor.toString().indexOf("Array") === -1){
    var temp_message = error_message;
    error_message = [];
    error_message.push(temp_message);
  }

  //specific to project
  for(var i = 0; i < error_message.length; i++) {
    error_message[i] = req.__(error_message[i]);
  }

  return {
    meta: {
      code: http_code,
      message: error_message
    }
  };
}

function errorHandler(err, req, res, next) {
  var failed_response = getFailedResponse(err, req);
  res.status( failed_response.meta.code ).send( failed_response );
  if(failed_response.meta.code === 500){
    global.Logger.crash(err);
  }
}

/* jshint ignore:end */

/* jshint ignore:start */
module.exports = errorHandler;
/* jshint ignore:end */
