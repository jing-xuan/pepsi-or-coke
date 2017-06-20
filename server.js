var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "yourDBpassword",
  database: "yourDB"
});

app.get('/form', function(req, res){
	res.sendFile(__dirname+'/'+'form.html');
})

app.post('/submit', urlencodedParser, function(req, res){
	response = {
		'studentID' : req.body.studentID,
		'sampleID' : req.body.sampleID,
		'drink1' : req.body.drink1,
		'drink2' : req.body.drink2
	}
	console.log(response);
	/**con.connect(function(err){
  		if(err){
    		console.log(err);
    		return;
  		}
  		console.log('Connection established');
	});**/
  con.query('SELECT * FROM response WHERE sampleID = ?', response['sampleID'], function(err, rows){
		if(err) throw err;
    console.log(rows);
		if(rows.length != 0){
      res.send("Repeated Sample ID");
    }
    else{
      con.query('SELECT * FROM options WHERE sampleID = ?', response['sampleID'], function(err, rows){
        if(err) throw err;
        if(rows.length == 0){
          res.send("Invalid Sample ID");
        }
        else{
          con.query('INSERT INTO response SET ?', response, function(err, res){
        		if(err) throw err;
        		console.log('inserted into database');
        	});
        	res.send('Your response has been recorded');
        }

      });
    }
	});
})

//populate samples
/**app.get('/populateTable', function(req, res){
	con.connect(function(err){
  		if(err){
    		console.log('Error connecting to Db');
    		return;
  		}
  		console.log('Connection established');
	});
	for(i = 1; i<=300; i++){
		if((Math.floor((Math.random() * 10) + 1))%2 == 0){
			option = {
				'sampleID' : i,
				'A' : 'Coke',
				'B' : 'Pepsi'
			};
		}
		else{
			option = {
				'sampleID' : i,
				'A' : 'Pepsi',
				'B' : 'Coke'
			};
		}
		con.query('INSERT INTO options SET ?', option, function(err, res){
			if(err) throw err;
			console.log('okay');
		});
	}
	console.log('table populated');
	res.send('table populated');
})**/

//populate responses for testing
/**app.get('/populateTable', function(req, res){
	con.connect(function(err){
  		if(err){
    		console.log('Error connecting to Db');
    		return;
  		}
  		console.log('Connection established');
	});
	for(i = 1; i<=100; i++){
		if((Math.floor((Math.random() * 10) + 1))%2 == 0){
			if((Math.floor((Math.random() * 10) + 1))%2 == 0){
				option = {
					'studentID' : i,
					'sampleID' : i,
					'drink1' : 'Coke',
					'drink2' : 'A'
				};
			}
			else{
				option = {
					'studentID' : i,
					'sampleID' : i,
					'drink1' : 'Coke',
					'drink2' : 'B'
				};
			}
		}
		else{
			if((Math.floor((Math.random() * 10) + 1))%2 == 0){
				option = {
					'studentID' : i,
					'sampleID' : i,
					'drink1' : 'Pepsi',
					'drink2' : 'A'
				};
			}
			else{
				option = {
					'studentID' : i,
					'sampleID' : i,
					'drink1' : 'Pepsi',
					'drink2' : 'B'
				};
			}
		}
		con.query('INSERT INTO response SET ?', option, function(err, res){
			if(err) throw err;
			console.log('okay');
		});
	}
	console.log('table populated');
	res.send('table populated');
})**/

