/******************************************************************************************
	Base class for in-game circles.
 	Fires events :
 		removed 			When it reaches 0hp and is removed from the canvas.
 		intersect(target)	When it intersect with other object.
 	Handle the events using on(str eventname, fun callback).
 	Example :
 		circle = new BaseCircle ({hp : 1})
		circle.on ("removed", function () {
			console.log("The circle was removed");
		});
		canvas.add(circle);
		canvas.remove(circle);
	<<< The circle was removed
	Note : If you add a callback when another one exists, both of them will get called.

 ******************************************************************************************/

(function(){
	global.BaseCircle = fabric.util.createClass(fabric.Circle, {
		type: 'BaseCircle',

		initialize: function(options) {
			options || (options = { });

			this.callSuper('initialize', options);

			var properties = ['hp', 'speed'];
			this.stateProperties.concat(properties);
			
			this.set('hp', options.hp || 20);
			this.set('speed', options.hp || 1);
			this.setOriginX ("center");
			this.setOriginY ("center");
			this.on("intersect", function (options){
				console.log	(this.type + " intersect with " + options.target.type);
			});
		},

		toObject: function() {
			return fabric.util.object.extend(this.callSuper('toObject'), {
				label: this.get('label')
			});
		},

		_render: function(ctx) {
			this.callSuper('_render', ctx);

			ctx.font = '20px Helvetica';
			ctx.fillStyle = '#333';
			ctx.fillText(this.hp, -10, 0);
		},

		onclicked: function () {
			var self = this;
			this.hp = this.hp - 1 ;
			var prop = {
				onChange : global.canvas.render_bind
			};
			if (this.hp === 0){
				prop.onComplete = function () {
					global.canvas.remove(self);
				}
			}
			this.animate("radius",this.hp * 5, prop);
		}
	});
}) ();