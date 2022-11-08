var page = 1, keyword = '';
$(function(){
    $('#list_personel_tmp').load(baseUrl + '/personal/content_tmp');
})

function do_import(){
    save_form_reset_form('#fm', baseUrl + '/personal/do_import', '#list_personel_tmp', baseUrl + '/personal/content_tmp');
}

function view_page_personal_tmp(pages){
    page = pages;
    $('#list_personel_tmp').load(baseUrl + '/personal/content_tmp?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_personel_tmp').load(baseUrl + '/personal/content_tmp?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_personel_tmp').load(baseUrl + '/personal/content_tmp?page=1&q='+keyword);
    }
}

function detail(idh){
    $('#detail').load(baseUrl + '/personal/form_detail?id='+idh);
    $('#modal-detail').modal('show');
}

function edit(idh){
    $.ajax({
        type: "POST",
        url: baseUrl + '/personal/data_edit',
        data: "id="+idh, // serializes the form's elements.
        success: function(data){
            var result = JSON.parse(data);
            $('#code').val(result.code);
            $('#fullname').val(result.fullname); $('#gender').val(result.gender).trigger("change");
            $('#birthday').val(result.birthday); $('#address').val(result.address);
            $('#phone').val(result.phone); $('#email').val(result.email); 
        }
    });
    $('#change_code').attr('onclick', 'change_code('+idh+')');
    $('#id').val(idh);
    $('#modal-personel').modal('show');
}

function save_info(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm_edit', baseUrl+'/personal/update_tmp', '#modal-personel', '#list_personel_tmp',  baseUrl+'/personal/content_tmp?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function change_code(idh){
    var number = Math.floor(Math.random() * 9999999999);
    $('#code').val(number);
}

function save(){
    var data_str = '';
    update_data(data_str, "Bạn có chắc chắn muốn cập nhật dữ liệu ?", baseUrl + '/personal/update_all', baseUrl + '/personal');
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl+'/personal/del', "#list_personel_tmp", baseUrl + '/personal/content_tmp?page='+page+'&q='+keyword);
}

function del_tmp(){
    var data_str = "id=";
    del_data(data_str, "Bạn có chắc chắn muốn xóa dữ liệu tạm?", baseUrl+'/personal/del_tmp', "#list_personel_tmp", baseUrl + '/personal/content_tmp?page='+page+'&q='+keyword);
}