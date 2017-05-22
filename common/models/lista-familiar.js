'use strict';

module.exports = function(Listafamiliar) {

	Listafamiliar.beforeRemote("find", function(ctx, modelInstance, next) {
		//...
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;

		console.log(ctx.req.accessToken);
		Usuario.findById(ctx.req.accessToken.userId, function(err, usuario) {
			if (err) next(err);

			ctx.args.filter = {
				"where": { // include usuarios for the owner
					"id": usuario.listaFamiliarId
				}
			}
			console.log(ctx.args);
			next();

		})
	});

	Listafamiliar.afterRemote('create', function(context, listafamiliar, next) {
		
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;

		console.log(listafamiliar);

		Usuario.findById(context.req.accessToken.userId, function(err, usuario) {
			if (err) next(err);
			
			 usuario.listaFamiliarId=listafamiliar.id ;
			
		usuario.save(function(err, usserid) {
			if (err) throw err;
			console.log('asociado');
			next();
		});
		})



	});

};