app.get('/data', function(req, res){
  var data=[[{"sampleID":1,"A":"Coke","B":"Pepsi"},{"sampleID":2,"A":"Coke","B":"Pepsi"},{"sampleID":3,"A":"Coke","B":"Pepsi"},{"sampleID":4,"A":"Pepsi","B":"Coke"},{"sampleID":5,"A":"Pepsi","B":"Coke"},{"sampleID":6,"A":"Coke","B":"Pepsi"},{"sampleID":7,"A":"Coke","B":"Pepsi"},{"sampleID":8,"A":"Coke","B":"Pepsi"},{"sampleID":9,"A":"Coke","B":"Pepsi"},{"sampleID":10,"A":"Coke","B":"Pepsi"},{"sampleID":11,"A":"Coke","B":"Pepsi"},{"sampleID":12,"A":"Coke","B":"Pepsi"},{"sampleID":13,"A":"Pepsi","B":"Coke"},{"sampleID":14,"A":"Coke","B":"Pepsi"},{"sampleID":15,"A":"Pepsi","B":"Coke"},{"sampleID":16,"A":"Coke","B":"Pepsi"},{"sampleID":17,"A":"Coke","B":"Pepsi"},{"sampleID":18,"A":"Coke","B":"Pepsi"},{"sampleID":19,"A":"Pepsi","B":"Coke"},{"sampleID":20,"A":"Pepsi","B":"Coke"},{"sampleID":21,"A":"Coke","B":"Pepsi"},{"sampleID":22,"A":"Pepsi","B":"Coke"},{"sampleID":23,"A":"Coke","B":"Pepsi"},{"sampleID":24,"A":"Coke","B":"Pepsi"},{"sampleID":25,"A":"Coke","B":"Pepsi"},{"sampleID":26,"A":"Coke","B":"Pepsi"},{"sampleID":27,"A":"Pepsi","B":"Coke"},{"sampleID":28,"A":"Coke","B":"Pepsi"},{"sampleID":29,"A":"Pepsi","B":"Coke"},{"sampleID":30,"A":"Coke","B":"Pepsi"}],[{"studentID":"h1710011","sampleID":17,"drink1":"Pepsi","drink2":"A"},{"studentID":"h1710013","sampleID":4,"drink1":"Pepsi","drink2":"B"},{"studentID":"h1710016","sampleID":15,"drink1":"Coke","drink2":"A"},{"studentID":"h1710022","sampleID":6,"drink1":"Coke","drink2":"B"},{"studentID":"h1710028","sampleID":8,"drink1":"Coke","drink2":"A"},{"studentID":"h1710044","sampleID":3,"drink1":"Pepsi","drink2":"A"},{"studentID":"h1710047","sampleID":18,"drink1":"Pepsi","drink2":"B"},{"studentID":"h1710051","sampleID":13,"drink1":"Pepsi","drink2":"A"},{"studentID":"H1710056","sampleID":14,"drink1":"Coke","drink2":"A"},{"studentID":"h1710076","sampleID":25,"drink1":"Coke","drink2":"A"},{"studentID":"h1710096","sampleID":21,"drink1":"Coke","drink2":"B"},{"studentID":"h1710100","sampleID":5,"drink1":"Coke","drink2":"A"},{"studentID":"h1710103","sampleID":7,"drink1":"Coke","drink2":"B"},{"studentID":"h1710109","sampleID":16,"drink1":"Pepsi","drink2":"B"},{"studentID":"h1710111","sampleID":10,"drink1":"Pepsi","drink2":"A"},{"studentID":"h1710115","sampleID":20,"drink1":"Coke","drink2":"A"},{"studentID":"h1710116","sampleID":22,"drink1":"Coke","drink2":"A"},{"studentID":"h1710119","sampleID":24,"drink1":"Pepsi","drink2":"A"},{"studentID":"h1710120","sampleID":19,"drink1":"Coke","drink2":"B"},{"studentID":"h1710131","sampleID":9,"drink1":"Coke","drink2":"A"},{"studentID":"h1710149","sampleID":23,"drink1":"Coke","drink2":"A"}]];
  res.json(data);
})
/**app.get('/data', function(req, res){
	var data = [];
	con.query('SELECT *FROM options', function(err, rows){
		if(err) throw err;
		console.log('data received');
		data.push(rows);
		console.log(rows);
	});
	con.query('SELECT *FROM response', function(err, rows){
		if(err) throw err;
		data.push(rows);
		console.log(data);
		console.log('data is complete');
		res.json(data);
	})
})**/

app.get('/showData', function(req,res){
  res.sendFile(__dirname+'/'+'Data.html');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   con.connect(function(err){
   		if(err){
     		console.log('Error connecting to Db');
     		return;
   		}
   		console.log('Connection established');
 	});
   console.log("Example app listening at http://%s:%s", host, port)
})
