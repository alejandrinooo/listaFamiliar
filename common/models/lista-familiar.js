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

	//asociar al ususario autenticado la lista recien creada

	Listafamiliar.beforeRemote("prototype.__link__solicitudes", function(ctx, modelInstance, next) {
		//...
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;

		ctx.args.fk = ctx.req.accessToken.userId;
		next();
	});
/*

	Listafamiliar.beforeRemote("create", function(ctx, modelInstance, next) {
		//...
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;

		modelInstance.=
		next();
	});

*/

	Listafamiliar.observe('before save', function (ctx, next) {
		if (ctx.isNewInstance) {
			if (ctx.instance) {
				
				ctx.instance.owner =  ctx.options.accessToken.userId;
			}
		}
		next();
	});


	//asociar al ususario autenticado la lista recien creada

	Listafamiliar.afterRemote("create", function(ctx, modelInstance, next) {
		//...
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;
		Usuario.findById(ctx.req.accessToken.userId, function(err, usuario) {
			if (err) next(err);

			usuario.listaFamiliarId = modelInstance.id;
			

			usuario.save(function(err, callback){
				if (err) next(err);
				next()
			});
		})
	});

};
