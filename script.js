var wikiLink = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&namespace=0&redirects=resolve&format=json"; //make limit as options (user can chose home many results to show)
var searchText = "&search=";
var link = '';

window.onload = function() {
    //define all variables
    var checkLive = document.getElementById("check");
        checkLive.checked = false; //just to be on safe side checked set as false
    var checked = false;
    var search = document.getElementById("search");
    var submit = document.getElementById("submit");
    var liveResults = document.getElementById("livesearch");
    var results = document.getElementById("results");
/*
    all functions to be used in the code
*/
    //event adder
    function addListener(element, event, fn, capture) {
        if (!capture) {capture=false}
        element.addEventListener(event, fn, capture);
        console.log("event added to " + element.id + "; Capture: " + capture);
    };

    //event remover
    function removeListener(element, event, fn, capture) {
        if (!capture) {capture=false}
        element.removeEventListener(event, fn, capture);
        console.log("event removed from " + element.id);
    };

    function hideShowElementBlock(element, type) {
        element.style.display=type;
    };

    function clearValue(element) {
        if (element.nodeType == 1) {
            if (element.type) {
                element.value="";
            } else {
                element.innerHTML="";
            }
            console.log("Cleared: " + element.id);
        }
    }
/*
    the following is main computing
*/
    function liveResultsData(event) {
        var code = event.which||event.keyCode||event.charCode;
        console.log(search.value.length);
        if (search.value.length>1) {
            clearValue(liveResults);
            link = wikiLink + searchText + search.value;
            console.log(link);
            hideShowElementBlock(liveResults, "block");
            getJSONP(link, function(json) {
                var names = json[1];
                var desc = json[2];
                var links = json[3];
                if (!names.length) {liveResults.innerHTML="<li>Not Found</li>";}
                for (var i = 0; i < names.length; i++) {
                    var li, a, name;
                    li = document.createElement("LI");
                    a = document.createElement("A");
                    li.setAttribute("id", "item"+i+1);
                    a.setAttribute("href", links[i]);
                    a.setAttribute("target", "_blank")
                    name = document.createTextNode(names[i]);
                    a.appendChild(name);
                    li.appendChild(a);
                    liveResults.appendChild(li);
                };
            })
        } else {
            clearValue(liveResults);
            hideShowElementBlock(liveResults, "none");
        };
    };

    function populateResults() {
        clearValue(results);hideShowElementBlock(liveResults, "none"); //just to be on the safe side
        if (search.value.length) {
            link = wikiLink + searchText + search.value;
            getJSONP(link, function(json){
                var names = json[1];
                var desc = json[2];
                var links = json[3];
                if (!names.length) {results.innerHTML="<h3>Not Found</h3>";}
                for (var i = 0; i < names.length; i++) {
                    var h, p, a, div;
                    div = document.createElement("DIV");
                    h = document.createElement("H3");
                    a = document.createElement("A");
                    p = document.createElement("P");
                    h.appendChild(document.createTextNode(names[i]));
                    p.appendChild(document.createTextNode(desc[i]));
                    a.setAttribute("href", links[i]);
                    a.setAttribute("target", "_blank");
                    div.setAttribute("id", "id"+i+1);
                    a.appendChild(h);
                    a.appendChild(p);
                    div.appendChild(a);
                    results.appendChild(div);
                }
            })
        }
    };
    addListener(submit, "click", populateResults, false);

    addListener(checkLive, "click", function() {
        if (checkLive.checked) {
            removeListener(submit, "click", populateResults, false);
            hideShowElementBlock(submit, "none");
            (function() { //just little experements with self-executive fn
                clearValue(results);
                clearValue(liveResults);
                clearValue(search);
            })();
            addListener(search, "keyup", liveResultsData)
            return false;
        }
        (function() {
            clearValue(results);
            clearValue(liveResults);
            clearValue(search);
        })();
        addListener(submit, "click", populateResults, false);
        hideShowElementBlock(submit, "block");
        removeListener(search, "keyup", liveResultsData);
    }, false);
    //clear everything to be in the safe side
    (function() {
        clearValue(results);
        clearValue(liveResults);
        clearValue(search);
    })();
}

