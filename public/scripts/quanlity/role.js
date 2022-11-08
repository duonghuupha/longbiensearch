var page = 1, keyword = '', url = '', page_user = 1,   keyword_user = '', data = [];
$(function(){
    $('#list_role').load(baseUrl + '/quanlity_role/content');
    $('#quanlity_id').load(baseUrl + '/other/combo_quanlity');
});

function add(){
    $('#user_id').val(null); $('#fullname').val(null); $('#quanlity_id').val(null).trigger('change');
    $('#roles').html(''); $('#save_form').show(); $('#modal-role').modal('show');
    url = baseUrl + '/quanlity_role/add';
}

function edit(idh){
    var userid = $('#userid_'+idh).text(); fullname = $('#fullname_'+idh).text(), quanlity = $('#quanlityid_'+idh).text();
    $('#user_id').val(userid); $('#fullname').val(fullname); $('#quanlity_id').val(quanlity).trigger('change');
    $('#save_form').show(); $('#modal-role').modal('show');
    url = baseUrl + '/quanlity_role/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/quanlity_role/del', '#list_role', baseUrl + '/quanlity_role/content?page='+page+'&q='+keyword);
}

function change(status, idh){
    var data_str = "id="+idh+'&status='+status;
    del_data(data_str, "Bạn có chắc chắn muốn cập nhật trạng thái cho bản ghi này?", baseUrl + '/quanlity_role/change', '#list_role', baseUrl + '/quanlity_role/content?page='+page+'&q='+keyword);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    $("input:checkbox[name=role_]:checked").each(function(){
        data.push($(this).val());
    });
    if(allRequired && data.length > 0){
        $('#datadc').val(btoa(data.join(",")));
        save_form_modal('#fm', url, '#modal-role', '#list_role', baseUrl + '/quanlity_role/content?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_role(pages){
    page = pages;
    $('#list_role').load( baseUrl + '/quanlity_role/content?page='+page+'&q='+keyword);
}

function search(){

}

function detail(idh){
    var userid = $('#userid_'+idh).text(); fullname = $('#fullname_'+idh).text(), quanlity = $('#quanlityid_'+idh).text();
    $('#user_id').val(userid); $('#fullname').val(fullname); $('#quanlity_id').val(quanlity).trigger('change');
    $('#save_form').hide();
    $('#modal-role').modal('show'); 
}
/////////////////////////////////////////////////////////////////////////////////////////
function select_user(){
    $('#list_users').load(baseUrl+'/quanlity_role/list_user');
    $('#pager').load(baseUrl+'/quanlity_role/list_user_page');
    $('#modal-users').modal('show');
}

function view_page_user(pages){
    page_user = pages;
    $('#list_users').load(baseUrl+'/quanlity_role/list_user?page='+page_user+'&q='+keyword_user);
    $('#pager').load(baseUrl+'/quanlity_role/list_user_page?page='+page_user+'&q='+keyword_user);
}

function search_user(){
    var value = $('#nav-search-input-user').val();
    if(value.length != 0){
        keyword_user = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_user = '';
    }
    $('#list_users').load(baseUrl+'/quanlity_role/list_user?page=1&q='+keyword_user);
    $('#pager').load(baseUrl+'/quanlity_role/list_user_page?page=1&q='+keyword_user);
}

function confirm_user(idh){
    $('#user_id').val(idh); var fullname = $('#fullname_'+idh).text();
    $('#fullname').val(fullname); $('#modal-users').modal('hide');
}
/////////////////////////////////////////////////////////////////////////////////////////
function set_role(){
    var value = $('#quanlity_id').val(), userid = $('#user_id').val();
    if(value.length != 0){
        $('#roles').load(baseUrl + '/quanlity_role/list_role_quanlity?id='+value+'&userid='+userid);
    }
}

function set_checked(idh, id){
    var value = $('#role_'+idh+'_'+id).is(":checked");
    if(value){
        $('#role_'+idh).prop('checked', true);
    }else{
        if($("input:checkbox[data-role=role"+idh+"_]:checked").length == 0){
            $('#role_'+idh).prop('checked', false);
        }
    }
}

function set_check_main(idh){
    var value= $('#role_'+idh).is(':checked');
    if(value){
        $("input:checkbox[data-role=role"+idh+"_]").each(function(){
            $(this).prop('checked', true);
        });
    }else{
        $("input:checkbox[data-role=role"+idh+"_]").each(function(){
            $(this).prop('checked', false);
        });
    }
}