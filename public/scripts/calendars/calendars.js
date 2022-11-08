let date = new Date();
var thang = date.getMonth() + 1, nam = date.getFullYear();
$(function(){
    $('#content_cal').load(baseUrl + '/calendars/content_cal?month='+thang+'&year='+nam);
    $('#month').val(thang).trigger('change'); $('#year').val(nam).trigger('change');
    $('#title_cal').text("Lịch báo giảng tháng "+thang+" năm "+nam);
});

function view_cal(){
    thang = $('#month').val(); nam = $('#year').val();
    $('#content_cal').load(baseUrl + '/calendars/content_cal?month='+thang+'&year='+nam);
    $('#title_cal').text("Lịch báo giảng tháng "+thang+" năm "+nam);
}