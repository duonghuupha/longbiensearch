var page = 1, keyword = '', url = '', page_user = 1, keyword_user = '', data_select_user = [];
var data_select_user_f = [], type = 0;
$(function(){
    $('#list_tasks').load(baseUrl + '/tasks/content');
    //$('#group_id').load(baseUrl + '/other/combo_task_group?userid='+userid);
});

function add(){
    $('#fm')[0].reset();
    let today = new Date(), ngay = today.getDate(), thang = (today.getMonth() + 1);
    var nam = today.getFullYear(), hientai = ngay+'-'+thang+'-'+nam; 
    $('#date_work').datepicker('setDate', hientai);
    combo_select_2('#group_id', baseUrl + '/other/combo_task_group?userid='+userid, 0, '');
    $('#modal-tasks').modal('show');
    url = baseUrl + '/tasks/add';
}

function edit(idh){
    var usershare = $('#usershare_'+idh).text(); 
    if(usershare.length != 0){
        data_select_user = usershare.split(",");
    }else{
        data_select_user = [];
    }
    $('#datadc').val(btoa(data_select_user.join(",")));
    $.getJSON(baseUrl + '/tasks/data_edit?id='+idh, function(result){
        $('#date_work').datepicker('setDate', result.date_work);
        $('#time_work').val(result.time_work).trigger('change'); $('#title').val(result.title);
        $('#content').val(result.content); $('#file_old').val(result.file);
        data_select_user_f = result.users.split(", ");
        if(data_select_user.length > 2){
            $('#fullname').val("Đã lựa chọn "+data_select_user.length+" người tham gia");
        }else{
            $('#fullname').val(result.users);
        }
        $('#user_main_id').val(result.user_main); $('#user_main').val(result.usermain);
        combo_select_2('#group_id', baseUrl + '/other/combo_task_group?userid='+userid, result.group_id, result.group_task);
    })
    $('#modal-tasks').modal('show');
    url = baseUrl + '/tasks/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl+'/tasks/del', '#list_tasks', baseUrl+'/tasks/content?page='+page+'&q='+keyword);
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
        save_form_modal('#fm', url, '#modal-tasks', '#list_tasks', baseUrl + '/tasks/content?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Bạn chưa điền đủ thông tin");
    }
}

function view_page_tasks(pages){
    page = pages;
    $('#list_tasks').load(baseUrl + '/tasks/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
    }else{
        keyword = '';
    }
    $('#list_tasks').load(baseUrl + '/tasks/content?page=1&q='+keyword);
}

function detail(idh){
    window.location.href = baseUrl + '/tasks/detail?id='+idh;
}
///////////////////////////////////////////////////////////////////////////////////////////
function select_user(kieu){
    type = kieu;
    if(type == 1){
        $('#list_users').load(baseUrl + '/tasks/list_user?page='+page_user+'&q='+keyword_user+'&checked='); 
        $('#pager').load(baseUrl + '/tasks/list_user_page?page='+page_user+'&q='+keyword_user);
    }else if(type == 2){
        $('#list_users').load(baseUrl + '/tasks/list_user?page='+page_user+'&q='+keyword_user+'&checked='+btoa(data_select_user.join(','))); 
        $('#pager').load(baseUrl + '/tasks/list_user_page?page='+page_user+'&q='+keyword_user);
    }
    $('#modal-users').modal('show');
}

function view_page_user(pages){
    page_user = pages;
    if(type == 1){
        $('#list_users').load(baseUrl + '/tasks/list_user?page='+page_user+'&q='+keyword_user+'&checked='); 
    }else if(type == 2){
        $('#list_users').load(baseUrl + '/tasks/list_user?page='+page_user+'&q='+keyword_user+'&checked='+btoa(data_select_user.join(','))); 
    }
    $('#pager').load(baseUrl + '/tasks/list_user_page?page='+page_user+'&q='+keyword_user);
}

function search_user(){
    var value = $('#nav-search-input-user').val();
    if(value.length != 0){
        keyword_user = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_user = '';
    }
    if(type == 1){
        $('#list_users').load(baseUrl + '/tasks/list_user?page=1&q='+keyword_user+'&checked='); 
    }else{
        $('#list_users').load(baseUrl + '/tasks/list_user?page=1&q='+keyword_user+'&checked='+btoa(data_select_user.join(','))); 
    }
    $('#pager').load(baseUrl + '/tasks/list_user_page?page=1&q='+keyword_user);
}

function selected_user(idh){
    var value = $('#ck_'+idh).is(":checked");
    if(type == 1){
        $('#user_main_id').val(idh); $('#user_main').val($('#fullname_'+idh).text());
        $('#modal-users').modal('hide'); type = 0;
    }else{
        if(value){
            data_select_user.push(idh); data_select_user_f.push($('#fullname_'+idh).text());
        }else{
            data_select_user = data_select_user.filter(item => item !== idh);
            data_select_user_f = data_select_user_f.filter(item => item !== $('#fullname_'+idh).text());
        }
        $('#list_users').load(baseUrl + '/tasks/list_user?page='+page_user+'&q='+keyword_user+'&checked='+btoa(data_select_user.join(','))); 
    }
}

function confirm_user(){
    if(data_select_user.length != 0){
        $('#datadc').val(btoa(data_select_user.join(",")));
        if(data_select_user_f.length > 2){
            $('#fullname').val("Đã lựa chọn "+data_select_user_f.length+" người tham gia");
        }else{
            $('#fullname').val(data_select_user_f.join(", "));
        }
        type = 0;
        $('#modal-users').modal('hide');
    }else{
        show_message("error", "Chưa có bản ghi nào được chọn");
    }
}

function del_user_main(){
    $('#user_main').val(null);  $('#user_main_id').val(null);
}

function del_user_share(){
    $('#fullname').val(null);  $('#datadc').val(null);
    data_select_user = []; data_select_user_f = [];
}