// Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

// This program is distributed licensed under the GNU General Public License v.3
// as published by the Free Software Foundation.



var area1 = document.getElementById("area_1");
var ctxp1 = area1.getContext('2d');
var area2 = document.getElementById("area_2");
var ctxp2 = area2.getContext('2d');
var area3 = document.getElementById("area_3");
var ctxm1 = area3.getContext('2d');

area1.height = area2.height = area3.height = area1.offsetHeight;
area1.width = area2.width = area3.width = area1.offsetWidth;

var height_canv = area1.height;
var padding_y_top = area1.height * 0.03;
var width_canv = area1.width * 0.98;

var padding_y = height_canv * 0.125;
var padding_x = width_canv * 0.08;

var n_grid_x_day = 24;
var n_grid_x_month = 30;

var color_day = "#D72500";
var color_month = "#00A305";
var color_other = "#0000FF";

var min_p = -1;
var max_p = 1;

var csrftoken = getCookie('csrftoken');

// Рисуем сетку по вертикали
function draw_grid_vert(context_id, n_grid, slice_grid) {
	context_id.beginPath();
	context_id.moveTo(padding_x, height_canv + padding_y_top - padding_y);
	context_id.lineTo(padding_x, padding_y_top);
	context_id.lineWidth = 2;
	context_id.strokeStyle = '#000000';
	context_id.stroke();
	for (var i = 0; i<=n_grid - 1; i++) {
		context_id.beginPath();
		context_id.moveTo(padding_x + i / n_grid * (width_canv - padding_x) + slice_grid, padding_y_top);
		context_id.lineTo(padding_x + i / n_grid * (width_canv - padding_x) + slice_grid, height_canv + padding_y_top - padding_y);
		context_id.lineWidth = 1;
		context_id.strokeStyle = '#313131';
		context_id.stroke();
	}
};

// Рисуем сетку по горизонтали
function draw_grid_gor(context_id, n_grid, slice_grid) {
	context_id.beginPath();
	context_id.moveTo(width_canv, height_canv + padding_y_top - padding_y);
	context_id.lineTo(padding_x, height_canv + padding_y_top - padding_y);
	context_id.lineWidth = 2;
	context_id.strokeStyle = '#000000';
	context_id.stroke();
	for (var i = 0; i<=n_grid - 1; i++) {
		context_id.beginPath();
		context_id.moveTo(padding_x, i / (n_grid - 1) * (height_canv - padding_y) + padding_y_top - slice_grid);
		context_id.lineTo(width_canv, i / (n_grid - 1) * (height_canv - padding_y) + padding_y_top - slice_grid);
		context_id.lineWidth = 1;
		context_id.strokeStyle = '#313131';
		context_id.stroke();
	}
};

// Рисуем подписи по оси времени
function draw_label_x (context_id, x_start, y_start, n_grid, data_text) {
	x_delta = (width_canv - padding_x) / (n_grid);
	x_start = x_start + x_delta / 2
	context_id.font = "italic " + area1.height/20 + "px" + " serif";
	context_id.textAlign = "right";
	context_id.textBaseline = "bottom";
	if (n_grid == n_grid_x_day) {
		context_id.fillStyle = color_day;
	} else if (n_grid == n_grid_x_month) {
		context_id.fillStyle = color_month;
	} else {
		context_id.fillStyle = color_other;
	};
	for (i = 0; i<data_text.length; i++) {
		context_id.save();
		context_id.translate(x_start + i * x_delta, y_start);
		context_id.rotate(- (Math.PI / 2) * 0.9);
		context_id.translate(- padding_y / 4, 0);
		context_id.fillText(data_text[i], 0, 0);
		context_id.restore();
	};
	
};

// Рисуем подписи по оси даты
function draw_label_y(context_id, n_grid_y, n_grid_x, data_text) {
	var y_delta = (height_canv - padding_y) / (n_grid_y - 1);
	var x_coord = padding_x / 2
	context_id.font = "italic " + area1.height/20 + "px" + " serif";
	context_id.textAlign = "center";
	context_id.textBaseline = "middle";
	if (n_grid_x == n_grid_x_day) {
		context_id.fillStyle = color_day;
	} else if (n_grid_x == n_grid_x_month) {
		context_id.fillStyle = color_month;
	} else {
		context_id.fillStyle = color_other;
	};
	var i = 0;
	while (data_text.length != 0) {
		context_id.fillText(data_text.pop(), x_coord, padding_y_top + i * y_delta);
		i = i + 1;
	};
	
};

// Рисуем сам график
function plot_data(context_id, data, max_x, min_y, max_y, data_0) {
	for (var i = 0; i < data.length - 1; i++) {
		context_id.beginPath();
		var data_x = (data[i][0] - data_0) / 1000;
		var data_x_1 = (data[i + 1][0] - data_0) / 1000;
		context_id.moveTo(convertion_coord_x(data_x, max_x), convertion_coord_y(data[i][1], min_y, max_y));
		context_id.lineTo(convertion_coord_x(data_x_1, max_x), convertion_coord_y(data[i + 1][1], min_y, max_y));
		context_id.lineWidth = 2;
		context_id.strokeStyle = '#00B3FF';
		context_id.stroke();
	};
};


// Отправка запроса на новые координаты для графика
function request_data(type, range, rounding, context_id, id_name, n_grid_x) {
	var adress = '/datasend' + type;
	var text = JSON.stringify(range);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', adress, true);
	xhr.setRequestHeader("X-CSRFToken", csrftoken);
	xhr.send(text);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		data = JSON.parse(xhr.responseText);
		convertion_data(data);
		redraw(ctxp1, area1, n_grid_x, data, rounding, range);
		};
};


// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

// Перерисовываем график
function redraw(context_id, id_name, n_grid_x, data, rounding, delta_date) {
	id_name.width = id_name.width;
	var date_0 = new Date();
	var [min_y, max_y, coord_y] = calculate_data_y(data);
	var  k_scale = calculate_koeff_scale(max_p - min_p);
	var [coord_grid_min, n_grid_y] = calculate_n_grid_y(min_p, max_p, k_scale);
	date_0.setSeconds(date_0.getSeconds() - delta_date);
	x_slice = calculate_slice_grid(data, rounding, n_grid_x);
	draw_grid_vert(context_id, n_grid_x, x_slice);
	draw_grid_gor(context_id, n_grid_y, 0);
	plot_data(context_id, data, delta_date, min_p, max_p, date_0);
	data_text_x = calculate_label_x(rounding, n_grid_x, delta_date);
	data_text_y = calculate_label_y(n_grid_y, min_p, k_scale);
	draw_label_x(context_id, padding_x + x_slice, height_canv + padding_y_top - padding_y, n_grid_x, data_text_x);
	draw_label_y(context_id, n_grid_y, n_grid_x, data_text_y)
	//var dataplot = {
		//labels : data_text,
		//datasets : [
			//{
				//fillColor : "rgba(220,220,220,0.5)",
				//strokeColor : "rgba(220,220,220,1)",
				//pointColor : "rgba(220,220,220,1)",
				//pointDot : false,
				//data : coord_y
			//}
		//]
	//}
	//new Chart(ctxp2).Line(dataplot);
};



//redraw(ctxp1, area1, n_grid_x_day, data1, 0, "hour", 86400, 20, 80);

//draw_grid_vert(ctxp2, n_grid_x_month, 2);
//draw_grid_vert(ctxm1, n_grid_x_day, 6);
//draw_grid_gor(ctxp2, 10, 0);
//draw_grid_gor(ctxm1, 10, 0);
//plot_data(ctxp2, data1, n_grid_x_month, max_p - min_p)
