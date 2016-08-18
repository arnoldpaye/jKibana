var queryString = 'application:"ST7" AND environment:"qa1" AND type:"jsexception"';

$("#btnSearch").click(function(e) {
    $("#content").empty();
    var today = new Date();
    jKibana.search(queryString, today).then(function(response) {
        $("#content").append('<table id=\'exceptions\'>');
        $("#exceptions").append('<tr><th>ClassName</th><th>Message</th></tr>');
        var exceptions = response.hits.hits;
        console.log("Exceptions", exceptions.length);
        for (var i = 0; i < exceptions.length; i++) {
            var error = JSON.parse(exceptions[i]["_source"]["message"])["Details"]["Error"];
            $("#exceptions").append('<tr><td>' + error.ClassName + '</td><td>' + error.Message + '</td></tr>');
        }
        $("#content").append('</table>');
    }, function (error) {
        console.log(error);
    });
});
