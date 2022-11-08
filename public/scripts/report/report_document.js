var page = 1, tungay = '', denngay = '', kieudulieu = 1, cates = '';
let today = new Date(); var ngay = today.getDate(), thang = (today.getMonth() + 1), nam = today.getFullYear();
var hientai = ngay+'-'+thang+'-'+nam, amonth = ngay+'-'+(thang - 1)+'-'+nam;
$(function(){
    $('#list_document').load(baseUrl + '/report_document/content_in?page='+page+'&type='+kieudulieu+'&cate='+cates+'&start='+amonth+'&end='+hientai);
    $('#cate_s').load(baseUrl +  '/other/combo_document_cate');
    $('#end_date').datepicker('setDate', hientai);  $('#start_date').datepicker('setDate', amonth);
    $('#type_data').val(1).trigger('change'); kieudulieu = 1;
});

function del_cate(){
    $('#cate_s').val(null).trigger('change');
}

function set_data(value){
    if(value == 1){
        $('#title_data').text("Văn bản đến");
    }else{
        $('#title_data').text("Văn bản đi");
    }
    del_cate(); $('#end_date').datepicker('setDate', hientai);  
    $('#start_date').datepicker('setDate', amonth);
}

function vew_page_document(pages){
    page = pages;
    if(kieudulieu == 1){
        $('#list_document').load(baseUrl + '/report_document/content_in?page='+page+'&type='+kieudulieu+'&cate='+cates+'&start='+tungay+'&end='+denngay);
    }else{
        $('#list_document').load(baseUrl + '/report_document/content_out?page='+page+'&type='+kieudulieu+'&cate='+cates+'&start='+tungay+'&end='+denngay);
    }
}

function search(){
    var startdate = $('#start_date').val(), enddate = $('#end_date').val();
    var datatype = $('#type_data').val(), cate = $('#cate_s').val();
    if(startdate > enddate){
        show_message("error", "Từ ngày không được lớn hơn đến ngày");
        return false;
    }else{
        tungay = startdate; denngay = enddate; kieudulieu = datatype; cates = cate;
        if(kieudulieu == 1){
            $('#list_document').load(baseUrl + '/report_document/content_in?page=1&type='+kieudulieu+'&cate='+cates+'&start='+tungay+'&end='+denngay);
        }else{
            $('#list_document').load(baseUrl + '/report_document/content_out?page=1&type='+kieudulieu+'&cate='+cates+'&start='+tungay+'&end='+denngay);
        }
    }
}

function export_xls(){
    var startdate = $('#start_date').val(), enddate = $('#end_date').val();
    var datatype = $('#type_data').val(), cate = $('#cate_s').val();
    if(startdate > enddate){
        show_message("error", "Từ ngày không được lớn hơn đến ngày");
        return false;
    }else{
        tungay = startdate; denngay = enddate; kieudulieu = datatype; cates = cate;
        if(kieudulieu == 1){
            window.open(baseUrl + '/report_document/export_in?cate='+cates+'&start='+tungay+'&end='+denngay);
        }else{
            window.open(baseUrl + '/report_document/export_out?cate='+cates+'&start='+tungay+'&end='+denngay);
        }
    }
}
