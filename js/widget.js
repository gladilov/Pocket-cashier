function Widget() {
}

Widget.prototype.IdCounter = 0;
Widget.prototype.Registry = [];

Widget.prototype.RegisterWidget = function() {
	this.Id = ++Widget.prototype.IdCounter;
	this.Registry[this.Id] = this;
};

var BaseWidget = new Widget();