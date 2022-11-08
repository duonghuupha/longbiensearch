var page = 1, url = '', title_s = '', cate_s = '', manu_s = '', author_s = '';
var page_read = 1, keyword_read = '';
$(function(){
    $('#list_library').load(baseUrl + '/library/content');
    combo_select_2('#cate_s', baseUrl + '/other/combo_book_cate', 0, '');
    combo_select_2('#manu_s', baseUrl + '/other/combo_book_manu', 0, '');
});

function add(){
    $('#fm')[0].reset(); $('.select2').val(null).trigger('change');
    var number = Math.floor(Math.random() * 99999999); $('#id').val(0);
    $('#code').val(number); $('#type').val(1).trigger('change');
    combo_select_2('#cate_id', baseUrl + '/other/combo_book_cate', 0, '');
    combo_select_2('#manu_id', baseUrl + '/other/combo_book_manu', 0, '');
    $('#type').val(1).trigger('change'); $('#file').ace_file_input('reset_input');
    $('#modal-library').modal('show');
    url = baseUrl + '/library/add';
}

function edit(idh){
    $.getJSON(baseUrl + '/library/data_edit?id='+idh, function(data){
        console.log(data.category);
        $('#code').val(data.code); $('#number_page').val(data.number_page);
        $('#author').val(data.author); $('#title').val(data.title); $('#content').val(data.content);
        $('#type').val(data.type).trigger('change'); $('#stock').val(data.stock);
        $('#id').val(idh); $('#file_old').val(data.file); $('#image_old').val(data.image);
        combo_select_2('#cate_id', baseUrl + '/other/combo_book_cate', data.cate_id, data.category);
        combo_select_2('#manu_id', baseUrl + '/other/combo_book_manu', data.manu_id, data.manuafactory);
    }); $('#file').ace_file_input('reset_input');
    $('#modal-library').modal('show');
    url = baseUrl + '/library/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl+'/library/del', '#list_library', baseUrl +  '/library/content?page='+page+'&q='+keyword);
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
        save_form_modal('#fm', url, '#modal-library', '#list_library',  baseUrl + '/library/content?page='+page+'&t='+title_s+'&c='+cate_s+'&m='+manu_s+'&a='+author_s); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_library(pages){
    page = pages;
    $('#list_library').load(baseUrl + '/library/content?page='+page+'&t='+title_s+'&c='+cate_s+'&m='+manu_s+'&a='+author_s);
}

function search(){
    var title = $('#title_s').val(), cate = $('#cate_s').val(), manu = $('#manu_s').val(), author = $('#author_s').val();
    title_s = (title.length != 0) ? title.replaceAll(" ", "$", 'g') : '';
    cate_s = (cate.length != 0) ? cate : ''; manu_s = (manu.length != 0) ? manu : '';
    author = (author.length != 0) ? author.replaceAll(" ", "$", 'g') : ''
    $('#list_library').load(baseUrl + '/library/content?page=1&t='+title_s+'&c='+cate_s+'&m='+manu_s+'&a='+author_s);
}

function detail(idh){
    $('#detail').load(baseUrl + '/library/detail?id='+idh);
    $('#modal-detail').modal('show');
}
////////////////////////////////////////////////////////////////////////////////////////////////
function set_required(value){
    if($('#id').val()  == 0){
        if(value == 2){
            $('#file').attr('disabled', false); $('#file').prop('required', true);
            $('#file').ace_file_input('reset_input');
        }else{
            $('#file').attr('disabled', true);  $('#file').prop('required', false);
            $('#file').ace_file_input('reset_input');
        }
    }else{
        $('#file').attr('disabled', true); $('#file').prop('required', false);
        $('#file').ace_file_input('reset_input');
    }
}

function check_ext(){
    var file_data = $('#file').val();
    var ext = file_data.split(".").pop();
    if(ext != 'pdf' && ext != 'PDF' && ext != 'mp4' && ext != 'mp3'){
        show_message("error", "File dữ liệu không đung định dạng");
        $('#file').ace_file_input('reset_input');
    }
}

function refresh_code(){
    var number = Math.floor(Math.random() * 99999999);
    $('#code').val(number); 
}

function del_cate(){
    $('#cate_s').val(null).trigger('change');
}

function del_nb(){
    $('#manu_s').val(null).trigger('change');
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
function detail_read(idh, title){
    $('#title_modal_h').text("Lịch sử mượn - trả / đọc sách :: "+title);
    $('#list_read').load(baseUrl + '/library/content_h?id='+idh);
    $('#pager_read').load(baseUrl + '/library/content_h_page?id='+idh);
    $('#id_book').val(idh); $('#modal-read').modal('show');
}

function view_page_read(pages){
    page_read = pages; var idh = $('#id_book').val();
    $('#list_read').load(baseUrl + '/library/content_h?id='+idh+'&page='+page_read+'&q='+keyword_read);
    $('#pager_read').load(baseUrl + '/library/content_h_page?id='+idh+'&page='+page_read+'&q='+keyword_read);
}

function search_read(){
    var idh = $('#id_book').val(), value = $('#nav-search-input-read').val();
    keyword_read = (value.length != 0) ? value.replaceAll(" ", "$", 'g') : '';
    $('#list_read').load(baseUrl + '/library/content_h?id='+idh+'&page=1&q='+keyword_read);
    $('#pager_read').load(baseUrl + '/library/content_h_page?id='+idh+'&page=1&q='+keyword_read);
}