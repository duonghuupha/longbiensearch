var page = 1, keyword = '', type = 1, pages_per_stu = 1, page_book = 1;
var key_per_stu = '', key_book = '', type_data = 1;
$(function(){
    $('#list_loans').load(baseUrl + '/lib_loans/content');
});

function set_forcus(type){
    var codeperstu = $('#per_stu_code').val(), boookcode = $('#book_code').val();
    if(type == 1){
        if(boookcode.length == 0){
            $('#book_code').focus();
        }
        $('#per_stu_info').load(baseUrl + '/lib_loans/per_stu_info?code='+btoa(codeperstu));
    }else{
        if(boookcode.length == 0){
            show_message("error", "Mã sách không đúng")
        }else{
            let arr_book = boookcode.split(".");
            if(arr_book.length == 1){
                show_message("error", "Mã sách không đúng");
                $('#book_code').val(null);
                $('#book_code').focus();
            }else{
                // kiem tra xem sach da dc tra chua
                $.getJSON(baseUrl + '/lib_loans/check_return?code='+btoa(boookcode), function(data){
                    if(data.success){
                        if(codeperstu.length == 0){
                            $('#per_stu_code').focus();
                        }
                        $('#book_info').load(baseUrl + '/lib_loans/book_info?code='+btoa(boookcode));
                        type = 1
                    }else{
                        type = 2;
                        var str_data = "code="+btoa(boookcode);
                        update_data(str_data, data.msg, baseUrl + '/lib_loans/return', baseUrl + '/lib_loans');
                    }
                });
            }
        }
    }
    //console.log(type);
    if(type == 1){
        // kiem tra xem hai input da du du lieu chua
        if(codeperstu.length > 0 && boookcode.length > 0){
            save_form_reset_form('#fm', baseUrl+'/lib_loans/add', '#list_loans', baseUrl + '/lib_loans/content');
        }else{
            show_message("error", "Chưa điền đủ thông tin");
        }
    }
}

function edit(idh){
    var str_data = "id="+idh;
    update_data(str_data, "Bạn có muốn trả sách", baseUrl + '/lib_loans/update', baseUrl + '/lib_loans');
}

function add(){
    $('#modal-library').modal('show');
}

function save(){
    var fullname = $('#fullname').val(), titlebook = $('#title_book').val();
    if(fullname.length > 0 && titlebook.length > 0){
        save_form_modal('#fm_lib', baseUrl+'/lib_loans/add_modal',  '#modal-library', '#list_loans', baseUrl+'/lib_loans/content');
    }else{
        show_message("error", "Bạn chưa điền đủ thông tin");
    }
}

function view_page_loans(pages){
    page = pages;
    $("#list_loans").load(baseUrl + '/lib_loans/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $("#list_loans").load(baseUrl + '/lib_loans/content?page=1&q='+keyword);
    }else{
        keyword = '';
        $("#list_loans").load(baseUrl + '/lib_loans/content?page=1&q='+keyword);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function select_user(){
    $('#title_modal').text("Lựa chọn giáo viên / học sinh");
    $('#nav-search-input-data').attr('onkeyup', 'search_per_stu()');
    $('#per').show(); $('#book').removeClass('col-xs-12 col-sm-12').addClass('col-xs-8 col-sm-8');
    $('#list_data').load(baseUrl + '/lib_loans/list_user?page=1&q='); 
    $('#pager').load(baseUrl + '/lib_loans/list_user_page?page=1&q=');
    $('#modal-data').modal('show');
}

function select_book(){
    $('#title_modal').text("Lựa chọn sách muốn mượn");
    $('#nav-search-input-data').attr('onkeyup', 'search_book()');
    $('#per').hide(); $('#book').addClass('col-xs-12 col-sm-12').removeClass('col-xs-8 col-sm-8');
    $('#list_data').load(baseUrl + '/lib_loans/list_book?page=1&q='); 
    $('#pager').load(baseUrl + '/lib_loans/list_book_page?page=1&q=');
    $('#modal-data').modal('show');
}

function search_per_stu(){
    var value = $('#nav-search-input-data').val();
    if(value.length != 0){
        key_per_stu = value.replaceAll(" ", "$", 'g');
    }else{
        key_per_stu = '';
    }
    if(type_data == 1){
        $('#list_data').load(baseUrl + '/lib_loans/list_user?page=1&q='+key_per_stu); 
        $('#pager').load(baseUrl + '/lib_loans/list_user_page?page=1&q='+key_per_stu);
    }else{
        $('#list_data').load(baseUrl + '/lib_loans/list_student?page=1&q='+key_per_stu); 
        $('#pager').load(baseUrl + '/lib_loans/list_student_page?page=1&q='+key_per_stu);
    }
}

function search_book(){
    var value = $('#nav-search-input-data').val();
    if(value.length != 0){
        key_book = value.replaceAll(" ", "$", 'g');
    }else{
        key_book = '';
    }
    $('#list_data').load(baseUrl + '/lib_loans/list_book?page=1&q='+key_book); 
    $('#pager').load(baseUrl + '/lib_loans/list_book_page?page=1&q='+key_book);
}

function view_page_per_stu(pages){
    pages_per_stu = pages;
    if(type_data == 1){
        $('#list_data').load(baseUrl + '/lib_loans/list_user?page='+pages_per_stu+'&q='+key_per_stu); 
        $('#pager').load(baseUrl + '/lib_loans/list_user_page?page='+pages_per_stu+'&q='+key_per_stu);
    }else{
        $('#list_data').load(baseUrl + '/lib_loans/list_student?page='+pages_per_stu+'&q='+key_per_stu); 
        $('#pager').load(baseUrl + '/lib_loans/list_student_page?page='+pages_per_stu+'&q='+key_per_stu);
    }
}

function view_page_book(pages){
    page_book = pages;
    $('#list_data').load(baseUrl + '/lib_loans/list_student?page='+page_book+'&q='+key_book); 
    $('#pager').load(baseUrl + '/lib_loans/list_student_page?page='+page_book+'&q='+key_book);
}
/********************************************************************************************** */
function confirm_per_stu(idh){
    var fullname = $('#fullname_'+idh).text();
    if(type_data == 1){ // user
        $('#user_id').val(idh); $('#student_id').val(0);
        $('#fullname').val(fullname+'-'+$('#job_'+idh).text());
    }else{// student
        $('#user_id').val(0); $('#student_id').val(idh);
        $('#fullname').val(fullname+'-'+$('#dep_'+idh).text());
    }
    $('#modal-data').modal('hide');
}

function confirm_book(idh){
    var subbook = $('#book_'+idh).val(), title = $('#title_'+idh).text();
    $('#book_id').val(idh+'.'+subbook); $('#title_book').val(title+' - Quyển số '+subbook);
    $('#modal-data').modal('hide');
}

function set_data(val){
    type_data = val.value; pages_per_stu = 1; key_per_stu = ''; $('#nav-search-input-data').val(null);
    if(type_data == 1){
        $('#list_data').load(baseUrl + '/lib_loans/list_user?page='+pages_per_stu+'&q='+key_per_stu); 
        $('#pager').load(baseUrl + '/lib_loans/list_user_page?page='+pages_per_stu+'&q='+key_per_stu);
    }else{
        $('#list_data').load(baseUrl + '/lib_loans/list_student?page='+pages_per_stu+'&q='+key_per_stu); 
        $('#pager').load(baseUrl + '/lib_loans/list_student_page?page='+pages_per_stu+'&q='+key_per_stu);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
