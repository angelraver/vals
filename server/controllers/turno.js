var Turno = require("../models/turno");

exports.get = function(req, res) {
	let where = {}
	if(req.body.fecha) {
		where['fecha.dia'] = req.body.fecha
	}
	if(req.body.status) {
		where['status'] = req.body.status
	}
	if(req.body.idCliente) {
		where['cliente.id'] = req.body.idCliente
	}

	Turno.find(where, 'cliente tratamiento fecha', function (error, turnos) {
		if (error) console.error(error)
	  res.send(turnos)
	}).sort({"fecha.dia": 1, "fecha.hora": 1 })
};

exports.getActivos = function (req, res) {
	Turno.findById({ 'status': 'activo' }, 'cliente tratamiento fecha', function (error, turnos) {
	  if (error) console.error(error)
	  res.send(turnos)
	})
}

exports.add = function(req, res) {
	var turno = new Turno({
    cliente: req.body.cliente,
    tratamiento: req.body.tratamiento,
		fecha: req.body.fecha,
		status: 'activo',
		createdAt: new Date()
	})

	turno.save(function (error) {
		if (error) console.log(error)
		res.send({ success: true })
	})
}

exports.delete = function (req, res) {
	Turno.remove({
		_id: req.params.id
	}, function(err){
		if (err) res.send(err)
		res.send({ success: true })
	})
}
