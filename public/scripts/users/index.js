var page = 1, keyword = '', url = '', page_per = 1, keword_per = '';
$(function(){
    $('#list_users').load(baseUrl + '/users/content');
    $('#group_role').load(baseUrl + '/users/combo_role');
    $('#group_role_id').load(baseUrl + '/users/combo_role');
});

function add(){
    $('#hr_id').val(null); $('#fullname').val(null); $('#username').val(null);
    $('#modal-users').modal('show');
    url = baseUrl + '/users/add';
}

function edit(idh){
    var fullname = $('#fullname_'+idh).text(), username =  $('#username_'+idh).text();
    var hrid = $('#hrid_'+idh).text(), role = $('#group_'+idh).text(); 
    $('#fullname_update').val(fullname); $('#username_update').val(username); 
    $('#group_role_id').val(role).trigger('change'); $('#hrid').val(hrid);
    $('#modal-users-update').modal('show'); url = baseUrl + '/users/update?id='+idh
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/users/del', '#list_users',  baseUrl+ '/users/content?page='+page+'&q='+keyword)
}

function save(){
    // kiem tra nhap input 
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    // kiem tra mat khau
    var pass = $('#password').val(), repass = $('#repass').val(), allpass = true;
    if(pass.length <= 6){
        allpass = false;
    }else{
        if(pass != repass){
            allpass = false;
        }
    }
    if(allRequired){
        if(allpass){
            save_form_modal('#fm', url, '#modal-users', '#list_users',  baseUrl+'/users/content?page='+page+'&q='+keyword); 
        }else{
            show_message("error", "Mật khẩu phải dài hơn 6 ký tự hoặc xác nhận mật khẩu không đúng");
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function save_update(){
    // kiem tra nhap input 
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm-update', url, '#modal-users-update', '#list_users',  baseUrl+'/users/content?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_users(pages){
    page = pages;
    $('#list_users').load(baseUrl + '/users/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_users').load(baseUrl + '/users/content?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_users').load(baseUrl + '/users/content?page=1&q='+keyword);
    }
}

function re_pass(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn đặt lại mật khẩu cho người dùng này?", baseUrl + '/users/change_pass', '#list_users',  baseUrl+ '/users/content?page='+page+'&q='+keyword)
}
/////////////////////////////////////////////////////////////////////////////////////////
function select_per(type){
    $('#list_personel').load(baseUrl + '/users/list_personel');
    $('#pager').load(baseUrl + '/users/list_personel_page');
    $('#type_action').text(type);
    $('#modal-personel').modal('show');
}

function view_page_per(pages){
    page_per = pages;
    $('#list_personel').load(baseUrl + '/users/list_personel?page='+page_per+'&q='+keword_per);
    $('#pager').load(baseUrl + '/users/list_personel_page?page='+page_per+'&q='+keword_per);
}

function search_per(){
    var value = $('#nav-search-input-user').val();
    if(value.length != 0){
        keword_per = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_per = '';
    }
    $('#list_personel').load(baseUrl + '/users/list_personel?page=1&q='+keword_per);
    $('#pager').load(baseUrl + '/users/list_personel_page?page=1&q='+keword_per);
}

function confirm_per(idh){
    var title = $('#title_'+idh).text();
    title = title.trim(); arr_title = title.split(' ');
    var chieudai = arr_title.length, name = arr_title[chieudai-1];
    name = removeVietnameseTones(name); arr_title.pop();
    var prefix = '';
    for(const element of arr_title){
        prefix += removeVietnameseTones(element.substr(0, 1));
    }
    var username = name+prefix; console.log(username);
    var type_action = $('#type_action').text();
    if(type_action == 0){
        $('#hr_id').val(idh);
        $('#fullname').val(title); $('#username').val(username);
    }else{
        $('#hrid').val(idh);
        $('#fullname_update').val(title); $('#username_update').val(username);
    }
    $('#modal-personel').modal('hide');
}