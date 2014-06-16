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
		canvas.fire("tick");
		canvas.renderAll();
		fabric.util.requestAnimFrame(tick);
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

	var next_circle_time = 2000;
	var add_circle_time = 1500;
	canvas.on("tick", function (){
		if (global.elapsed_time > next_circle_time){
			next_circle_time = global.elapsed_time + add_circle_time;
			add_circle_time += 500;
			//add_gcircle ();
		}
	});
	var add_gcircle = function () {
		var hp = 1;
		r = new global.GoodCircle({
			hp : hp
		})

		r.left = Math.round (Math.random() * 400) + 100;
		r.top = Math.round (Math.random() * 200) + 100;

		canvas.add(r);
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

		var hotkeyActive = false;
		window.addEventListener('keydown', function(e) {
		    if(!hotkeyActive && e.keyCode in keyHandlers) {
		        hotkeyActive = true;
		        var button = keyHandlers[e.keyCode].button;
		        button.className = 'active';
		        var keyupHandler = function (event) {
		            hotkeyActive = false;
		            button.className = '';
		            simulateClick(button);
		            window.removeEventListener('keyup', keyupHandler, false);
		        };
		        window.addEventListener('keyup', keyupHandler, false);
		    }
		}, false);	}) ();	
}) ();