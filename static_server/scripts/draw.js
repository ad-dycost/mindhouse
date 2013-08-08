var area1 = document.getElementById("area_1");
var ctx1 = area1.getContext('2d');
var area2 = document.getElementById("area_2");
var ctx2 = area2.getContext('2d');
var area3 = document.getElementById("area_3");
var ctx3 = area3.getContext('2d');

area1.height = area2.height = area3.height = area1.offsetHeight
area1.width = area2.width = area3.width = area1.offsetWidth

var height_canv = area1.height
var width_canv = area1.width

var padding_y = height_canv / 10
var padding_x = width_canv / 20

var n_grid_x_day = 24
var n_grid_x_month = 30

var min_p = 20
var max_p = 80

var data1 = [[0, 36], [1, 35], [2, 34], [3, 42], [4, 41], [5, 45], [6, 35], [7, 37], [8, 40], [9, 39], [10, 41], [12, 45], [13, 45], [14, 45], [15, 45], [16, 45], [17, 45], [18, 45], [19, 45], [20, 45], [21, 45], [22, 45], [23, 45], [24, 45]];

// Рисуем сетку по вертикали
function draw_grid_vert(context_id, n_grid, slice_grid) {
	context_id.beginPath();
	context_id.moveTo(padding_x, height_canv);
	context_id.lineTo(padding_x, 0);
	context_id.lineWidth = 2;
	context_id.strokeStyle = '#000000';
	context_id.stroke();
	for (var i = 0; i<=n_grid; i++) {
		context_id.beginPath();
		context_id.moveTo(padding_x + i / n_grid * (width_canv - padding_x) + slice_grid, 0);
		context_id.lineTo(padding_x + i / n_grid * (width_canv - padding_x) + slice_grid, height_canv - padding_x);
		context_id.lineWidth = 1;
		context_id.strokeStyle = '#313131';
		context_id.stroke();
	}
};

// Рисуем сетку по горизонтали
function draw_grid_gor(context_id, n_grid, slice_grid) {
	context_id.beginPath();
	context_id.moveTo(width_canv, height_canv - padding_y);
	context_id.lineTo(0, height_canv - padding_y);
	context_id.lineWidth = 2;
	context_id.strokeStyle = '#000000';
	context_id.stroke();
	for (var i = 0; i<=n_grid; i++) {
		context_id.beginPath();
		context_id.moveTo(padding_y, i / n_grid * (height_canv - padding_y) - slice_grid);
		context_id.lineTo(width_canv, i / n_grid * (height_canv - padding_y) - slice_grid);
		context_id.lineWidth = 1;
		context_id.strokeStyle = '#313131';
		context_id.stroke();
	}
};

// Перевод координат в точки на холсте
function convertion_coord_x(x, max_x) {
	x_canv = padding_x + (x * (width_canv - padding_x) / max_x)
	return x_canv;
};

function convertion_coord_y(y, max_y) {
	y_canv = height_canv - padding_y - (y * (height_canv - padding_y) / max_y)
	return y_canv;
};


// Рисуем сам график
function plot_data(context_id, data, max_x, max_y) {
	for (var i = 0; i < data.length - 1; i++) {
		context_id.beginPath();
		context_id.moveTo(convertion_coord_x(data[i][0], max_x), convertion_coord_y(data[i][1], max_y));
		context_id.lineTo(convertion_coord_x(data[i + 1][0], max_x), convertion_coord_y(data[i + 1][1], max_y));
		context_id.lineWidth = 2;
		context_id.strokeStyle = '#00B3FF';
		context_id.stroke();
	};
};

draw_grid_vert(ctx1, n_grid_x_day, 0);
draw_grid_vert(ctx2, n_grid_x_month, 2);
draw_grid_vert(ctx3, n_grid_x_day, 6);
draw_grid_gor(ctx1, 10, 10);
draw_grid_gor(ctx2, 10, 0);
draw_grid_gor(ctx3, 10, 6);
plot_data(ctx1, data1, n_grid_x_day, max_p - min_p)
plot_data(ctx2, data1, n_grid_x_month, max_p - min_p)
