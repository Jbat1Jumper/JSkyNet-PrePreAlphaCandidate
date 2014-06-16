/*
	fabric.util.requestAnimFrame(callback)
		Ejecuta el callback en cada tick
	Animar una unica propiedad
		obj.animate('left',"100",{onChange:...})
	Animar multiples propiedades
		obj.animate({left:100, top:100}, {onChange:...})
*/

(function(){
	var canvas = new fabric.Canvas ("canvas");
	global.canvas = canvas;

	function tick () {
		var now = new Date ().getTime();
		global.elapsed_time = now - global.start_time;
		try{
			canvas.fire("tick");
		} catch (e){
			console.error("Error happened idiot");
			console.error(e);
		}
		canvas.renderAll();
		fabric.util.requestAnimFrame(tick);

		var time_tick = now - global.last_tick; // In milliseconds
		var fps = Math.round(1000 / time_tick);
		document.getElementById("fps").innerHTML = fps + " FPS";
		global.last_tick = now;

		document.getElementById("count").innerHTML = canvas.size() + " Objets";
	}
	window.onload = function (){
		global.start_time = new Date ().getTime ();
		tick ();

		global.player = new global.PlayerCircle({hp: 5});
		var c = global.player;
		c.top = canvas.getWidth() / 2;
		c.left = canvas.getHeight() /2;
		canvas.add(c);
	}

	var bad_circle_time = 5000;
	var next_circle_time = 2000;
	var add_circle_time = 1500;
	canvas.on("tick", function (){
		if (global.elapsed_time > next_circle_time){
			next_circle_time = global.elapsed_time + add_circle_time;
			add_circle_time += 500;
			add_gcircle ();
		}
		if (global.elapsed_time > bad_circle_time){
			bad_circle_time = global.elapsed_time + 3000;
			add_rcircle ();
		}
	});
	var add_gcircle = function () {
		var hp = 1;
		var r = new global.GoodCircle({
			hp : hp
		});

		r.left = Math.round (Math.random() * 400) + 100;
		r.top = Math.round (Math.random() * 200) + 100;

		canvas.add(r);
	}
	var add_rcircle = function () {
		var hp = 3;
		var c = new global.BadCircle({
			hp : hp
		});

		c.left = Math.round (Math.random() * 400) + 100;
		c.top = Math.round (Math.random() * 200) + 100;

		canvas.add(c);
	}

	canvas.on("after:render", function () {
		var items = canvas.getObjects();
		for (var i = 0 ; i < items.length; i ++) {
			var selected = items[i];
			for (var j = i + 1; j < items.length; j ++) {
				var other = items[j];
				var isIntersecting = 	selected.intersectsWithObject(other) ||
                               			selected.isContainedWithinObject(other) ||
                               			other.isContainedWithinObject(selected);

                if (isIntersecting){
                	selected.fire("intersect", {target:other});
                	other.fire("intersect", {target:selected});
                }
			};
		};
	});
}) ();


//Button init
(function (){
	function moveup() {
		global.player.move("up");
	}

	function moveleft() {
		global.player.move("left");
	}
	
	function moveright() {
		global.player.move("right");
	}

	function movedown() {
		global.player.move("down");
	}

	var up = document.getElementById("upbutton");
	up.innerHTML = "Up";
	up.onclick = moveup;

	var left = document.getElementById("leftbutton");
	left.innerHTML = "Left";
	left.onclick = moveleft;

	var right = document.getElementById("rightbutton");
	right.innerHTML = "Right";
	right.onclick = moveright;

	var down = document.getElementById("downbutton");
	down.innerHTML = "Down";
	down.onclick = movedown;

	// keyboard
	(function (){
		// dict : keycode -> {button, handler}
		var keyHandlers = {
			37 : {
				handler: moveleft,
				button : left
			},
			38 : {
				handler: moveup,
				button: up
			},
			39 : {
				handler: moveright,
				button: right
			},
			40 : {
				handler: movedown,
				button: down
			}
		};
		function simulateClick(el) {
		    var evt = document.createEvent("MouseEvents");
		    evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
		    el.dispatchEvent(evt);
		}

		window.addEventListener('keydown', function(e) {
		    if(e.keyCode in keyHandlers) {
		       	var key_desc = keyHandlers [e.keyCode];
		        key_desc.button.className = 'active';
		        simulateClick(key_desc.button);
		        var keyupHandler = function (event) {
		            key_desc.active = false;
		            key_desc.button.className = '';
		            window.removeEventListener('keyup', keyupHandler, false);
		        };
		        if (!key_desc.active) {
		        	window.addEventListener('keyup', keyupHandler, false);
		    	}
		        key_desc.active = true;
		    }
		}, false);

		global.canvas.on("tick", function (){
			for (desc in keyHandlers){
				if(desc.active){
					simulateClick(desc.button);
				}
			}
		});

		global.ease = {};
		global.ease.linear = function (t, b, c, d) {
			return c*t/d + b;
		};
	}) ();
}) ();