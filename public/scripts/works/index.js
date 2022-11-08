var page = 1, keyword = '', url = '', data = [], page_works = 1, keyword_work = '';
var groups = '', workss = '', titles = '';
$(function(){
    $('#list_works').load(baseUrl + '/works/content');
    $('#group_id_s').load(baseUrl + '/other/combo_works_group');
    $('.remove').click(function(){
        $('#file_select').empty(); $('#doc_id').val(null);
        $('#select_doc').attr('disabled', false);
    });
});

function add(){
    $('#datadc').val(null); $('#title').val(null); data = []; $('#content').val(null);
    $('#fullname').val(null); $('#file_old').val(null); $('#file').ace_file_input('reset_input');
    $('#file_select').empty(); $('#select_doc').attr('disabled', false);
    $('#doc_id').val(null); $('#modal-works').modal('show');
    url = baseUrl + '/works/add';
}

function edit(idh){
    var worksid = $('#worksid_'+idh).text(); $('#datadc').val(worksid); data = worksid.split(",");
    $('#fullname').val("Đã chọn "+data.length+" danh mục");
    $.getJSON(baseUrl + '/works/data_edit?id='+idh, function(result){
        $('#title').val(result.title); $('#content').val(result.content);
        $('#fileold').val(result.file); $('#doc_id').val(result.file_link);
    });
    $('#file_select').empty(); $('#select_doc').attr('disabled', false);
    $('#file').attr('disabled', false); $('#file').ace_file_input('reset_input');
    $('#modal-works').modal('show');
    url = baseUrl + '/works/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/works/del','#list_works', baseUrl + '/works/content?page='+page+'&group='+groups+'&works='+workss+'&title='+titles);
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
        if($('#fileold').val().length == 0){
            if($('#file').val().length == 0 && $('#doc_id').val().length == 0){
                show_message('error', "Bạn chưa chọn Tệp đính kèm");
            }else{
                save_form_modal('#fm', url, '#modal-works', '#list_works', baseUrl + '/works/content?page='+page+'&group='+groups+'&works='+workss+'&title='+titles); 
            }
        }else{
            save_form_modal('#fm', url, '#modal-works', '#list_works', baseUrl + '/works/content?page='+page+'&group='+groups+'&works='+workss+'&title='+titles); 
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_works(pages){
    page = pages;
    $('#list_works').load(baseUrl + '/works/content?page='+page+'&group='+groups+'&works='+workss+'&title='+titles);

}

function filter(){
    $('#modal-search').modal('show');
}

function search(){
    var groupids = $('#group_id_s').val(), worksids = $('#works_id_s').val(), title = $('#titles').val();
    if(groupids.length != 0 || worksids != null || title.length != 0){
        groups = groupids; workss = worksids;
        if(title.length != 0){
            titles = title.replaceAll(" ", "$", 'g');
        }else{
            titles = '';
        }
    }else{
        groups = ''; workss = '', titles = '';
    }
    $('#list_works').load(baseUrl + '/works/content?page=1&group='+groups+'&works='+workss+'&title='+titles);
    $('#modal-search').modal('hide');
}
////////////////////////////////////////////////////////////////////////////////////////
function select_works(){
    $('#list_works_cate').load(baseUrl + '/works/list_works?selected='+btoa(data.join(",")));
    $('#pager_works_cate').load(baseUrl + '/works/list_works_page');
    $('#modal-works-cate').modal('show');
}

function view_page_works_cate(pages){
    page_works = pages;
    $('#list_works_cate').load(baseUrl + '/works/list_works?selected='+btoa(data.join(","))+'&page='+page_works+'&q='+keyword_work);
    $('#pager_works_cate').load(baseUrl + '/works/list_works_page?page='+page_works+'&q='+keyword_work);
}

function search_works(){
    var value = $('#nav-search-input-works').val();
    if(value.length != 0){
        keyword_work = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_work = '';
    }
    $('#list_works_cate').load(baseUrl + '/works/list_works?selected='+btoa(data.join(","))+'&page=1&q='+keyword_work);
    $('#pager_works_cate').load(baseUrl + '/works/list_works_page?page=1&q='+keyword_work);
}

function sl_works(idh){
    var value = $('#ck_'+idh).is(':checked');
    if(value){
        data.push(idh);
    }else{
        data = data.filter(item => item !== idh);
    }
}

function confirm_works(){
    if(data.length != 0){
        $('#datadc').val(data.join(",")); $('#fullname').val("Đã chọn "+data.length+" danh mục");
        $('#modal-works-cate').modal('hide');
    }else{
        show_message("error", "Không có bản ghi nào được chọn");
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function detail(idh){
    $('#detail').load(baseUrl + '/works/detail?id='+idh);
    $('#modal-detail').modal('show');
}

function set_works_cate(){
    var value = $('#group_id_s').val();
    $('#works_id_s').load(baseUrl + '/other/combo_works_cate?id='+value);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function select_document(){
    $('#list_doc').load(baseUrl + '/works/list_doc');
    $('#pager_doc').load(baseUrl + '/works/list_doc_page');
    $('#modal-doc').modal('show');
}

function view_page_doc(pages){
    page_doc = pages;
    $('#list_doc').load(baseUrl + '/works/list_doc?page='+page_doc+'&q='+keyword_doc);
    $('#pager_doc').load(baseUrl + '/works/list_doc_page?page='+page_doc+'&q='+keyword_doc);
}

function search_doc(){
    var value = $('#nav-search-input-doc').val();
    if(value.length != 0){
        keyword_doc = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_doc = '';
    }
    $('#list_doc').load(baseUrl + '/works/list_doc?page=1&q='+keyword_doc);
    $('#pager_doc').load(baseUrl + '/works/list_doc_page?page=1&q='+keyword_doc);
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
/////////////////////////////////////////////////////////////////////////////////////////////
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