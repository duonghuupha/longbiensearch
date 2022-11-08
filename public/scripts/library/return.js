var page = 1, page_book = 1, keyword_book = '', url = '', titles = '', statuss = 0;
$(function(){
    $('#list_return').load(baseUrl + '/lib_return/content?status=0');
});

function add(){
    $('#title_modal').text("Thêm mới - Cập nhật thông tin phiếu thu hồi sách");
    $('#content').val(null);$('#book_id').val(null); 
    $('#title').val(null); $('#sub_book').val(null);
    $('#content').attr("placeholder", "Lý do thu hồi");
    $('#modal-returns').modal('show');
    url = baseUrl + '/lib_return/add';
}

function select_book(){
    $('#nav-search-input-data').attr('onkeyup', 'search_book()');
    $('#list_data').load(baseUrl + '/lib_return/list_book?page=1&q='); 
    $('#pager').load(baseUrl + '/lib_return/list_book_page?page=1&q=');
    $('#modal-data').modal('show');
}

function search_book(){
    var value = $('#nav-search-input-data').val();
    if(value.length != 0){
        keyword_book = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_book = '';
    }
    $('#list_data').load(baseUrl + '/lib_return/list_book?page=1&q='+keyword_book); 
    $('#pager').load(baseUrl + '/lib_return/list_book_page?page=1&q='+keyword_book);
}

function view_page_book(pages){
    page_book = pages;
    $('#list_data').load(baseUrl + '/lib_return/list_student?page='+page_book+'&q='+keyword_book); 
    $('#pager').load(baseUrl + '/lib_return/list_student_page?page='+page_book+'&q='+keyword_book);
}

function confirm_book(idh){
    var subbook = $('#book_'+idh).val(), title = $('#title_'+idh).text();
    $('#book_id').val(idh); $('#title').val(title+' - Quyển số '+subbook);
    $('#sub_book').val(subbook); $('#modal-data').modal('hide');
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
        save_form_modal('#fm', url,  '#modal-returns', '#list_return', baseUrl+'/lib_return/content?status=0');
    }else{
        show_message("error", "Bạn chưa điền đủ thông tin");
    }
}

function restore(idh, subbook, bookid){
    $('#title_modal').text("Khôi phục sách");
    $('#book_id').val(bookid); $('#title').val($('#title_'+idh).text());
    $('#sub_book').val(subbook);
    $('#content').attr("placeholder", "Lý do khôi phục");
    $('#modal-returns').modal('show');
    url = baseUrl + '/lib_return/restore';
}

function search(){
    var title = $('#titles').val(), statuss = $('#statuss').val();
    if(title.length != 0){
        titles = title.replaceAll(" ", "$", 'g');
    }else{
        titles = ''
    }
    $('#list_return').load(baseUrl + '/lib_return/content?page=1&title='+titles+'&status='+statuss);
}

function view_page_return(pages){
    page = pages;
    $('#list_return').load(baseUrl + '/lib_return/content?page='+page+'&title='+titles+'&status='+statuss);
}