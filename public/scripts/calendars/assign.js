var page = 1, keyword = '', url = '', page_user = 1, keyword_user = '', data = [];
var numbers_line = 0, keyword_subject = '', page_subject = 1;
var keyword_department = '', page_department = 1, data_dep = [],data_dep_title = [];
$(function(){
    $('#list_assign').load(baseUrl + '/assign/content');
});

function add(){
    $('#user_id').val(null); $('#fullname').val(null); $('#subject').val(null).trigger('change');
    $('#department').val(null).trigger('change'); data = []; render_table(data);
    $('#modal-assign').modal('show');
    url = baseUrl + '/assign/add';
}

function edit(idh){
    var userid = $('#userid_'+idh).text(), fullname = $('#name_'+idh).text(), detail = $('#detail_'+idh).text();
    $('#user_id').val(userid); $('#fullname').val(fullname); data = JSON.parse(detail); render_table(data);
    $('#code').val($('#code_'+idh).text()); $('#modal-assign').modal('show');
    url = baseUrl + '/assign/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/assign/del', '#list_assign', baseUrl + '/assign/content?page='+page+'&q='+keyword);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true, allline = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired && data.length > 0){
        data.forEach((obj, i) => {
            if(obj.subject_id == '' || obj.department_id == ''){
                allline = false;
            }
        });
        if(allline){
            $('#datadc').val(JSON.stringify(data));
            save_form_modal('#fm', url, '#modal-assign', '#list_assign',  baseUrl + '/assign/content?page='+page+'&q='+keyword);
        }else{
            show_message("error", "Chưa có bản ghi nào được chọn");
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_assign(pages){
    page = pages;
    $('#list_assign').load(baseUrl + '/assign/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
    }else{
        keyword = '';
    }
    $('#list_assign').load(baseUrl + '/assign/content?page=1&q='+keyword);
}

function detail(idh){
    $('#detail').load(baseUrl + '/assign/detail?id='+idh);
    $('#modal-detail').modal("show");
}
/////////////////////////////////////////////////////////////////////////////////
function select_user(){
    $('#modal-users').modal('show');
    $('#list_users').load(baseUrl + '/assign/list_user');
    $('#pager').load(baseUrl + '/assign/list_user_page');
}

function view_page_user(pages){
    page_user = pages;
    $('#list_users').load(baseUrl + '/assign/list_user?page='+page_user+'&q='+keyword_user);
    $('#pager').load(baseUrl + '/assign/list_user_page?page='+page_user+'&q='+keyword_user);
}

function search_user(){
    var value = $('#nav-search-input-user').val();
	if(value.length != 0){
        keyword_user = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_user = '';
    }
    $('#list_users').load(baseUrl + '/assign/list_user?page=1&q='+keyword_user);
    $('#pager').load(baseUrl + '/assign/list_user_page?page=1&q='+keyword_user);
}

function confirm_user(idh){
    $('#user_id').val(idh); var fullname = $('#fullname_'+idh).text();
    $('#fullname').val(fullname);
    $('#modal-users').modal('hide');
}
/////////////////////////////////////////////////////////////////////////////////////////
function add_line(){
    numbers_line += 1;
    var str = {'id': numbers_line, 'subject_id': '', 'department_id': '', 'subject': '', 'department': ''};
    data.push(str);
    render_table(data);
}

function render_table(data_json){
    var html = '', j = 1; $('#tbody').empty();
    for(i = 0; i < data_json.length; i++){
        var subject = (data_json[i].subject != '') ? data_json[i].subject : 'Lựa chọn';
        var department = (data_json[i].department != '') ? data_json[i].department : 'Lựa chọn';
        html += '<tr id="line_'+data_json[i].id+'">';
            html += '<td class="text-center">'+j+'</td>'
            html += '<td class="text-center">';
                html += '<a href="javascript:void(0)" onclick="select_subject('+data_json[i].id+')">'+subject+'</a>';
            html += '</td>';
            html += '<td>';
                html += '<a href="javascript:void(0)" onclick="select_department('+data_json[i].id+')">'+department+'</a>';
            html += '</td>';
            html += '<td class="text-center">';
                html += '<a href="javascript:void(0)" onclick="del_assign('+data_json[i].id+')">';
                    html += '<i class="fa fa-trash" style="color:red"></i>';
                html += '</a>';
            html += '</td>';
        html += '</tr>';
        j++;
    }
    $('#tbody').append(html);
}

function del_assign(idh){
    data = data.filter(item => item.id != idh);
    render_table(data);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
function select_subject(idh){
    $('#list_subject').load(baseUrl + '/assign/list_subject');
    $('#pager_subject').load(baseUrl + '/assign/list_subject_page');
    $('#idh_subject').val(idh); $('#modal-subject').modal('show');
}

function view_page_subject(pages){
    page_subject = pages;
    $('#list_subject').load(baseUrl + '/assign/list_subject?page='+page_subject+'&q='+keyword_subject);
    $('#pager_subject').load(baseUrl + '/assign/list_subject_page?page='+page_subject+'&q='+keyword_subject);
}

function search_subject(){
    var value = $('#nav-search-input-subject').val();
	if(value.length != 0){
        keyword_subject = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_subject = '';
    }
    $('#list_subject').load(baseUrl + '/assign/list_subject?page=1&q='+keyword_subject);
    $('#pager_subject').load(baseUrl + '/assign/list_subject_page?page=1&q='+keyword_subject);
}

function confirm_subject(idh){
    var id = parseInt($('#idh_subject').val()), subject = $('#titlesubject_'+idh).text();
    var objIndex_subject = data.findIndex(item => item.subject_id === idh);
    var objIndex = data.findIndex(item => item.id === id);
    if(objIndex_subject != -1){
        show_message("error", "Môn học đã được chọn, không thể chọn lại");
        return false;
    }else{
        data[objIndex].subject_id = idh; data[objIndex].subject = subject;
        //data.push(str);
        render_table(data); $('#modal-subject').modal('hide');
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function select_department(idh){
    var objIndex = data.findIndex(item => item.id === idh); data_dep = convert_string_to_array_number(data[objIndex].department_id);
    data_dep_title = data[objIndex].department.split(", ").filter(item => item !== "");
    $('#list_department').load(baseUrl + '/assign/list_department?checked='+btoa(data_dep.join(",")));
    $('#pager_department').load(baseUrl + '/assign/list_department_page');
    $('#idh_department').val(idh); 
    var title = "Danh sách lớp học :: Đăng ký cho môn học "+data[objIndex].subject;
    $('#title_header_dep').text(title);
    $('#modal-department').modal('show');
}

function view_page_department(pages){
    page_department = pages; var idh = $('#idh_department').val(); var objIndex = data.findIndex(item => item.id === idh);
    $('#list_department').load(baseUrl + '/assign/list_department?page='+page_department+'&q='+keyword_department+'&checked='+btoa(data_dep.join(",")));
    $('#pager_department').load(baseUrl + '/assign/list_department_page?page='+page_department+'&q='+keyword_department);
}

function search_department(){
    var value = $('#nav-search-input-department').val(); var idh = $('#idh_department').val();
    var objIndex = data.findIndex(item => item.id === idh);
	if(value.length != 0){
        keyword_department = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_department = '';
    }
    $('#list_department').load(baseUrl + '/assign/list_department?page=1&q='+keyword_department+'&checked='+btoa(data_dep.join(",")));
    $('#pager_department').load(baseUrl + '/assign/list_department_page?page=1&q='+keyword_department);
}

function checked_department(idh){
    var value = $('#ck_'+idh).is(':checked'), title = $('#titledep_'+idh).text();
    if(value){
        data_dep.push(idh); data_dep_title.push(title);
    }else{
        var datadep = data_dep.filter(item => item !== idh); 
        var datadeptitle = data_dep_title.filter(item => item !== title);
        data_dep = datadep; data_dep_title = datadeptitle;
    }
}

function confirm_department(){
    if(data_dep.length > 0){
        var id = parseInt($('#idh_department').val());
        var objIndex = data.findIndex(item => item.id === id);
        data[objIndex].department_id = data_dep.join(","); 
        data[objIndex].department = data_dep_title.join(", ");
        render_table(data); $('#modal-department').modal('hide');
        data_dep = []; data_dep_title = [];
    }else{
        show_message("error", "Chưa có bản ghi nào được chọn");
    }
}

function convert_string_to_array_number(str){
    var string = str.split(","), data_tmp = []; 
    var arr_dep = string.filter(item => item !== "");
    if(arr_dep.length > 0){
        for(const item of arr_dep){
            data_tmp.push(parseInt(item));
        }
    } 
    return data_tmp;
}