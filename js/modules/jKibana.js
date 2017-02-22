var jKibana = (function () {

    console.log('jKibana instantiated...');

    // Non production
    var ELASTIC_SEARCH_NON_PROD_HOST = 'http://172.20.17.80:9200/';

    // Production
    var ELASTIC_SEARCH_PROD_HOST = 'http://172.20.4.130:9200/';

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
    * @param {String} env
    * @returns {String}
    **/
    var createElasticUrl = function(date, query, env) {
        var url = "logstash-" + formatDate(date) + "/_search?source=" + JSON.stringify(query)
        if (env == "prod") {
            return ELASTIC_SEARCH_PROD_HOST + url;
        } else {
            return  ELASTIC_SEARCH_NON_PROD_HOST + url;
        }
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

    /**
    * Search into elastic search
    *
    * @param {String} queryStrng
    * @param {Object} date
    * @param {String} env
    * @returns {Promise}
    */
    var search = function(queryString, date, env) {
        console.log(['Searching...',
            'Query String:\t' + queryString,
            'Date:\t\t\t' + date,
            'Environment:\t' + env].join('\n'));
        var url = createElasticUrl(date, createElasticQuery(queryString), env);

        var xhr = new XHR(url);
        return xhr.get;
    };

    return {
        search: search
    }
})();
