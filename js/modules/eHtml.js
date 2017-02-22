// Module for html manipulation where exceptions are involved.
var EHtml = (function () {

    console.log('eHtml instantiated...');

    /**
    *
    * @param {Array} exceptions
    * @param {String} divId
    */
    var render = function (exceptions, divId) {
        var content = document.getElementById(divId);
        var error;
        var node;
        var textNode;
        content.innerHTML = "";
        var list = document.createElement('ul');

        for (var i = 0; i < exceptions.length; i++) {
            // Only exceptions of 'jsexception' type have this message.
            error = JSON.parse(exceptions[i]["_source"]["message"]);
            node = document.createElement('li');
            textNode = document.createTextNode(error.Details.Error.Message);
            node.appendChild(textNode);
            list.appendChild(node);
        }
        content.appendChild(list);
    };

    return {
        render: render
    }
});
