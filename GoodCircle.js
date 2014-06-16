/*
	Represents the positive circles i.e. the ones that the player should eat.
*/

(function () {
	global.GoodCircle = fabric.util.createClass(global.BaseCircle, {
		type: "GoodCircle",

		initialize: function (opt) {
			var options = {
				fill:"green"
			};

			if (opt.hp){
				options.hp = opt.hp;
			}


			this.callSuper("initialize", options);

			this.on("added", function(){
				//this._choose_move();
			});
			this.on("intersect", function(opt) {
				var target = opt.target;
				if (target.type === "PlayerCircle"){
					this.sethp(0);
				}
			});
		},

		_render: function(ctx) {
			this.callSuper('_render', ctx);
		},

		_choose_move: function () {
			var w = global.canvas.getWidth();
			var x = Math.round(Math.random() * w);
			var h = global.canvas.getHeight();
			var y = Math.round(Math.random() * h);
			var d = Math.max( Math.abs(this.left - x) / this.speed, Math.abs(this.top - y) / this.speed);
			
			var self = this;
			this.animate({left:x,top:y},{
				onComplete: self._choose_move.bind(self),
				duration : d
			});
		}
	});
}) ();