"use strict";

function setupKeyInProvidedObject(obj, objectToSetup) {
    var paramKeys = Object.keys(obj);
    for(var counter=0,counterLength=paramKeys.length;counter<counterLength;counter+=1) {
        objectToSetup[paramKeys[counter]] = obj[paramKeys[counter]];
    }
}

function prepareParamObject(req, res, next){
    req.getInputObject = function(){
        var params = {};
        if(this.params) {
            setupKeyInProvidedObject(this.params, params);
        }
        if(this.body) {
            setupKeyInProvidedObject(this.body, params);
        }
        if(this.query) {
            setupKeyInProvidedObject(this.query, params);
        }
        return params;
    };
    next();
}

module.exports = prepareParamObject;
