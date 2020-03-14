var Tratamiento = require("../models/tratamiento");

exports.getAll = function(req, res) {
  Tratamiento.find({}, '', function (error, tratamientos) {
	  if (error) { console.error(error); }
	  res.send({
			tratamientos
		})
	}).sort({_id:-1})
};

exports.get = function (req, res) {
	Tratamiento.findById(req.params.id, '', function (error, tratamiento) {
	  if (error) { console.error(error); }
	  res.send(tratamiento)
	})
}

exports.add = function(req, res) {
	var tratamiento = new Tratamiento({
		titulo: req.body.titulo,
		descripcion: req.body.descripcion,
		precio: req.body.precio,
		duracion: req.body.duracion
	})

	tratamiento.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
}

exports.update = function (req, res) {
	Tratamiento.findById(req.params.id, 'titulo, descripcion, precio, duracion', function (error, tratamiento) {
	  if (error) { console.error(error); }
		tratamiento.titulo = req.body.titulo
		tratamiento.descripcion = req.body.descripcion
		tratamiento.precio = req.body.precio
		tratamiento.duracion = req.body.duracion

	  tratamiento.save(function (error) {
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
	Tratamiento.remove({
		_id: req.params.id
	}, function(err, tratamiento){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
}
