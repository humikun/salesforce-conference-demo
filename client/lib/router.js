var router = (function () {

    "use strict";

    var routes = [];

    function addRoute(route, handler) {
        console.log('***************[router]***************')
        console.log('method:['+'addRoute'+']:start-->')
        routes.push({parts: route.split('/'), handler: handler});
        console.log('<--method:['+'addRoute'+']:end')
    }

    function load(route) {
        console.log('***************[router]***************')
        console.log('method:['+'load'+']:start-->')
        window.location.hash = route;
        console.log('<--method:['+'addRoute'+']:end')
    }

    function start() {
        console.log('***************[router]***************')
        console.log('method:['+'start'+']:start-->')
        console.log('window.location.hash:'+window.location.hash)
        var path = window.location.hash.substr(1),
            parts = path.split('/'),
            partsLength = parts.length;

        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            if (route.parts.length === partsLength) {
                var params = [];
                for (var j = 0; j < partsLength; j++) {
                    if (route.parts[j].substr(0, 1) === ':') {
                        params.push(parts[j]);
                    } else if (route.parts[j] !== parts[j]) {
                        break;
                    }
                }
                if (j === partsLength) {
                    route.handler.apply(undefined, params);
                    return;
                }
            }
        }
        console.log('<--method:['+'start'+']:end')
    }

    $(window).on('hashchange', start);

    return {
        addRoute: addRoute,
        load: load,
        start: start
    };

}());
