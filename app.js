var express = require('express');
var bodyparser = require('body-parser');
var app = express();
//var url = require('url');
var debts = require('./controller');

app.use(express.static(__dirname + '/client'));
// app.use('/scripts', express.static(__dirname + '/client/scripts'));
var jsonParser = bodyparser.json();
app.use(jsonParser);

app.get('/all', function (req, res) {
    res.set('header:', 'you got all debts array');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces', 4);
    res.set("Content-Type", "application/json");
    res.json(debts.getData());


});

app.get('/id/:Name', function (req, res) {
    res.set('header:', 'you got debt by ID');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces', 4);
    res.set("Content-Type", "application/json");
    res.json(debts.getDebtByName(req.params.Name));
});

app.get('/debtsSum', function (req, res) {
    res.set('header:', 'you got the debts-sum');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces', 4);
    res.set("Content-Type", "application/json");
    res.json(debts.debtsSum());
});

app.post('/saveDebt', function (req, res) {
    res.set('header:', 'you got the debts-sum');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces', 4);
    res.set('Content-Type', 'application/json');
    console.log(req.params);
    res.send(req.body);
});


app.listen(process.env.PORT || 3000);
console.log('listen 3000');
