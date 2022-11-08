var page = 1; keyword = '', url = '';
$(function(){
    $('#list_return').load(baseUrl + '/returns/content');
});

function add(){
    $('#title_modal').text('Thêm mới - Cập nhật thông tin phiếu thu hồi thiết bị');
    combo_select_2('#physical_id', baseUrl+'/returns/combo_department', 0, '');
    $('#physical_id').val(null).trigger('change'); $('#device_id').val(null).trigger('change');
    $('#modal-returns').modal('show');
    url = baseUrl + '/returns/add';
}

function set_device(value){
    combo_select_2('#device_id', baseUrl + '/returns/combo_devices?physicalid='+value);
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/returns/del', '#list_return', baseUrl + '/returns/content?page='+page+'&q='+keyword);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == '' || $(this).val() == null){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-returns', '#list_return', baseUrl + '/returns/content'); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_return(pages){
    page = pages;
    $('#list_return').load(baseUrl + '/returns/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
    }else{
        keyword = '';
    }
    $('#list_return').load(baseUrl + '/returns/content?page=1&q='+keyword);
}

function detail(idh, status){
    if(status != 3){
        $('#detail').load(baseUrl + '/returns/detail?id='+idh);
    }else{
        $('#detail').load(baseUrl + '/returns/detailr?id='+idh);
    }
    $('#modal-detail').modal('show');
}

function approval(idh){
    $('#modal-detail').modal('hide');
    bootbox.confirm({
        message: "Bạn cố chắc chắn muốn duyệt đề nghị thu hồi này.Khi duyệt yêu cầu thiết bị sẽ được thu hồi và lưu vào kho",
        buttons:{
            confirm: {
                label: "Đồng ý",
                className: "btn-danger btn-sm"
            },
            cancel: {
                label: "Không đồng ý",
                className: "btn-primary btn-sm"
            }
        },
        callback: function(result){
            if(result){
                var data_str = "id="+idh+"&type=1";
                exec_del(data_str, baseUrl+'/returns/approval', '#list_return', baseUrl+'/returns/content?page='+page+'&q='+keyword);
            }else{
                var data_str = "id="+idh+"&type=2";
                exec_del(data_str, baseUrl+'/returns/approval', '#list_return', baseUrl+'/returns/content?page='+page+'&q='+keyword);
            }
        }
    });
    //del_data(data_str, "", baseUrl+'/returns/approval', '#list_return', baseUrl+'/returns/content?page='+page);
}

function restore(idh){
    $('#title_modal').text('Khôi phục thiết bị');
    $.getJSON(baseUrl + '/returns/data_edit?id='+idh, function(data){
        $('#physicalid').val(data.physical_id); $('#deviceid').val(data.device_id);
        $('#subdevice').val(data.sub_device);
        $('#department').text(data.physical+' - '+data.department);
        $('#device').text(data.device+' - '+data.sub_device);
    });
    $('#modal-restore').modal('show');
    url = baseUrl + '/returns/restore';
}

function save_restore(){
    var content = $('#content_restore').val();
    if(content.length != 0){
        save_form_modal('#fm_restore', url, '#modal-restore', '#list_return', baseUrl + '/returns/content'); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
