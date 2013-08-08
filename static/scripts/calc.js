// Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

// This program is distributed licensed under the GNU General Public License v.3
// as published by the Free Software Foundation.



// Перевод координат в точки на холсте
function convertion_coord_x(x, max_x) {
	x_canv = padding_x + (x * (width_canv - padding_x) / max_x);
	return x_canv;
};

function convertion_coord_y(y, min_y, max_y) {
	y_canv = height_canv + padding_y_top - padding_y - ((y - min_y) * (height_canv - padding_y) / (max_y - min_y));
	return y_canv;
};

// Расчет даннных для  оси Y
function calculate_data_y(data) {
	var coord_y = [];
	for (i = 0; i < data.length; i++) {
		coord_y.push(data[i][1]);
	};
	var y_min = Math.min.apply(Math, coord_y);
	var y_max = Math.ceil(Math.max.apply(Math, coord_y));
	var delta_y = y_max - y_min;
	return [y_min, y_max, coord_y];
};

// Расчет коэффициента мастабирования
function calculate_koeff_scale(delta_y) {
	var k_scale = 10;
	var delta_y_scale = delta_y;
	if (delta_y_scale < 1) {
		while (delta_y_scale < 1) {
			delta_y_scale = delta_y_scale * k_scale;
		};
	} else if (delta_y_scale > 10) {
		while (delta_y_scale > 10) {
			delta_y_scale = delta_y_scale / k_scale;
		};
	};
	if (delta_y_scale <= 4) {
		delta_y_scale = delta_y_scale * 4;
	};
	return delta_y_scale / delta_y;
};

// Расчет количества линий сетки  по оси Y
function calculate_n_grid_y(y_min, y_max, k_scale) {
	coord_grid_min = Math.floor(y_min * k_scale);
	coord_grid_max = Math.ceil(y_max * k_scale);
	return [coord_grid_min, coord_grid_max - coord_grid_min + 1];
};

// Расчет сдвига сетки по оси даты, rounding -- округление (часы, дни и т.д.), n_grid -- число линий сетки
function calculate_slice_grid(data, rounding, n_grid) {
	var date_now = new Date();
		var date_start = new Date();
	rounding_date(date_start, rounding);
	if (rounding == "hour") {
		var delta =  (3600 * 1000 - (date_now - date_start)) / (3600 * 1000);
	} else if (rounding == "day") {
		var delta =  (24 * 3600 * 1000 - (date_now - date_start)) / (24 * 3600 * 1000);
	};
	var s_g = delta / n_grid * (width_canv - padding_x);
	return s_g;
};

// Округление даты
function rounding_date(date, rounding) {
	if (rounding == "hour") {
		date.setMinutes(0, 0, 0);
	} else if (rounding == "day") {
		date.setHours(0, 0, 0, 0);
	};
};

// Генерирование подписей по оси даты
function calculate_label_x(rounding, n_grid, delta_date) {
	var date_now = new Date();
	var date_end = new Date();
	if (rounding == "day"){
		function label() {
			return date_end.toLocaleDateString()
		};
	} else if (rounding == "hour") {
		function label() {
			return date_end.toLocaleTimeString()
		};
	};
	rounding_date(date_end, rounding);
	var res = [];
	for (var i = 0; i <= n_grid - 1; i++) {
		res.unshift(label().slice(0, 2));
		date_end.setSeconds(date_end.getSeconds() - delta_date / n_grid);
	};
	return res;
};

// Генерирование подписей по оси Y
function calculate_label_y(n_grid, min_y, k_scale) {
	var res = [];
	for (var i = 0; i <= n_grid - 1; i++) {
		res.push(min_y + i / k_scale);
	};
	return res;
};

// Перевод данных, возвращаемых сервером в вид, удобный для работы в JS
function convertion_data(data_server) {
	for (var i = 0; i < data_server.length; i++) {
		data_server[i][0] = new Date(data_server[i][0]);
		data_server[i][1] = Number(data_server[i][1]);
	};
};
