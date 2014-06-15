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
			add_gcircle ();
		}
	});
	var add_gcircle = function () {
		var hp = 10;
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
                               			selected.isContainedWithinObject(other);

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
	var up = document.getElementById("upbutton");
	up.innerHTML = "Up";
	up.onclick = function () {
		global.player.move("up");
	}

	var left = document.getElementById("leftbutton");
	left.innerHTML = "Left";
	left.onclick = function () {
		global.player.move("left");
	}

	var right = document.getElementById("rightbutton");
	right.innerHTML = "Right";
	right.onclick = function () {
		global.player.move("right");
	}

	var down = document.getElementById("downbutton");
	down.innerHTML = "Down";
	down.onclick = function () {
		global.player.move("down");
	}
}) ();