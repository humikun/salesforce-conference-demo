console.log('-----------------------------------server.js-----------------------------------');
var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express(),

    appId = process.env.APP_ID;



app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));


app.get('/appid', function(req, res) {
    console.log('method:['+'get'+']:start-->')
    res.send({appId: appId})
    console.log('appId:'+process.env.APP_ID)
    console.log('<--method:['+'get'+']:end')
});

app.all('*', function (req, res, next) {
        console.log('method:['+'all'+']:start-->')
        var targetURL = req.header('Target-URL');
        console.log('targetURL:'+targetURL)
        if (!targetURL) {
            console.log('refused!')
            res.send(500, { error: 'There is no Target-Endpoint header in the request' });
            console.log('refused end!')
            console.log('<--method:['+'all'+']:end')
            return;
        }
        console.log('accepted!')
        request({ url: targetURL + req.url, method: req.method, json: req.body, headers: {'Authorization': req.header('Authorization')} },
            function (error, response, body) {
                if (error) {
                    console.error('error: ' + response.statusCode)
                }
            }).pipe(res);
        console.log('<--method:['+'all'+']:end')
});


// [1]
app.set('port', process.env.PORT || 8200);
// [2]
app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});
console.log('-----------------------------------server.js-----------------------------------');
