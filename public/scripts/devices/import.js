var page = 1, keyword= '', url = '';
$(function(){
    $('#list_device_tmp').load(baseUrl + '/devices/content_tmp');
});

function do_import(){
    save_form_reset_form('#fm', baseUrl + '/devices/do_import', '#list_device_tmp', baseUrl + '/devices/content_tmp');
}

function edit(idh){
    $.ajax({
        type: "POST",
        url: baseUrl + '/devices/data_edit',
        data: "id="+idh, // serializes the form's elements.
        success: function(data){
            var result = JSON.parse(data);
            $('#code').val(result.code); $('#title').val(result.title);
            $('#origin').val(result.origin); $('#price').val(formatNumber(result.price));
            $('#depreciation').val(result.depreciation); $('#year_work').val(result.year_work);
            $('#description').val(result.description);
        }
    });
    $('#modal-info').modal('show');
    url = baseUrl + '/devices/update_tmp?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, 'Bạn có chắc chắn muốn xóa bản ghi này?', baseUrl+'/devices/del', '#list_device_tmp', baseUrl + '/devices/content_tmp?page='+page+'&q='+keyword);
}

function save_info(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired && $('#code').val().length == 8){
        save_form_modal('#fm_info', url, '#modal-info', '#list_device_tmp',  baseUrl+'/devices/content_tmp?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Chưa điền đủ thông tin hoặc mã thiết bị chưa đúng quy định");
    }
}

function view_page_devices(pages){
    page = pages;
    $('#list_device_tmp').load(baseUrl + '/devices/content_tmp?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_device_tmp').load(baseUrl + '/devices/content_tmp?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_device_tmp').load(baseUrl + '/devices/content_tmp?page=1&q='+keyword);
    }
}

function del_tmp(){
    var data_str = "id=";
    del_data(data_str, "Bạn có chắc chắn muốn xóa dữ liệu tạm?", baseUrl+'/devices/del_tmp', "#list_device_tmp", baseUrl + '/devices/content_tmp?page='+page+'&q='+keyword);
}

function save(){
    var data_str = '';;
    update_data(data_str, "Bạn có chắc chắn muốn cập nhật dữ liệu ?", baseUrl + '/devices/update_all', baseUrl + '/devices');
}