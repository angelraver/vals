var Client = require("../models/client");

exports.getAll = function(req, res) {
  Client.find({}, 'firstName lastName gender email phone description', function (error, clients) {
	  if (error) { console.error(error); }
	  res.send({
			clients
		})
	}).sort({_id:-1})
};

exports.get = function (req, res) {
	Client.findById(req.params.id, 'firstName lastName gender email phone description', function (error, client) {
	  if (error) { console.error(error); }
	  res.send(client)
	})
}

exports.add = function(req, res) {
	var client = new Client({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    gender: req.body.gender,
    email: req.body.email,
		description: req.body.description
	})

	client.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
}

exports.update = function (req, res) {
	Client.findById(req.params.id, 'firstName lastName gender email phone description', function (error, client) {
	  if (error) { console.error(error); }

		client.firstName = req.body.firstName
		client.lastName = req.body.lastName
		client.gender = req.body.gender
		client.email = req.body.email
		client.phone = req.body.phone
		client.description = req.body.description

	  client.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
}

exports.delete = function (req, res) {
	Client.remove({
		_id: req.params.id
	}, function(err, client){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
}
