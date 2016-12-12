// Load complete table on start
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/items',
        async: true,
        success: function (data) {
            if (data) {
                var len = data.length;
                var content = '';
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        content += '<tr>';
                        content += '<td>' + data[i]['id'] + '</td>';
                        content += '<td>' + data[i]['name'] + '</td>';
                        content += '<td>' + data[i]['birth rate per 1000'] + '</td>';
                        content += '<td>' + data[i]['cell phones per 100'] + '</td>';
                        content += '<td>' + data[i]['children per woman'] + '</td>';
                        content += '<td>' + data[i]['electricity consumption per capita'] + '</td>';
                        content += '<td>' + data[i]['internet user per 100'] + '</td>';
                        content += '</tr>';
                    }
                    $('#table_body').append(content);
                }
            }
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            alert('error: ' + textStatus + ': ' + errorThrown);
        }
    });
    
    var possibleSelectValues = ['id', 'name', 'birth rate per 1000', 'cell phones per 100', 'children per woman', 'electricity consumption per capita', 'internet user per 100'];
    
    // load property list
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/properties',
        async: true,
        success: function(data) {
            if(data) {
                var selects = '';
                $.each(data, function(k, v) {
                    if($.inArray(v, possibleSelectValues) !== -1) {
                        selects += '<option value="' + k + '">' + v + '</option>'; 
                    }                    
                });
                $('#prop_selection').html(selects);
            }
        }, error: function(jqXHR, textStatus, errorThrown) {
            alert('error: ' + textStatus + ': ' + errorThrown);
        } 
    });
    
    return false;
});

// apply filter
$('#country_filter').submit(function (event) {
    if (!$('#country_filter_range').val()) {
        if ($('#country_filter_id').val()) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/items/' + $('#country_filter_id').val(),
                async: true,
                success: function (data) {
                    if (data) {
                        var content = '';
                        content += '<tr>';
                        content += '<td>' + data['id'] + '</td>';
                        content += '<td>' + data['name'] + '</td>';
                        content += '<td>' + data['birth rate per 1000'] + '</td>';
                        content += '<td>' + data['cell phones per 100'] + '</td>';
                        content += '<td>' + data['children per woman'] + '</td>';
                        content += '<td>' + data['electricity consumption per capita'] + '</td>';
                        content += '<td>' + data['internet user per 100'] + '</td>';
                        content += '</tr>';
                        $('#table_body').html(content);
                    }
                }
                , error: function (jqXRH, textStatus, errorThrown) {
                    alert('error: ' + textStatus + ': ' + errorThrown);
                }
            });
        }
    }
    else {
        var range = $('#country_filter_range').val().split('-');
        var first = range[0].trim();
        var second = range[1].trim();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/items/' + first + '/' + second,
            async: true,
            success: function (data) {
                if (data) {
                var len = data.length;
                var content = '';
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        content += '<tr>';
                        content += '<td>' + data[i]['id'] + '</td>';
                        content += '<td>' + data[i]['name'] + '</td>';
                        content += '<td>' + data[i]['birth rate per 1000'] + '</td>';
                        content += '<td>' + data[i]['cell phones per 100'] + '</td>';
                        content += '<td>' + data[i]['children per woman'] + '</td>';
                        content += '<td>' + data[i]['electricity consumption per capita'] + '</td>';
                        content += '<td>' + data[i]['internet user per 100'] + '</td>';
                        content += '</tr>';
                    }
                    $('#table_body').html(content);
                }
            }
            }, error: function(jqXHR, textStatus, errorThrown) {
                alert('error: ' + textStatus + ': ' + errorThrown);
            }
        }); 
    }
    event.preventDefault();
});


// post data 
$('#country_add').submit(function(event) {
    if( $('#country_name').val() && $('#country_birth').val() && $('#country_cellphone').val()) {
        var name = $('#country_name').val();
        var birth = $('#country_birth').val();
        var phones = $('#country_cellphone').val();
        var dataToSend = '{ "name" : "' + name + '", "birth rate per 1000" : ' + birth + ', "cell phones per 100" : ' + phones + '}'
        console.log(dataToSend);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/items',
            data: dataToSend,
            contentType: 'application/json',
            success: function() {
                $('#country_name').val('');
                $('#country_birth').val('');
                $('#country_cellphone').val('');
                location.reload();
            }
        });
        
    }
    event.preventDefault();
});


