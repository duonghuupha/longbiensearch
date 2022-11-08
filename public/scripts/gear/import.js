var page = 1, url = '', keyword = '';
$(function(){
    $('#list_gear').load(baseUrl + '/gear/content_tmp');
    /*$('#cate_id').load(baseUrl + '/other/combo_utensils');
    $('#cate_imp').load(baseUrl + '/other/combo_utensils');*/
    combo_select_2('#cate_imp', baseUrl + '/other/combo_utensils');
});

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
    }else{
        keyword = '';
    }
    $('#list_gear').load(baseUrl + '/gear/content_tmp?page=1&q='+keyword);
}

function view_page_gear(pages){
    page = pages;
    $('#list_gear').load(baseUrl + '/gear/content_tmp?page='+page+'&q='+keyword);
}

function edit(idh){
    $.getJSON(baseUrl + '/gear/data_edit?id='+idh, function(data){
        $('#code').val(data.code); $('#title').val(data.title);
        $('#cate_id').val(data.cate_id).trigger('change');
        $('#image_old').val(data.image); $('#content').val(data.content);
        $('#stock').val(data.stock);
    });
    $('#modal-gear').modal('show');
    url = baseUrl + '/gear/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl + '/gear/del_tmp', '#list_gear', baseUrl + '/gear/content_tmp?page='+page+'&q='+keyword);
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
        save_form_modal('#fm_gear', url, '#modal-gear', '#list_gear',  baseUrl+'/gear/content_tmp?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function do_import(){
    var cate = $('#cate_imp').val(),file_gear = $('#file_gear').val();
    if(cate.length > 0 && file_gear.length > 0){
        save_form_reset_form('#fm', baseUrl + '/gear/do_import',  '#list_gear',  baseUrl+'/gear/content_tmp?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function save_all(){
    var data_str = '';;
    update_data(data_str, "Bạn có chắc chắn muốn cập nhật dữ liệu ?", baseUrl + '/gear/update_all', baseUrl + '/gear');
}

function del_tmp(){
    var data_str = "id=";
    del_data(data_str, "Bạn có chắc chắn muốn xóa dữ liệu tạm?", baseUrl+'/gear/del_all', "#list_gear", baseUrl + '/gear/content_tmp');
}

function detail(idh){
    $('#detail').load(baseUrl + '/gear/detail?id='+idh);
    $('#modal-detail').modal('show');
}