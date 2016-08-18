var XHR = function (url) {
    
    console.log('XHR instantiated...');
    
    /**
    * @param {String} method
    * @param {String} url
    * @returns {Promise}
    */
    var promisedRequest = function (method, url) {
        var promise = new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            
            request.onload = function() {
                //console.log('onload');
            };
            
            request.onerror = function() {
                //TODO: reject it
                console.log('onerror');
            };
            
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        var response = JSON.parse(request.responseText);
                        resolve(response);
                    } else {
                        reject(request.statusText);
                    }
                }
            };
            
            request.open(method, url);
            request.send();
        });
        return promise;
    };
    
    return {
        get: promisedRequest('GET', url),
        post: promisedRequest('POST', url)
    }
};
