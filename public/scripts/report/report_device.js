var page = 1, type_data = 0, cates = '';
$(function(){
    $('#cate_s').load(baseUrl + '/other/combo_equipment');
    $('#type_data').val(type_data).trigger('change');
});

function del_cate(){
    $('#cate_s').val(null).trigger('change');
}

function search(){
    var cate = $('#cate_s').val(), kieudata = $('#type_data').val();
    if(cate.length != 0 || kieudata != 0){
        cates = cate; type_data = kieudata;
    }else{
        cates = ''; type_data = 0;
    }
    $('#list_device').load(baseUrl + '/report_device/content?page=1&type='+type_data+'&cate='+cates);
}

function view_page_device(pages){
    page = pages;
    $('#list_device').load(baseUrl + '/report_device/content?page='+page+'&type='+type_data+'&cate='+cates);
}

function export_xls(){
    var cate = $('#cate_s').val(), kieudata = $('#type_data').val();
    if(cate.length != 0 || kieudata != 0){
        cates = cate; type_data = kieudata;
    }else{
        cates = ''; type_data = 0;
    }
    window.open(baseUrl + '/report_device/export?page=1&type='+type_data+'&cate='+cates);
}
