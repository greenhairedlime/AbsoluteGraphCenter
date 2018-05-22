
var inp_arr = [
      [0, 8, 8, 6, 2],
      [8, 0, 2, 10, 6],
      [8, 2, 0, 12, 8],
      [6, 10, 12, 0, 4],
      [2, 6, 8, 4, 0]
    ];

var inp_n = 5;

var step = 0.1;

function abs_c(n, arr){


	var abs_c_arr = [];
	var abs_c_arr_min = [];

	//search p
	for (var i = 0; i < n; i++) {
		abs_c_arr[i] = [];
		abs_c_arr_min[i] = [];

		abs_c_arr_min[i]['y'] = 0;
		abs_c_arr_min[i]['x'] = 0;
		
		for (var j = i+1; j < n; j++) {

			// Массив точек на граафике
			// из которых потом выбираем точку,
			// которая есть абсолютным центром для ребра
			abs_c_arr[i][j] = [];
			abs_c_arr_min[i][j] = [];

			var E; // 0 <= E <= d(X_i, X_j)  на графике координата на оси Х
			var E_min = 0;
			var E_max = arr[i][j];

			// Заполняем массив точек 0-ми c шагом step, чтоб сравнивая заполнять только значениями больш0 0
			for ( var l = E_min; l <= E_max; l = round(l + step) ){
				abs_c_arr[i][j][l] = 0;
			}


			//Перебираем от 0 до n назходя 2 графика
			for(var k = 0; k < n; k++){

				// y_1 = E + d(X_j, X_1)

				//График Т
				var f_T = function (E) {
					return E + arr[j][k];
				}

				//График Т'
				var f_T_ = function (E) {
					return arr[i][j] + arr[i][k] - E;
				}

				//Находим точку пересечения графиков по оси Х
				var Ex_intersection = round((arr[i][j] + arr[i][k] - arr[j][k]) / 2);
				//Точка пересечения на оси у	
				var Ey_intersection = f_T(Ex_intersection);

				//Заносим все точки из 2 графиков которые ниже пересечения, заменяя в масивае если есть меньше
				for ( var l = E_min; l <= E_max; l = round(l + step) ){
					
					//Находим координаты графика функции f_T и f_T_ на всех точках от 0 до E_max 
					var y_T = f_T(l); 
					var y_T_ = f_T_(l); 
					
					// Если кордината графикаа ниже по оу чем пересечение
					// и больше значения массива в этой точке по ох (задается  переменной l) 
					// заносим ее в массив точек абсjk.n центов

					if ( y_T <= Ey_intersection && y_T > abs_c_arr[i][j][l] ) { 
						abs_c_arr[i][j][l] = y_T;
					} else if ( y_T_ <= Ey_intersection && y_T_ > abs_c_arr[i][j][l] ) {
						abs_c_arr[i][j][l] = y_T_;
					}
				}

				//Создать массив функций и массив точек пересечений и заполнять массив обтекающей хуйней
			}
		}
	}


	//Заполняем масси абсолютных цетнров для каждой дуги
	for (var i = 0; i < n; i++) {
		
		for (var j = i+1; j < n; j++) {
	
			//Минимальное значение по оу для оси i-j
			abs_c_arr_min[i][j]['y'] = smallest(abs_c_arr[i][j]) ;

			abs_c_arr_min[i][j]['x'] = indexOfSmallest(abs_c_arr[i][j]);

		}

	}



	var min_in_arc = '';
	var min_in_arc_x = 100000;
	var min_in_arc_y = 100000;

	for (var i = 0; i < n; i++) {
		
		for (var j = i+1; j < n; j++) {

			if (abs_c_arr_min[i][j]['y'] < min_in_arc_y) {
				min_in_arc_y = abs_c_arr_min[i][j]['y'];
				min_in_arc_x = abs_c_arr_min[i][j]['x'];
				min_in_arc = ++i + '_' + ++j;
			};
	
		}
	}



	console.log(min_in_arc_y);

	console.log(min_in_arc_x);

	console.log(min_in_arc);


  	$('#ox').html(min_in_arc_x);
    $('#oy').html(min_in_arc_y);
    $('#arc').html(min_in_arc);

}

function round(x){
	return Math.round(x * 1000) / 1000;
}

 function smallest(a) {
        var lowest = 0;
        for (var i = 0; i < a.length; i++) {
            if (a[i] < a[lowest])
                lowest = i;
        }
        return a[lowest];
}

 function indexOfSmallest(a) {
        var lowest = 0;
        for (var i = 1; i < a.length; i++) {
            if (a[i] < a[lowest])
                lowest = i;
        }
        return lowest;
}