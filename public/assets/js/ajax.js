$(document).ready(function () {
    $.ajax({
        type: 'GET'
        , url: 'http://localhost:3000/items'
        , async: true
        , success: function (data) {
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
    return false;
});
$('#country_filter').submit(function (event) {
    if (!$('#country_filter_range').val()) {
        if ($('#country_filter_id').val()) {
            $.ajax({
                type: 'GET'
                , url: 'http://localhost:3000/items/' + $('#country_filter_id').val()
                , async: true
                , success: function (data) {
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
    else {}
    event.preventDefault();
});