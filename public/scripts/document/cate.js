var page = 1, keyword = '', url = baseUrl + '/document_cate/add';
$(function(){
    $('#list_document').load(baseUrl + '/document_cate/content');
    $('#parent_id').load(baseUrl + '/other/combo_document_cate');
});

function edit(idh){
    var parent = $('#parentid_'+idh).text(), title = $('#title_'+idh).text();
    $('#title').val(title); $('#parent_id').val(parent).trigger('change');
    url = baseUrl + '/document_cate/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xoa dữ liệu này?",  baseUrl + '/document_cate/del', '#list_document', baseUrl+'/document_cate/content?page='+page+'&q='+keyword);
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
        save_form_reset_form('#fm', url, '#list_document',  baseUrl+'/document_cate/content?page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_document(pages){
    page = pages;
    $('#list_document').load(baseUrl + '/document_cate/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_document').load(baseUrl + '/document_cate/content?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_document').load(baseUrl + '/document_cate/content?page=1&q='+keyword);
    }
}