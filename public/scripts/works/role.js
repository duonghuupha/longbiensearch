var page = 1, keyword = '', url = '', data = [];
$(function(){
    $('#list_role').load(baseUrl + '/works_role/content');
});

function add(){
    $('#user_id').val(null); $('#fullname').val(null); data = [];
    $('#roles').load(baseUrl + '/works_role/list_roles?userid=');
    $('#save_form').show(); $('#modal-role').modal('show');
    url = baseUrl + '/works_role/add';
}

function edit(idh){
    var userid = $('#userid_'+idh).text(), fullname = $('#fullname_'+idh).text();
    $('#roles').load(baseUrl + '/works_role/list_roles?userid='+userid);
    $('#user_id').val(userid); $('#fullname').val(fullname); data = [];
    $('#save_form').show(); $('#modal-role').modal('show');
    url = baseUrl + '/works_role/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl + '/works_role/del', '#list_role', baseUrl + '/works_role/content?page='+page+'&q='+keyword);
}

function change(status, idh){
    var data_str = "id="+idh+"&status="+status;
    del_data(data_str, "Bạn có chắc chắn muốn cập nhật trạng thái cho  bản ghi này ?", baseUrl + '/works_role/change', '#list_role', baseUrl + '/works_role/content?page='+page+'&q='+keyword);
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
        save_form_modal('#fm', url, '#modal-role', '#list_role', baseUrl+'/works_role/content?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_role(pages){
    page = pages;
    $('#list_role').load(baseUrl + '/works_role/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
    }else{
        keyword = '';
    }
    $('#list_role').load(baseUrl + '/works_role/content?page=1&q='+keyword);
}

function detail(idh){
    var userid = $('#userid_'+idh).text(), fullname = $('#fullname_'+idh).text();
    $('#roles').load(baseUrl + '/works_role/list_roles?userid='+userid);
    $('#fullname').val(fullname);
    $('#save_form').hide(); $('#modal-role').modal('show');
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function select_user(){
    $('#list_users').load(baseUrl+'/works_role/list_user');
    $('#pager').load(baseUrl+'/works_role/list_user_page');
    $('#modal-users').modal('show');
}

function view_page_user(pages){
    page_user = pages;
    $('#list_users').load(baseUrl+'/works_role/list_user?page='+page_user+'&q='+keyword_user);
    $('#pager').load(baseUrl+'/works_role/list_user_page?page='+page_user+'&q='+keyword_user);
}

function search_user(){
    var value = $('#nav-search-input-user').val();
    if(value.length != 0){
        keyword_user = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_user = '';
    }
    $('#list_users').load(baseUrl+'/works_role/list_user?page=1&q='+keyword_user);
    $('#pager').load(baseUrl+'/works_role/list_user_page?page=1&q='+keyword_user);
}

function confirm_user(idh){
    $('#user_id').val(idh); var fullname = $('#fullname_'+idh).text();
    $('#fullname').val(fullname); $('#modal-users').modal('hide');
}