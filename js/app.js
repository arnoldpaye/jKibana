var queryString = 'application:"ST7" AND environment:"qa1" AND type:"jsexception"';
var today = new Date();

jKibana.search(queryString, today).then(function(response) {
    console.log(response, $);
}, function (error) {
    console.log(error);
});
