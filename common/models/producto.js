'use strict';

module.exports = function(Producto) {
	
	Producto.observe("before save", function(ctx, next) {
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;
		if(ctx.isNewInstance){
		Usuario.findById(ctx.options.accessToken.userId, function(err, usuario) {
			if (err) next(err);
			if(ctx.instance){
				ctx.instance.listaFamiliarId = usuario.listaFamiliarId;
			}
			next();
		})
	  }else{
	  	next();
	  }
	})

Producto.limpiarlista = function(ctx,callback) {
  var productos;

  	var app = require('../../server/server.js')
	var Usuario = app.models.Usuario;


	Usuario.findById(ctx.req.accessToken.userId, function(err, usuario){
			if (err) cb(err);
			console.log(usuario);
				

				Producto.updateAll({listaFamiliarId: usuario.listaFamiliarId }, {comprar: false}, function(err, info) {
    				if (err) cb(err);


				  callback(null, info);

			
			});
	


  // TODO
  
  
});

};

/**
 * limpiar producto de la lista
 * @param {Function(Error, array)} callback
 */

 /**
 * limpiando un producto en concreto
 * @param {Function(Error, boolean)} callback
 */

Producto.prototype.limpiarproducto = function(callback) {
  var producto;
  // TODO

  this.comprar=!this.comprar;

  this.save(function(err, productocambiado){

  		if (err) cb(err);

  		callback(null, productocambiado);

	});
};


}
