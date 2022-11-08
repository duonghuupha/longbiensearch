var page = 1, keyword = '', url =  '', page_criteria = 1, keyword_criteria = '';
var standards = '', criterias = '', codeproofs = '', titles  = '';
var page_doc = 1, keyword_doc = '';
$(function(){
    $('#list_proof').load(baseUrl + '/proof/content');
    $('#standards').load(baseUrl + '/other/combo_tieu_chuan');
    $('.remove').click(function(){
        $('#file_select').empty(); $('#doc_id').val(null);
        $('#select_doc').attr('disabled', false);
    });
});

function add(){
    $('#criteria_id').val(null); $('#fullname').val(null);
    $('#code_proof').val(null); $('#title').val(null);
    $('#file_old').val(null); $('#file').ace_file_input('reset_input');
    $('#file_select').empty(); $('#select_doc').attr('disabled', false);
    $('#doc_id').val(null); $('#modal-proof').modal('show');
    url = baseUrl + '/proof/add';
}

function edit(idh){
    $.getJSON(baseUrl + '/proof/data_edit?id='+idh, function(result){
        $('#criteria_id').val(result.criteria_id); $('#fullname').val(result.criteria);
        $('#code_proof').val(result.code_proof); $('#title').val(result.title);
        $('#file_old').val(result.file); $('#code').val(result.code);
        $('#doc_id').val(result.file_link);
    });
    $('#file_select').empty(); $('#select_doc').attr('disabled', false);
    $('#file').attr('disabled', false); $('#file').ace_file_input('reset_input');
    $('#modal-proof').modal('show');
    url = baseUrl + '/proof/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/proof/del',   '#list_proof', baseUrl + '/proof/content?page='+page+'&standard='+standards+'&criteria='+criterias+'&codeproof='+codeproofs+'&title='+titles);
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
        if($('#file_old').val().length == 0){
            if($('#file').val().length == 0 && $('#doc_id').val().length == 0){
                show_message('error', "Bạn chưa chọn Tệp đính kèm");
            }else{
                save_form_modal('#fm', url, '#modal-proof', '#list_proof', baseUrl + '/proof/content?page='+page+'&standard='+standards+'&criteria='+criterias+'&codeproof='+codeproofs+'&title='+titles);
            }
        }else{
            save_form_modal('#fm', url, '#modal-proof', '#list_proof', baseUrl + '/proof/content?page='+page+'&standard='+standards+'&criteria='+criterias+'&codeproof='+codeproofs+'&title='+titles); 
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_proof(pages){
    page = pages;
    $('#list_proof').load(baseUrl + '/proof/content?page='+page+'&standard='+standards+'&criteria='+criterias+'&codeproof='+codeproofs+'&title='+titles);
}

function filter(){
    $('#modal-search').modal('show');
}

function set_criteria(){
    var value = $('#standards').val();
    $('#criterias').load(baseUrl + '/other/combo_criteria?id='+value);
}

function search(){  
    var standard = $('#standards').val(), criteria = $('#criterias').val();
    var codeproof = $('#codeproofs').val(), title = $('#titles').val();
    if(standard.length > 0 || criteria != null || codeproof.length > 0 || title.length > 0){
        if(codeproof.length > 0){
            codeproofs = codeproof.replaceAll(" ", "$", 'g');
        }else{
            codeproofs = '';
        }
        if(title.length > 0){
            titles = title.replaceAll(" ", "$", 'g');
        }else{
            titles = '';
        }
        standards = standard; criterias = criteria;
    }else{
        standards = '';  criterias= ''; codeproofs = ''; titles = '';
    }
    $('#list_proof').load(baseUrl + '/proof/content?page=1&standard='+standards+'&criteria='+criterias+'&codeproof='+codeproofs+'&title='+titles);
    $('#modal-search').modal('hide');
}

function detail(idh){
    $('#detail').load(baseUrl + '/proof/detail?id='+idh);
    $('#modal-detail').modal('show');
}
/////////////////////////////////////////////////////////////////////////////////////////
function select_criteria(){
    $('#list_criteria').load(baseUrl + '/proof/list_criteria');
    $('#pager_criteria').load(baseUrl + '/proof/list_criteria_page');
    $('#modal-criteria').modal('show');
}

function view_page_criteria(pages){
    page_criteria = pages;
    $('#list_criteria').load(baseUrl + '/proof/list_criteria?page='+page_criteria+'&q='+keyword_criteria);
    $('#pager_criteria').load(baseUrl + '/proof/list_criteria_page?page='+page_criteria+'&q='+keyword_criteria);
}

function search_criteria(){
    var value = $('#nav-search-input-criteria').val();
    if(value.length != 0){
        keyword_criteria = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_criteria = '';
    }
    $('#list_criteria').load(baseUrl + '/proof/list_criteria?page=1&q='+keyword_criteria);
    $('#pager_criteria').load(baseUrl + '/proof/list_criteria_page?page=1&q='+keyword_criteria);
}

function confirm_criteria(idh){
    $('#criteria_id').val(idh); var title = $('#title_'+idh).text();
    $('#fullname').val(title); $('#modal-criteria').modal('hide');
}
////////////////////////////////////////////////////////////////////////////////////////////
function select_document(){
    $('#list_doc').load(baseUrl + '/proof/list_doc');
    $('#pager_doc').load(baseUrl + '/proof/list_doc_page');
    $('#modal-doc').modal('show');
}

function view_page_doc(pages){
    page_doc = pages;
    $('#list_doc').load(baseUrl + '/proof/list_doc?page='+page_doc+'&q='+keyword_doc);
    $('#pager_doc').load(baseUrl + '/proof/list_doc_page?page='+page_doc+'&q='+keyword_doc);
}

function search_doc(){
    var value = $('#nav-search-input-doc').val();
    if(value.length != 0){
        keyword_doc = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_doc = '';
    }
    $('#list_doc').load(baseUrl + '/proof/list_doc?page=1&q='+keyword_doc);
    $('#pager_doc').load(baseUrl + '/proof/list_doc_page?page=1&q='+keyword_doc);
}

function confirm_doc(idh){
    $('#doc_id').val(idh); var html = '';
    html += '<i>';
        html += '<b>Loại văn bản: </b>'+$('#type_'+idh).text()+'<br/>';
        html += '<b>Tiêu đề văn bản: </b>'+$('#title_'+idh).text()+'<br/>';
        html += '<b>Danh mục: </b>'+$('#cate_'+idh).text()+'<br/>';
        html += '<a href="javascript:void(0)" style="color:red" onclick="del_file_select()"><i class="ace-icon fa fa-trash"></i></a>'
    html += '</i>';
    $('#file_select').html(html); $('#file').attr('disabled', true);
    $('#modal-doc').modal('hide');
}
///////////////////////////////////////////////////////////////////////////////////////////////
function del_file_select(){
    $('#file_select').empty(); $('#doc_id').val(null);
    $('#file').attr('disabled', false); 
}

function set_attr_btn(){
    $('#file_select').empty(); $('#doc_id').val(null);
    $('#select_doc').attr('disabled', true);
    var value = $('#file').val(); ext = value.split().pop();
    if(ext != 'pdf' || ext != 'PDF'){
        show_message("error", "Tệp đính kèm phải là dạng PDF");
        $('#file').ace_file_input('reset_input');
    }
}