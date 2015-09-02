(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 225,
	height: 79,
	fps: 30,
	color: "#FFFFFF",
	manifest: [
		{src:"images/BAck01.png", id:"BAck01"}
	]
};



// symbols:



(lib.BAck01 = function() {
	this.initialize(img.BAck01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,518,864);


(lib.Символ1 = function() {
	this.initialize();

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#A3A3A3").ss(2.7).p("ABXAAQAAgbgagUQgagVgjAAQgjAAgaAVQgZAUAAAbQAAAcAZAVQAaAUAjAAQAjAAAagUQAagVAAgcg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ag9AxQgZgVAAgcQAAgbAZgUQAagVAjAAQAjAAAaAVQAaAUAAAbQAAAcgaAVQgaAUgjAAQgjAAgagUg");

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-10,-14,20.1,22.3);


(lib.Анимация3 = function() {
	this.initialize();

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(0.5,1,1).p("AAUhSIAKACQgHADgEADQgeAYgSB3QgBAFACAFQgYgOgegegABkhKQgFgJgHgHQgJgIgagJQgSgGgRgDQgJgDgHAIIh3CIQgEAFAAAHQAAAHAEAEQBBBBAgAFIAIgBQAigCAvgtQAsgrAIghQAGgagZgngAAABPQABgDAAgCQAGgpAKgjQAMgnAJgHQAIgEAgADQAOAZgDAKQgFAUgdAfQgdAfgaALg");
	this.shape.setTransform(-20.9,6.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A3A3A3").s().p("Ah1AwQgEgEAAgHQAAgHAEgFIB3iIQAHgIAJADQARADASAGQAaAJAJAIQAHAHAFAJIACADQAZAngGAaQgIAhgsArQgvAtgiACIgIABQgggFhBhBgAAmgwQgJAHgMAnQgKAjgGApQAAACgBADQAagLAdgfQAdgfAFgUQADgKgOgZIgZgBQgLAAgEACgAgcBPQgCgFABgFQASh3AegYQAEgDAHgDIgKgCIhmB1QAeAeAYAOIAAAAg");
	this.shape_1.setTransform(-20.9,6.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(0.5,1,1).p("AGui9QgUgHgsgMQhEgTgmgGQgRgCgIAAQgogBiWAQQgBAAgDgGQgIgLgNgCQgIgCgKAEQgOAHg8AeQgMgEgMgCQghgFgmANQg5AUg1AjQgOAJgJAPQgLATAFAUQAEAOgCAHQgDAHgLANQgMAOgtAzQgsAzgGAIQgLALgDAMQgFAOAIALQAKAOAlAVQAYANBwA0QAIACANAFQATAAAJgBQARgEAOgLQASgPAzgxQAqgoAIgIQAWgVACgeQAMgDANgMIAFgFQAOgOAHgLQALgQAEgbQACgSAAgTQABgkAGgEQAVgNABgUQCMgPAqAAQAQACAHABQAiAFA5AQQAvAMAEADQAHACAGgEQAHgEAAgIIAHgsQABgGgDgFQgDgFgGgCgAAciEQgOAJgFATQgDALgBAcQgBAcgBAGQgCATgFAMQgFAFgMALIgGAGQgJAIgEAAQgKAAgFAIIgGALQgCADAAAFQABARgOAOQgBAAgxAvQg0AzgRAOQgMAKgVAAQgGAAgFgFQhvg0gYgNQgWgMgMgMQADgFADgDIACgCQBZhqARgRQAQgSAEgMQAGgRgGgYQgDgKAJgJIAIgIQAzghA1gTQAegLAZAEQAIABAHADIAFACQAIAFAIgEIBPgnIAFAVQAGAiAIAPQgCADgDABgAEVi1QgWgDgGAAQgnAAiXAPIgGgSQCOgPAnAAQAIAAAMACQA4AIBfAeIgCANIgvgNQg0gPgbgEg");

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A3A3A3").s().p("Aj9DpQhwg0gYgNQglgVgKgOQgIgLAFgOQADgMALgLIAyg7IA5hBQALgNADgHQACgHgEgOQgFgUALgTQAJgPAOgJQA1gjA5gUQAmgNAhAFQAMACAMAEQA8geAOgHQAKgEAIACQANACAIALQADAGABAAQCWgQAoABQAIAAARACQAmAGBEATQAsAMAUAHQAGACADAFQADAFgBAGIgHAsQAAAIgHAEQgGAEgHgCQgEgDgvgMQg5gQgigFIgXgDQgqAAiMAPQgBAUgVANQgGAEgBAkQAAATgCASQgEAbgLAQQgHALgOAOIgFAFQgNAMgMADQgCAegWAVIgyAwQgzAxgSAPQgOALgRAEQgJABgTAAIgVgHgAicinQg1ATgzAhIgIAIQgJAJADAKQAGAYgGARQgEAMgQASIhqB7IgCACQgDADgDAFQAMAMAWAMQAYANBvA0QAFAFAGAAQAVAAAMgKQARgOA0gzIAygvQAOgOgBgRQAAgFACgDIAGgLQAFgIAKAAQAEAAAJgIIAGgGQAMgLAFgFQAFgMACgTIACgiQABgcADgLQAFgTAOgJQADgBACgDQgIgPgGgiIgFgVIhPAnQgIAEgIgFIgFgCIgPgEIgMgBQgUAAgXAIgAD5i4IAcADQAbAEA0APIAvANIACgNQhfgeg4gIQgMgCgIAAQgnAAiOAPIAGASQCSgPAqAAIACAAg");

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(0.5,1,1).p("AGui9QgUgHgsgMQhEgTgmgGQgRgCgIAAQgogBiWAQQgBAAgDgGQgIgLgNgCQgIgCgKAEQgOAHg8AeQgMgEgMgCQghgFgmANQg5AUg1AjQgOAJgJAPQgLATAFAUQAEAOgCAHQgDAHgLANQgMAOgtAzQgsAzgGAIQgLALgDAMQgFAOAIALQAKAOAlAVQAYANBwA0QAIACANAFQATAAAJgBQARgEAOgLQASgPAzgxQAqgoAIgIQAWgVACgeQAMgDANgMIAFgFQAOgOAHgLQALgQAEgbQACgSAAgTQABgkAGgEQAVgNABgUQCMgPAqAAQAQACAHABQAiAFA5AQQAvAMAEADQAHACAGgEQAHgEAAgIIAHgsQABgGgDgFQgDgFgGgCg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Aj9DpQhwg0gYgNQglgVgKgOQgIgLAFgOQADgMALgLIAyg7IA5hBQALgNADgHQACgHgEgOQgFgUALgTQAJgPAOgJQA1gjA5gUQAmgNAhAFQAMACAMAEQA8geAOgHQAKgEAIACQANACAIALQADAGABAAQCWgQAoABQAIAAARACQAmAGBEATQAsAMAUAHQAGACADAFQADAFgBAGIgHAsQAAAIgHAEQgGAEgHgCQgEgDgvgMQg5gQgigFIgXgDQgqAAiMAPQgBAUgVANQgGAEgBAkQAAATgCASQgEAbgLAQQgHALgOAOIgFAFQgNAMgMADQgCAegWAVIgyAwQgzAxgSAPQgOALgRAEQgJABgTAAIgVgHg");

	this.addChild(this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-45.2,-25.1,90.4,50.2);


// stage content:
(lib.HTML = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 7 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("ArrkEQCvglDdgnQG4hODlgHQDlgHB7AiQA+ASAQATIgIDrIgdCKIAABGIkFEIIwwBKg");
	mask.setTransform(49.4,44.8);

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(0.5,1,1).p("AAUhSIAKACQgHADgEADQgeAYgSB3QgBAFACAFQgYgOgegegABkhKQgFgJgHgHQgJgIgagJQgSgGgRgDQgJgDgHAIIh3CIQgEAFAAAHQAAAHAEAEQBBBBAgAFIAIgBQAigCAvgtQAsgrAIghQAGgagZgngAAABPQABgDAAgCQAGgpAKgjQAMgnAJgHQAIgEAgADQAOAZgDAKQgFAUgdAfQgdAfgaALg");
	this.shape.setTransform(23.6,44);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A3A3A3").s().p("Ah1AwQgEgEAAgHQAAgHAEgFIB3iIQAHgIAJADQARADASAGQAaAJAJAIQAHAHAFAJIACADQAZAngGAaQgIAhgsArQgvAtgiACIgIABQgggFhBhBgAAmgwQgJAHgMAnQgKAjgGApQAAACgBADQAagLAdgfQAdgfAFgUQADgKgOgZIgZgBQgLAAgEACgAgcBPQgCgFABgFQASh3AegYQAEgDAHgDIgKgCIhmB1QAeAeAYAOIAAAAg");
	this.shape_1.setTransform(23.6,44);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(0.5,1,1).p("AAciEQgOAJgFATQgDALgBAcQgBAcgBAGQgCATgFAMQgFAFgMALIgGAGQgJAIgEAAQgKAAgFAIIgGALQgCADAAAFQABARgOAOQgBAAgxAvQg0AzgRAOQgMAKgVAAQgGAAgFgFQhvg0gYgNQgWgMgMgMQADgFADgDIACgCQBZhqARgRQAQgSAEgMQAGgRgGgYQgDgKAJgJIAIgIQAzghA1gTQAegLAZAEQAIABAHADIAFACQAIAFAIgEIBPgnIAFAVQAGAiAIAPQgCADgDABgAGui9QgUgHgsgMQhEgTgmgGQgRgCgIAAQgogBiWAQQgBAAgDgGQgIgLgNgCQgIgCgKAEQgOAHg8AeQgMgEgMgCQghgFgmANQg5AUg1AjQgOAJgJAPQgLATAFAUQAEAOgCAHQgDAHgLANQgMAOgtAzQgsAzgGAIQgLALgDAMQgFAOAIALQAKAOAlAVQAYANBwA0QAIACANAFQATAAAJgBQARgEAOgLQASgPAzgxQAqgoAIgIQAWgVACgeQAMgDANgMIAFgFQAOgOAHgLQALgQAEgbQACgSAAgTQABgkAGgEQAVgNABgUQCMgPAqAAQAQACAHABQAiAFA5AQQAvAMAEADQAHACAGgEQAHgEAAgIIAHgsQABgGgDgFQgDgFgGgCgAEVi1QgWgDgGAAQgnAAiXAPIgGgSQCOgPAnAAQAIAAAMACQA4AIBfAeIgCANIgvgNQg0gPgbgEg");
	this.shape_2.setTransform(44.6,37.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A3A3A3").s().p("Aj9DpQhwg0gYgNQglgVgKgOQgIgLAFgOQADgMALgLIAyg7IA5hBQALgNADgHQACgHgEgOQgFgUALgTQAJgPAOgJQA1gjA5gUQAmgNAhAFQAMACAMAEQA8geAOgHQAKgEAIACQANACAIALQADAGABAAQCWgQAoABQAIAAARACQAmAGBEATQAsAMAUAHQAGACADAFQADAFgBAGIgHAsQAAAIgHAEQgGAEgHgCQgEgDgvgMQg5gQgigFIgXgDQgqAAiMAPQgBAUgVANQgGAEgBAkQAAATgCASQgEAbgLAQQgHALgOAOIgFAFQgNAMgMADQgCAegWAVIgyAwQgzAxgSAPQgOALgRAEQgJABgTAAIgVgHgAicinQg1ATgzAhIgIAIQgJAJADAKQAGAYgGARQgEAMgQASIhqB7IgCACQgDADgDAFQAMAMAWAMQAYANBvA0QAFAFAGAAQAVAAAMgKQARgOA0gzIAygvQAOgOgBgRQAAgFACgDIAGgLQAFgIAKAAQAEAAAJgIIAGgGQAMgLAFgFQAFgMACgTIACgiQABgcADgLQAFgTAOgJQADgBACgDQgIgPgGgiIgFgVIhPAnQgIAEgIgFIgFgCIgPgEIgMgBQgUAAgXAIgAD5i4IAcADQAbAEA0APIAvANIACgNQhfgeg4gIQgMgCgIAAQgnAAiOAPIAGASQCSgPAqAAIACAAg");
	this.shape_3.setTransform(44.6,37.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(0.5,1,1).p("AGui9QgUgHgsgMQhEgTgmgGQgRgCgIAAQgogBiWAQQgBAAgDgGQgIgLgNgCQgIgCgKAEQgOAHg8AeQgMgEgMgCQghgFgmANQg5AUg1AjQgOAJgJAPQgLATAFAUQAEAOgCAHQgDAHgLANQgMAOgtAzQgsAzgGAIQgLALgDAMQgFAOAIALQAKAOAlAVQAYANBwA0QAIACANAFQATAAAJgBQARgEAOgLQASgPAzgxQAqgoAIgIQAWgVACgeQAMgDANgMIAFgFQAOgOAHgLQALgQAEgbQACgSAAgTQABgkAGgEQAVgNABgUQCMgPAqAAQAQACAHABQAiAFA5AQQAvAMAEADQAHACAGgEQAHgEAAgIIAHgsQABgGgDgFQgDgFgGgCg");
	this.shape_4.setTransform(44.6,37.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Aj9DpQhwg0gYgNQglgVgKgOQgIgLAFgOQADgMALgLIAyg7IA5hBQALgNADgHQACgHgEgOQgFgUALgTQAJgPAOgJQA1gjA5gUQAmgNAhAFQAMACAMAEQA8geAOgHQAKgEAIACQANACAIALQADAGABAAQCWgQAoABQAIAAARACQAmAGBEATQAsAMAUAHQAGACADAFQADAFgBAGIgHAsQAAAIgHAEQgGAEgHgCQgEgDgvgMQg5gQgigFIgXgDQgqAAiMAPQgBAUgVANQgGAEgBAkQAAATgCASQgEAbgLAQQgHALgOAOIgFAFQgNAMgMADQgCAegWAVIgyAwQgzAxgSAPQgOALgRAEQgJABgTAAIgVgHg");
	this.shape_5.setTransform(44.6,37.2);

	this.instance = new lib.Анимация3("synched",0);
	this.instance.setTransform(44.6,37.2);
	this.instance._off = true;

	this.shape.mask = this.shape_1.mask = this.shape_2.mask = this.shape_3.mask = this.shape_4.mask = this.shape_5.mask = this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance}]},24).to({state:[{t:this.instance}]},20).to({state:[{t:this.instance}]},30).to({state:[{t:this.instance}]},8).wait(12));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).to({rotation:14.9,x:81.6,y:47.5},20,cjs.Ease.get(1)).wait(30).to({rotation:11.9,x:76.1,y:45.5},0).to({rotation:0,x:44.6,y:37.2},8,cjs.Ease.get(1)).wait(12));

	// Слой 6 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AgRiMICVBaIgfCWIjoApg");
	mask_1.setTransform(110.1,37.7);

	// Слой 5
	this.instance_1 = new lib.Символ1();
	this.instance_1.setTransform(123.9,36.2,0.24,1,0,0,0,0,-2.9);

	this.instance_1.mask = mask_1;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:1,x:117.3},20,cjs.Ease.get(1)).wait(54).to({alpha:0},11,cjs.Ease.get(-1)).wait(9));

	// Слой 1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#A3A3A3").ss(3).p("AnkAAIPJAA");
	this.shape_6.setTransform(170.5,55.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFFFFF").ss(1.5).p("AHGF8IhkAAQgPAAgJgQQgJgQAAgcIAAgmQivAPiSAAQiSAAivgPIAAAmQAAAcgJAQQgJAQgQAAIhkAAQgPAAgJgQQgJgQAAgcIAAhIQgxiVA9ioIAAAAIAKgZIgcgFQgPgDgKgNQgLgMAAgQIAAgnQAAgRAMgMQAMgMARAAIBXAAIADAAQAXgmAXgYQAOgQANgNQAjgkBxgRQBCgKBSgCQBQgBBLAHQBLAHAyAOQA2AQAWAWQASATAJALQAVAVAZAoIAEAAIBXAAQARAAAMAMQAMAMAAARIAAAnQAAAQgLAMQgKANgQADIgcAFIAKAZIgBAAQA9CngwCWIAABIQAAAcgJAQQgJAQgQAAgAAAh5QBJAACWAIQCLAIAzgCQgRglgTgiIgFgHQglg7gngoQgPgPgqgMQgwgNhHgHQhIgHhNACQhjAChJAOQhKAOgVAWQglAkgnA+IgEAGQgVAlgRAkQA0ACCLgIQCXgIBIAAgAGoi1QAOAbAKAVIAmgIQACAAAAgCIAAgmgAFtFSIBPAAQABgMAAgGIAAhPIABgDQAviNg9iiQgxADijgIQiVgIhHAAQhIAAiVAIQiiAIgxgDQg+CiAvCNIABADIAABPQAAAGACAMIBOAAQACgIAAgKIAAhVIAXACQC7ASCaAAQCbAAC5gSIAYgCIAABVQgBAJACAJgAnni1IAAAmQAAACACAAIAlAHIAYgvg");
	this.shape_7.setTransform(170.5,38.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A3A3A3").s().p("AFiF8QgPAAgJgQQgJgQAAgcIAAgmQivAPiSAAQiSAAivgPIAAAmQAAAcgJAQQgJAQgQAAIhkAAQgPAAgJgQQgJgQAAgcIAAhIQgxiVA9ioIAAAAIAKgZIgcgFQgPgDgKgNQgLgMAAgQIAAgnQAAgRAMgMQAMgMARAAIBXAAIADAAQAXgmAXgYQAOgQANgNQAjgkBxgRQBCgKBSgCQBQgBBLAHQBLAHAyAOQA2AQAWAWIAbAeQAVAVAZAoIAEAAIBXAAQARAAAMAMQAMAMAAARIAAAnQAAAQgLAMQgKANgQADIgcAFIAKAZIgBAAQA9CngwCWIAABIQAAAcgJAQQgJAQgQAAgAFsFAQgBAJACAJIBPAAIABgSIAAhPIABgDQAviNg9iiQgxADijgIQiVgIhHAAQhIAAiVAIQiiAIgxgDQg+CiAvCNIABADIAABPIACASIBOAAQACgIAAgKIAAhVIAXACQC7ASCaAAQCbAAC5gSIAYgCgADfhxQCLAIAzgCQgRglgTgiIgFgHQglg7gngoQgPgPgqgMQgwgNhHgHQhIgHhNACQhjAChJAOQhKAOgVAWQglAkgnA+IgEAGQgVAlgRAkQA0ACCLgIQCXgIBIAAQBJAACWAIgAHAiFIAmgIQABAAAAAAQABAAAAAAQAAgBAAAAQAAgBAAAAIAAgmIhAAAIAYAwgAnniPQAAAAAAABQAAAAAAABQABAAAAAAQAAAAABAAIAlAHIAYgvIg/AAg");
	this.shape_8.setTransform(170.5,38.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]}).wait(94));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(111.9,36.9,225.3,79.8);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;


var canvas, stage, exportRoot;

function canvasInit() {
  canvas = document.getElementById("canvas");
  images = images||{};

  var loader = new createjs.LoadQueue(false);
  loader.addEventListener("fileload", handleFileLoad);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt) {
  if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {
  exportRoot = new lib.HTML();

  stage = new createjs.Stage(canvas);
  stage.addChild(exportRoot);
  stage.update();

  createjs.Ticker.setFPS(lib.properties.fps);
  createjs.Ticker.addEventListener("tick", stage);
}