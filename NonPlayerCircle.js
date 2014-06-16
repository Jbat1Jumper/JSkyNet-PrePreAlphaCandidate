(function (){
	global.NonPlayerCircle = fabric.util.createClass (global.BaseCircle, {
		type: "NonPlayerCircle",
		_choose_move: function () {
			var opt = [
				"+=" + this.speed,
				"-=" + this.speed
			];

			var properties_to_animate = { };

			var i = Math.floor(opt.length * Math.random());
			properties_to_animate.left = opt[i];
			var w = global.canvas.getWidth();
			if (this.left + this.speed > w){
				properties_to_animate.left = "-=" + this.speed;
			}
			if (this.left - this.speed < 0){
				properties_to_animate.left = "+=" + this.speed;
			}

			i = Math.floor(opt.length * Math.random());
			properties_to_animate.top = opt[i];			
			var h = global.canvas.getHeight();
			if (this.top + this.speed > h){
				properties_to_animate.top = "-=" + this.speed;
			}
			if (this.top - this.speed < 0){
				properties_to_animate.top = "+=" + this.speed;
			}
			
			var self = this;
			this.animate(properties_to_animate,{
				onComplete: self._choose_move.bind(self)
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