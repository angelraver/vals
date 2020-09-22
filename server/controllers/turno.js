var Turno = require("../models/turno");

exports.getByFecha = function(req, res) {
	Turno.find({ "fecha.dia": req.body.fecha },
		'cliente tratamiento fecha', function (error, turnos) {
	  if (error) { console.error(error); }
	  res.send({
			turnos
		})
	})
};

exports.get = function (req, res) {
	Turno.findById(req.params.id, 'firstName lastName gender email phone description', function (error, turno) {
	  if (error) { console.error(error); }
	  res.send(turno)
	})
}

exports.add = function(req, res) {
	var turno = new Turno({
    cliente: req.body.cliente,
    tratamiento: req.body.tratamiento,
    fecha: req.body.fecha
	})

	turno.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
}

exports.delete = function (req, res) {
	Turno.remove({
		_id: req.params.id
	}, function(err, turno){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
}
