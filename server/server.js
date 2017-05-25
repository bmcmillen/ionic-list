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

listItems.forEach((item,index) => {
	item.id = index+1;
});

function getItemById (id) {					//function that finds the item with the id we pass to it
	var matched = listItems.filter(item => item.id===id)	//take listItems and keep only where item.id matches what we passed
	return matched.pop();
}

function removeItem (item) {
	var index = listItems.indexOf(item);
	listItems.splice(index,1);
}

function reserveItem (item) {
	item.reserved = !item.reserved;
}

// Define our routes
app.get('/', allowCors, function(req,res) {
	res.json(listItems);
});

app.get('/:id', allowCors, function(req,res) {
	var item = getItemById(parseInt(req.params.id)); //req.params.id is currently a string, convert to number
	res.json(item);
});

app.options('/', allowCors);
app.post('/', allowCors, function(req,res) {
	listItems.push(req.body);
	res.json(req.body);
});

app.options('/delete', allowCors);
app.post('/delete', allowCors, function(req,res) {
	var id = req.body.id;
	var item = getItemById(id);
	removeItem(item);
	res.json(item);
});

app.options('/reserve', allowCors);
app.post('/reserve', allowCors, function(req,res) {
	var id = req.body.id;				//define the index of the item
	var item = getItemById(id);		//define item as the current indexed listItem
	reserveItem(item);			//reverse the state of reserved t/f
	res.json(item);						    //Send data back to front end
});

function allowCors(req,res,next) {
	console.log('allowCors()\t url=%j,\t method=%j', req.originalUrl,req.method);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	if(req.method==='OPTIONS') return res.sendStatus(200);
	next();
};
