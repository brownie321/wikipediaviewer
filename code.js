

//module/library is defined here

(function(window, undefined) {
    var getJSONP = function(url, method, callback) { //you may define different methods or just omit it to use default 'callback'
        url = url || "";
        method = method || "";
        callback = callback || function() {
            console.log("Error with callback function");
        };
        if (typeof method == "function") {
            callback = method;
            method = "callback";
        };

        var generatedFn = "jsonp" + Math.floor(Math.random()*101);

        window[generatedFn] = function(json) {
            callback(json);
            delete window[generatedFn];
        }

        if (!(~(url.indexOf("?")))) { //before it was if (url.indexOf("?") == -1)
            url = url + "?";
        } else {
            url = url + "&";
        }

        var script = document.createElement("script");
        var head = document.getElementsByTagName("head")[0];
        script.setAttribute("src", url + method + "=" + generatedFn);
        head.appendChild(script);


    };
    window.getJSONP = getJSONP;
})(window)

/*

//all code main code belowe
window.onload = function() {
    
    var s = document.getElementById("search");
    s.value = "";
    var wikiLink = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=15&namespace=0&redirects=resolve&format=json";
    var searchText = "&search=";
    var link = '';
    var check = document.getElementById("check");
    check.checked = ~-1; //sets false (tilde used as uniary operator and logic is as follows -(N+1))
    var liveSearch = document.getElementById("livesearch");
    var submit = document.getElementById("submit");
    var results = document.getElementById("results");


    addEventL(check, "click", clickCheck);



function clickCheck(ev) {
    ev.stopPropagation();
    if (check.checked) {
        submit.style.display="none";
        s.value = "";
        liveSearch.style.display="none";
        s.addEventListener("keyup", liveFn);
            
        liveSearch.addEventListener("click", function(ev) {
            //ev.preventDefault();
            console.log(ev.target.nodeName + " was clicked")
            console.log(ev.target.parentElement.id + " was clicked");
            console.log(ev.target.href);
        });
        //s.removeEventListener("click", liveFn);
    } else {
        s.value = "";
        submit.style.display="inline";
        liveSearch.style.display="none";
        //s.removeEventListener("click", liveFn);
        //check.removeEventListener("click", clickCheck);
    };
}


function liveFn(event) {
    var key = event.which||event.keyCode||event.charCode;
    if (!(s.value)) {
        searchText = "&search=";
    } else if (key == 8) {
        searchText = "&search=" + s.value.substring(0, s.value.length);
    } else if (key>=32 && key<=126) {
        searchText += s.value.substring(s.value.length-1);
    }
                
    if (searchText.length>=10) {
        liveSearch.style.display="block";
        link = wikiLink + searchText;
        getJSONP(link, function(json) {      
            var found = json[1];
            var desc = json[2]
            var links = json[3]; 
            var toInsert;
            for (var i = 0, disp=''; i < found.length; i++) {
                li = document.createElement("li");
                li.setAttribute("id", "r" + i);
                a = document.createElement("a");
                a.setAttribute("href", links[i]);
                t = document.createTextNode(found[i]);
                a.appendChild(t);
                li.appendChild(a);
                disp += li.outerHTML;
            };
            if (found.length<=0) {disp="Not found"};
            liveSearch.innerHTML = disp;
        });
                    //console.log("Value: ", link);
    } else if (searchText.length<=8) {
        liveSearch.style.display="none";
    };
}

function addEventL(element, event, Fn) {
    element.addEventListener(event, Fn);
    return false;
}

function removeEventL(element, event, Fn) {
    element.removeEventListener(event, Fn);
}



    submit.addEventListener("click", function(ev) {
        ev.stopPropagation();
        setTimeout(alert("working"),1000);
        console.log(wikiLink+searchText+s.value)
        getJSONP(wikiLink+searchText+s.value, function(json) {
            var found = json[1];
            var desc = json[2]
            var links = json[3];
            insertResults(found, desc, links);
        })
    })
    //function to insert received wiki descr to results fields
    function insertResults(found, desc, links) {
        
        for (var i = 0; i<found.length; i++) {
            var div = document.createElement("DIV");
            div.id = "div-results" + i;
            var h = document.createElement("H3");
            var head = document.createTextNode(found[i]);
            h.appendChild(head);
            var p = document.createElement("P");
            p.id = "p" + i;
            var a = document.createElement("A");
            a.href=links[i];
            var text = document.createTextNode(desc[i]);
            a.appendChild(text);
            p.appendChild(a);
            div.appendChild(h);
            div.appendChild(p);
            results.appendChild(div);
        }
    }
    
}

*/
