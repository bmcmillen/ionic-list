const express = require('express');

// Setup express and mount points for static content
const app = express();
const config = {port:9091};
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Start our server
app.listen(config.port, function(err) {
	console.log('Ionic-List:\t Listening at http://localhost:'+config.port);
});

var listItems = [
	{name:'Eggs'},
	{name:'Bread'},
	{name:'Crack'},
	{name:'SuperMeth'}
];

// Define our routes
app.get('/', allowCors, function(req,res) {
	res.json(listItems);
});

app.options('/', allowCors);
app.post('/', allowCors, function(req,res) {
	listItems.push(req.body);
	res.json(req.body);
});

app.options('/delete', allowCors);
app.post('/delete', allowCors, function(req,res) {
	listItems.splice(req.body.index,1);          //splice at (item, position)
	res.json(req.body);
});

function allowCors(req,res,next) {
	console.log('allowCors()\t url=%j,\t method=%j', req.originalUrl,req.method);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	if(req.method==='OPTIONS') return res.sendStatus(200);
	next();
};
