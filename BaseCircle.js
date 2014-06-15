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
			options.evented = false;
			options.hasBorders = false;
			options.hasControls = false;

			this.callSuper('initialize', options);

			var properties = ['hp', 'speed'];
			this.stateProperties.concat(properties);
			
			this.sethp (options.hp || 20);
			this.set('speed', options.speed || 0.4);
			//this.set('radius', this.hp * 5);
			this.setOriginX ("center");
			this.setOriginY ("center");
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

		sethp: function (value) {
			var self = this;
			this.hp = value;
			var prop = {};
			if (this.hp <= 0){
				this.hp = 0;
				prop.onComplete = function () {
					global.canvas.remove(self);
				}
			}
			this.animate("radius",this.hp * 5, prop);
		}
	});
}) ();