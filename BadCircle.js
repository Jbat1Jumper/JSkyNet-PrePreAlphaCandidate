(function () {
	global.BadCircle = fabric.util.createClass (global.NonPlayerCircle, {
		type: "BadCircle",

		initialize: function (opt) {
			var options = {
				fill:"red"
			};

			if (opt.hp){
				options.hp = opt.hp;
			} else {
				options.hp = 3;
			}

			this.callSuper("initialize", options);

			this.on("intersect", function(opt){
				var target = opt.target;
				if (target.type === "PlayerCircle"){
					target.sethp(target.hp - this.hp);
					this.sethp(0);
				}
			});
		}
	});
}) ();