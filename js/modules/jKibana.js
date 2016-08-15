var jKibana = (function ($) {
    
    // Non production
    var ELASTIC_SEARCH_HOST = 'http://172.20.17.80:9200/';
    
    /**
    * Create elastic query.
    *
    * @param {String} queryString
    * @param {Number/Timestamp} from
    * @param {Number/Timestamp} to
    * @returns {Object}
    **/
    var createElasticQuery = function (queryString, from, to) {
        return {
            "query": {
                "query_string": {"query": queryString }
            },
            "filter": {
                "range": {
                    "@timestamp": {"from": from, "to": to }
                }
            },
            "sort": {
                "@timestamp": {"order": "desc"}
            },
            "size": 500
        };
    };
    
    /**
    * Create elastic url.
    * @param {Number/Timestamp} date
    * @param {Object} query
    * @returns {String}
    **/
    var createElasticUrl = function(date, query) {
        return ELASTIC_SEARCH_HOST + "logstash-" + formatDate(date) + "/_search?source=" + JSON.stringify(query);
    };
    
    /**
    * Given a date, returns a formatted string as: "YYYY.mm.dd",
    * for example: "2016.15.08"
    *
    * @param {Object} date
    * @returns {String}
    */
    var formatDate = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        return year + "." + month + "." + day;
    };
    
    
    // TODO: this section should be on app.js
    var queryString = 'application:"ST7" AND environment:"qa1" AND type:"jsexception"';
    // Dates
    var today = new Date();
    var url = createElasticUrl(today, createElasticQuery(queryString));
    
    var xhr = new XHR(url);
    xhr.get.then(function(response) {
        console.log(response.hits);
    }, function (error) {
        console.log(error);
    });
})(window.jQuery);