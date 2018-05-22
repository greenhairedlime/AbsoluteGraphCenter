$( document ).ready(function() {

    var in_arr = [];
    var n = 0;

    $('#tops').on('submit', function(e) {
        e.preventDefault();
        n = $("input[name=var]").val();
        var inputs = '';
        for (var i = 0; i < n; i++) {
            inputs += '<div>';
            for (var j = 0; j < n; j++) {
                number_1 = i + 1;
                number_2 = j + 1;
                inputs += '<span>a <sub>'+ number_1 +'-'+ number_2 +'</sub> = <input name="arr['+ i +']['+ j +']" type="number" value="0" maxlenght="3" size="2"></span>';
            }
            inputs += '</div>';
        }

        $('#arr_inputs').html(inputs);
        $('#tops').toggleClass('show hidden');
        $('#matrix').toggleClass('show hidden');
    });

    $('#matrix').on('submit', function(e) {
        e.preventDefault();
        var data = $('#matrix').serializeArray();

            for (var i = 0; i < n; i++) {
                in_arr[i] = [];
                for (var j = 0; j < n; j++) {
                        key = i*5 + j;
                        in_arr[i][j] = parseInt(data[key].value);
                }
            }

        abs_c(n, in_arr);
        $('#matrix').toggleClass('show hidden');
        $('#results').toggleClass('show hidden');
    });

});