(function (){
	global.NonPlayerCircle = fabric.util.createClass (global.BaseCircle, {
		type: "NonPlayerCircle",
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
		},

		initialize:function (options) {
			this.callSuper("initialize", options);

			this.on("added", function(){
				this._choose_move();
			});
		}
	})
}) ();