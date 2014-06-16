(function () {
	global.PlayerCircle = fabric.util.createClass(global.BaseCircle, {
		type: "PlayerCircle",

		initialize: function (opt) {
			var options = {
				fill: "#79bbff"
			};

			if (opt.hp){
				options.hp = opt.hp;
			}

			this.callSuper("initialize", options);

			this.on("intersect", function (opt){
				var target = opt.target;
				if (target.type === "GoodCircle"){
					this.sethp (this.hp + target.hp);
				}
			});
		},

		/// Avaiable options : "up", "down", "left", "right"
		move: function (direction) {
			directions = ["up", "down", "left", "right"];
			var dir = directions.find(function(d){
				return direction == d;
			});
			if ( dir === undefined ){
				throw Error ("PlayerCircle.move : Must give an valid direction. Not '" + direction +"'");
			}

			var dir = { up: 'top', down: 'top',left: 'left', right: 'left' } [direction];
			var sign= { up: '-', left:'-', down:'+', right:'+'} [direction];
			this.animate(dir, sign+"=100")
		}
	});
}) ();