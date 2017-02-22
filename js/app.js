// Set event listener
document.getElementById('btnSearch').addEventListener('click', onBtnSearchClick);

function onBtnSearchClick (MouseEvent) {
    var content = document.getElementById('content');
    var queryString = document.getElementById('search').value.trim();
    var today = new Date();
    var env = document.getElementById('environment').value;

    jKibana.search(queryString, today, env).then(function(response) {
        var exceptions = response.hits.hits;
        console.log('FOUND RECORDS: ' + exceptions.length);

        // Render exceptions inside of div#content element
        jKibana.render(exceptions, "content");
    }, function (error) {
        console.log("error", error);
    });
};

// Set search input value
var query = "application:'ST7' AND environment: 'qa1' AND type: 'jsexception'";
var search = document.getElementById('search');
search.value = query;

// Change environment
document.getElementById('environment').addEventListener('change', function (Event) {
    var environment = Event.target.value;
    var search = document.getElementById('search');
    search.value = "application:'ST7' AND environment: '" + environment + "' AND type: 'jsexception'";
});
