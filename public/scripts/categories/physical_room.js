var page = 1, url = baseUrl + '/physical_room/add', keyword = '';
$(function(){
    $('#list_physical').load(baseUrl + '/physical_room/content');
});

function edit(idh){
    var title = $('#title_'+idh).text(), region = $('#region_'+idh).text(), floor = $('#floor_'+idh).text();
    $('#region').val(region).trigger('change'); $('#floor').val(floor).trigger('change');
    $('#title').val(title);
    url = baseUrl + '/physical_room/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl+'/physical_room/del', '#list_physical', baseUrl+'/physical_room/content?page='+page+'&q='+keyword);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_reject('#fm', url,  baseUrl+'/physical_room'); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_physical(pages){
    page = pages;
    $('#list_physical').load(baseUrl + '/physical_room/content?page='+pages+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_physical').load(baseUrl + '/physical_room/content?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_physical').load(baseUrl + '/physical_room/content?page=1&q='+keyword);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////
function import_xls(){
    $('#modal-import').modal('show');
}

function saveimp(){
    var file = $('#file').val();
    if(file.length > 0){
        save_form_modal('#fm-import', baseUrl + '/physical_room/do_import',  '#modal-import', '#list_physical', baseUrl+'/physical_room/content'); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}