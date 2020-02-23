var Post = require("../models/post");

exports.getAll = function(req, res) {
  Post.find({}, 'title description', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
};

exports.addPost = function(req, res) {
	var post = new Post({
		title: req.body.title,
		description: req.body.description
	})

	post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
}

exports.updatePost = function (req, res) {
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }
	  post.title = req.body.title
	  post.description = req.body.description
	  post.save(function (error) {
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
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
}

exports.getPost = function (req, res) {
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
}



import Api from '@/services/Api'

export default {
  fetchClients () {
    return Api().get('clients')
  },

  addClient (params) {
    return Api().post('client_add', params)
  },

  updateClient (params) {
    return Api().put('client/' + params.id, params)
  },

  getClient (params) {
    return Api().get('client/' + params.id)
  },

  deleteClient (id) {
    return Api().delete('client/' + id)
  }
}
