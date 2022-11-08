var page_cate = 1, url = '', page_group = 1;
$(function(){
    $('#list_cate').load(baseUrl + '/works_cate/content_cate');
    $('#list_group').load(baseUrl + '/works_cate/content_group');
    $('#group_id').load(baseUrl + '/other/combo_works_group');
});
//////////////////////////////////////////////////////////////////////////////////////////////
function add_cate(){
    $('#title_cate').val(null); $('#group_id').val(null).trigger('change');
    $('#modal-cate').modal('show');
    url = baseUrl + '/works_cate/add_cate';
}

function edit_cate(idh){
    $('#modal-cate').modal('show');
    var title = $('#titlecate_'+idh).text(); $('#title_cate').val(title);
    var groupid = $('#groupid_'+idh).text(); $('#group_id').val(groupid).trigger('change');
    url = baseUrl + '/works_cate/update_cate?id='+idh;
}

function del_cate(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/works_cate/del_cate', '#list_cate', baseUrl + '/works_cate/content_cate?page='+page_cate);
}

function change_cate(status, idh){
    var data_str = "id="+idh+"&status="+status;
    del_data(data_str, "Bạn có chắc chắn muốn cập nhật trạng thái cho bản ghi này?", baseUrl + '/works_cate/change_cate', '#list_cate', baseUrl + '/works_cate/content_cate?page='+page_cate);
}

function save_cate(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm_cate', url, '#modal-cate', '#list_cate', baseUrl+'/works_cate/content_cate?page='+page_cate); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_cate(pages){
    page_cate = pages;
    $('#list_cate').load(baseUrl+'/works_cate/content_cate?page='+page_cate);
}
///////////////////////////////////////////////////////////////////////////////////////////
function add_group(){
    $('#title_group').val(null); 
    $('#modal-group').modal('show');
    url = baseUrl + '/works_cate/add_group';
}

function edit_group(idh){
    var title = $('#titlegroup_'+idh).text(); $('#title_group').val(title);
    $('#modal-group').modal('show');
    url = baseUrl + '/works_cate/update_group?id='+idh;
}

function del_group(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/works_cate/del_group', '#list_group', baseUrl + '/works_cate/content_group?page='+page_group);
}

function change_group(status, idh){
    var data_str = "id="+idh+"&status="+status;
    del_data(data_str, "Bạn có chắc chắn muốn cập nhật trạng thái cho bản ghi này?", baseUrl + '/works_cate/change_group', '#list_group', baseUrl + '/works_cate/content_group?page='+page_group);
}

function save_group(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm_group', url, '#modal-group', '#list_group', baseUrl+'/works_cate/content_group?page='+page_group); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_group(pages){
    page_group = pages;
    $('#list_group').load(baseUrl+'/works_cate/content_group?page='+page_group);
}