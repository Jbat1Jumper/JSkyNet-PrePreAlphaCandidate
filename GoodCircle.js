/*
	Represents the positive circles i.e. the ones that the player should eat.
*/

(function () {
	global.GoodCircle = fabric.util.createClass(global.NonPlayerCircle, {
		type: "GoodCircle",

		initialize: function (opt) {
			var options = {
				fill:"green"
			};

			if (opt.hp){
				options.hp = opt.hp;
			}

			this.callSuper("initialize", options);

			this.on("intersect", function(opt) {
				var target = opt.target;
				if (target.type === "PlayerCircle"){
					this.sethp(0);
				}
			});
		}
	});
}) ();