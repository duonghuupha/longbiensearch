var page = 1, keyword = '', url = '', data = [];
$(function(){
    $('#list_role').load(baseUrl + '/group_role/content');
});

function add(){
    $('#title').val(null); $('#save_form').show(); $('#title').attr("readonly", false);
    $('#roles').load(baseUrl + '/group_role/data_role');
    $('#modal-role').modal('show');
    url= baseUrl + '/group_role/add';
}

function edit(idh){
    var title = $('#title_'+idh).text(); data = [];
    $('#title').val(title); $('#title').attr("readonly", false);
    $('#roles').load(baseUrl + '/group_role/data_role?id='+idh);
    $('#modal-role').modal('show'); $('#save_form').show();
    url= baseUrl + '/group_role/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl +'/group_role/del', '#list_role', baseUrl + '/group_role/content?page='+page+'&q='+keyword);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    $("input:checkbox[type=checkbox]:checked").each(function(){
        data.push($(this).val());
    });
    if(allRequired && data.length > 0){
        $('#datadc').val(btoa(data.join(",")));
        save_form_modal('#fm', url, '#modal-role', '#list_role',  baseUrl+'/group_role/content?page='+page+'&q='+keyword)
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function set_checked(idh, id){
    var value = $('#role_'+idh+'_'+id).is(':checked');
    if(value){
        $("input:checkbox[name=role_"+idh+"_"+id+"_]").each(function(){
            $(this).prop('checked', true);
        });
        $('#role'+idh).prop('checked', true);
    }else{
        $("input:checkbox[name=role_"+idh+"_"+id+"_]").each(function(){
            $(this).prop('checked', false);
        });
    }
}

function set_checked_sub(idh, id, sub){
    var value = $('#role_'+idh+'_'+id+'_'+sub).is(":checked");
    if(value){
        $('#role_'+idh+'_'+id).prop('checked', true);
        $('#role'+idh).prop('checked', true);
    }
    //console.log(value+',', idh);
}

function set_checked_main(id){
    var value = $('#role'+id).is(":checked");
    if(value){
        $("input:checkbox[data_role=role_"+id+"_]").each(function(){
            $(this).prop('checked', true);
        });
    }else{
        $("input:checkbox[data_role=role_"+id+"_]").each(function(){
            $(this).prop('checked', false);
        });
    }
}

function view_page_role(pages){
    page = pages;
    $('#list_role').load(baseUrl + '/group_role/content?page='+page+'&q='+keyword);
}

function search(){

}

function detail(idh){
    var title = $('#title_'+idh).text();
    $('#title').val(title); $('#title').attr("readonly", true);
    $('#roles').load(baseUrl + '/group_role/data_role?id='+idh);
    $('#modal-role').modal('show'); $('#save_form').hide();
}

function change(status, idh){
    //var value = $('#total_'+idh).text();
    //if(value == 0 && status == 0){
    var data_str = "id="+idh+'&status='+status;
    del_data(data_str, "Nếu bỏ kích hoạt bản ghi này sẽ ảnh hưởng đến quyền sử dụng của những người dùng đã được cấp quyền. Bạn có chắc chắn muốn thay đổi trạng thái của bản ghi này?", baseUrl + '/group_role/change', '#list_role', baseUrl+'/group_role/content?page='+page+'&q='+keyword);
    //}else{
    //show_message("error", "Nhóm quyền đã được phân cho người dùng, bạn không thể tắt kích hoạt");
    //}
}