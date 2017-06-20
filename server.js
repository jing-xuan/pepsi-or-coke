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
})

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
