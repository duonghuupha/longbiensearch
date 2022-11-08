var page = 1, keyword = '',  cates = '', data_select_user = [], data_select_user_f = [];
var page_user = 1, keyword_user = '', url = '';
$(function(){
    $('#list_document').load(baseUrl + '/document_out/content');
    $('#cate_id').load(baseUrl + '/other/combo_document_cate');
    $('#cate_s').load(baseUrl + '/other/combo_document_cate');
});

function add(){
    $('#file').prop('required', true);
    $('#fm')[0].reset(); $('.select2').val(null).trigger('change'); data_select_user = [];
    data_select_user_f = []; $('#id').val(0); $('#modal-document').modal('show');
    url = baseUrl + '/document_out/add';
}

function edit(idh){
    var usershare = $('#usershare_'+idh).text(); 
    if(usershare.length != 0){
        data_select_user = usershare.split(",");
    }else{
        data_select_user = [];
    } 
    $('#data_user_share').val(btoa(data_select_user.join(","))); $('#id').val(idh);
    $.getJSON(baseUrl + '/document_out/data_edit?id='+idh, function(data){
        $('#cate_id').val(data.cate_id).trigger('change'); $('#type_dc').val(data.type).trigger('change');
        $('#number_dc').val(data.number_dc); $('#date_dc').datepicker('setDate', format_date(data.date_dc));
        $('#title').val(data.title); $('#content').val(data.content); $('#file_old').val(data.file);
        data_select_user_f = data.users.split(", ");
        if(data_select_user.length > 2){
            $('#fullname').val("Đã lựa chọn "+data_select_user.length+" người chia sẻ");
        }else{
            $('#fullname').val(data.users);
        }
    }); $('#file').prop('required', false);
    $('#modal-document').modal('show');
    url = baseUrl + '/document_out/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chấn muốn xóa bản ghi này ?", baseUrl + '/document_out/del', '#list_document', baseUrl +  '/document_out/content?page='+page+'&q='+keyword+'&c='+cates);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            console.log($(this));
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-document', '#list_document',  baseUrl+'/document_out/content?page='+page+'&q='+keyword+'&c='+cates); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_document(pages){
    page = pages;
    $('#list_document').baseUrl+'/document_out/content?page='+page+'&q='+keyword+'&c='+cates;
}

function search(){
    var value = $('#keywork').val(), cate = $('#cate_s').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
    }else{
        keyword = '';
    }
    if(cate.length != 0){
        cates = cate;
    }else{
        cates = '';
    }
    $('#list_document').load(baseUrl + '/document_out/content?page=1&q='+keyword+'&c='+cates);
}

function detail(idh){
    $('#detail').load(baseUrl + '/document_out/detail?id='+idh);
    $('#modal-detail').modal('show');
}
////////////////////////////////////////////////////////////////////////////////////////////
function select_user(kieu){
    type = kieu;
    if(type == 1){
        $('#list_users').load(baseUrl + '/document_out/list_user?page='+page_user+'&q='+keyword_user+'&checked='); 
        $('#pager').load(baseUrl + '/document_out/list_user_page?page='+page_user+'&q='+keyword_user);
    }else if(type == 2){
        $('#list_users').load(baseUrl + '/document_out/list_user?page='+page_user+'&q='+keyword_user+'&checked='+btoa(data_select_user.join(','))); 
        $('#pager').load(baseUrl + '/document_out/list_user_page?page='+page_user+'&q='+keyword_user);
    }
    $('#modal-users').modal('show');
}

function view_page_user(pages){
    page_user = pages;
    if(type == 1){
        $('#list_users').load(baseUrl + '/document_out/list_user?page='+page_user+'&q='+keyword_user+'&checked='); 
    }else if(type == 2){
        $('#list_users').load(baseUrl + '/document_out/list_user?page='+page_user+'&q='+keyword_user+'&checked='+btoa(data_select_user.join(','))); 
    }
    $('#pager').load(baseUrl + '/document_out/list_user_page?page='+page_user+'&q='+keyword_user);
}

function search_user(){
    var value = $('#nav-search-input-user').val();
    if(value.length != 0){
        keyword_user = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_user = '';
    }
    if(type == 1){
        $('#list_users').load(baseUrl + '/document_out/list_user?page=1&q='+keyword_user+'&checked='); 
    }else{
        $('#list_users').load(baseUrl + '/document_out/list_user?page=1&q='+keyword_user+'&checked='+btoa(data_select_user.join(','))); 
    }
    $('#pager').load(baseUrl + '/document_out/list_user_page?page=1&q='+keyword_user);
}

function selected_user(idh){
    var value = $('#ck_'+idh).is(":checked"); data_select_user.filter(n => n !== null);
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
        $('#list_users').load(baseUrl + '/document_out/list_user?page='+page_user+'&q='+keyword_user+'&checked='+btoa(data_select_user.join(','))); 
    }
}

function confirm_user(){
    data_select_user.filter(n => n !== null);
    if(data_select_user.length != 0){
        $('#data_user_share').val(btoa(data_select_user.join(",")));
        if(data_select_user_f.length > 2){
            $('#fullname').val("Đã lựa chọn "+data_select_user_f.length+" người chia sẻ");
        }else{
            $('#fullname').val(data_select_user_f.join(", "));
        }
        type = 0;
        $('#modal-users').modal('hide');
    }else{
        show_message("error", "Chưa có bản ghi nào được chọn");
    }
}

function del_user_share(){
    $('#fullname').val(null);  $('#data_user_share').val(null);
    data_select_user = []; data_select_user_f = [];
}

function del_cate(){
    $('#cate_s').val(null).trigger('change');
}

function set_numberdc(){
    var value = $('#type_dc').val();
    if($('#id').val() == 0){
        if(value != 5){
            $.getJSON(baseUrl + '/document_out/general_number_dc?type='+value, function(data){
                $('#number_dc').val(data.code); $('#number_dc').attr("readonly", true); 
            });
        }else{
            $('#number_dc').attr("readonly", false); $('#number_dc').val(null);
        }
    }
}

function reload_code(){
    var value = $('#type_dc').val();
    if(value != null){
        $.getJSON(baseUrl + '/document_out/general_number_dc?type='+value, function(data){
            $('#number_dc').val(data.code);
        });
    }else{
        show_message("error", "Chưa chọn Kiểu văn bản");
    }
}

function check_ext_file(){
    var value = $('#file').val(); ext = value.split().pop();
    if(ext != 'pdf' || ext != 'PDF'){
        show_message("error", "Tệp đính kèm phải là dạng PDF");
        $('#file').ace_file_input('reset_input');
    }
}