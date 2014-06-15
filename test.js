(function(){
	var canvas = new fabric.Canvas ("canvas");
	global.canvas = canvas;
	canvas.render_bind = canvas.renderAll.bind(canvas);

	fabric.Image.fromURL("http://placekitten.com/100/100", function (img) {
		var b = document.getElementById ("button2");
		b.innerHTML = "move the pussy";
		b.onclick = function () {
			img.animate("top", "100", {
				onChange : canvas.render_bind
			});
			img.animate("left", "100", {
				onChange : canvas.render_bind	
			});
		}
		canvas.add(img);
	});

	var rect = new global.BaseCircle({
		radius: 100,
		fill : "red",
		label : "TEXT"
	});

	var b1 = document.getElementById ("button1");

	b1.onclick = function () {
		r = fabric.util.object.clone(rect);

		r.left = Math.round (Math.random() * 400) + 100;
		r.top = Math.round (Math.random() * 200) + 100;

		canvas.add(r);
	}

	canvas.on("mouse:down", function (opt) {
		if (opt.target){
/*			opt.target.animate("width","-=10",{
				onChange : canvas.render_bind
			})
			opt.target.animate("height","-=10",{
				onChange : canvas.render_bind
			})*/
			if (opt.target.onclicked){
				opt.target.onclicked();
			}
/*
			var left = Math.round (Math.random() * 400) + 100;
			var top = Math.round (Math.random() * 200) + 100;
			opt.target.animate("left",left);
			opt.target.animate("top",top);
*/		}
	});

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

	b1.innerHTML = "add a rect";

	var b3 = document.getElementById ("button3");
	b3.innerHTML = "Restore all rects";
	b3.onclick = function () {
		canvas.forEachObject(function(obj){
			obj.width = rect.width;
			obj.height = rect.height;
		}
		,canvas);
		canvas.render_bind ();
	};
})();