var page = 1, keyword  = '', ulr = '', page_dep = 1, keyword_dep  = '';
var page_user = 1, keyword_user = '', dateloan = '', lessonloan = '';
var names = '', dates = '', deps = '';
$(function(){
    $('#list_dep').load(baseUrl + '/dep_loan/content');
});

function add(){
    let today = new Date(), ngay = today.getDate(), thang = (today.getMonth() + 1);
    var nam = today.getFullYear(), hientai = ngay+'-'+thang+'-'+nam; 
    $('#date_loan').datepicker('setDate', hientai); $('#fullname').val(null);
    $('#user_loan').val(null); $('#lesson').val(null).trigger('change');
    $('#title_dep').val(null); $('#department_id').val(null); $('#content').val(null);
    $('#modal-dep').modal('show');
    url= baseUrl + '/dep_loan/add';
}

function edit(idh){
    $.getJSON(baseUrl + '/dep_loan/data_edit?id='+idh, function(data){
        $('#user_loan').val(data.user_loan); $('#fullname').val(data.fullname);
        $('#date_loan').datepicker('setDate', data.date_loan); $('#content').val(data.content);
        $('#department_id').val(data.department_id); $('#title_dep').val(data.department);
        $('#lesson').val(data.lesson).trigger('change');
    });
    $('#modal-dep').modal('show');
    url = baseUrl + '/dep_loan/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/dep_loan/del', "#list_dep", baseUrl + '/dep_loan/content?page='+page+'&name='+names+'&date='+dates+'&dep='+deps);
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
        save_form_modal('#fm', url, '#modal-dep', '#list_dep',  baseUrl + '/dep_loan/content?page='+page+'&name='+names+'&date='+dates+'&dep='+deps); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_dep(pages){
    page = pages;
    $('#list_dep').load(baseUrl + '/dep_loan/content?page='+page+'&name='+names+'&date='+dates+'&dep='+deps);
}

function search(){
    var name = $('#fullnames').val(), date = $('#date_loan_s').val(), dep = $('#deps').val();
    if(name.length > 0 || date.length > 0 || dep.length > 0){
        if(name.length != 0){
            names = name.replaceAll(" ", "$", 'g');
        }else{
            names = '';
        }
        if(dep.length != 0){
            deps = dep.replaceAll(" ", "$", 'g');
        }else{
            deps = '';
        }
        dates = date;
    }else{
        names = ''; dates = ''; deps = '';
    }
    $('#list_dep').load(baseUrl + '/dep_loan/content?page=1&name='+names+'&date='+dates+'&dep='+deps);
}

function detail(idh){
    $('#detail').load(baseUrl + '/dep_loan/detail?id='+idh);
    $('#modal-detail').modal('show');
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function select_user(){
    $('#list_user').load(baseUrl + '/dep_loan/list_user');
    $('#pager_user').load(baseUrl + '/dep_loan/list_user_page');
    $('#modal-users').modal('show');
}

function view_page_user(pages){
    page_user = pages;
    $('#list_user').load(baseUrl + '/dep_loan/list_user?page='+page_user+'&q='+keyword_user);
    $('#pager_user').load(baseUrl + '/dep_loan/list_user_page?page='+page_user+'&q='+keyword_user);
}

function search_user(){
    var value = $('#nav-search-input-user').val();
	if(value.length != 0){
        keyword_user = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_user = '';
    }
	$('#list_user').load(baseUrl+'/dep_loan/list_user?page=1&q='+keyword_user);
	$('#pager_user').load(baseUrl+'/dep_loan/list_user_page?page=1&q='+keyword_user);
}

function confirm_user(idh){
    $('#user_loan').val(idh); var fullname = $('#fullname_'+idh).text();
	$('#fullname').val(fullname);
	$('#modal-users').modal('hide');
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function select_dep(){
    if($('#date_loan').val().length != 0 && $('#lesson').val().length != 0){
        dateloan = $('#date_loan').val(); lessonloan = $('#lesson').val();
        $('#list_deps').load(baseUrl + '/dep_loan/list_dep?date='+dateloan+'&lesson='+lessonloan);
        $('#pager_deps').load(baseUrl + '/dep_loan/list_dep_page?date='+dateloan+'&lesson='+lessonloan);
        $('#modal-department').modal('show');
    }else{
        show_message("error",  "Để đăng ký sử dụng phòng chức năng bạn phải chọn ngày sử dụng và tiết  học");
    }
}

function view_page_dep(pages){
    page_dep = pages;
    $('#list_deps').load(baseUrl + '/dep_loan/list_dep?page='+page_dep+'&q='+keyword_dep+'&date='+dateloan+'&lesson='+lessonloan);
    $('#pager_deps').load(baseUrl + '/dep_loan/list_dep_page?page='+page_dep+'&q='+keyword_dep+'&date='+dateloan+'&lesson='+lessonloan);
}

function search_dep(){
    var value = $('#nav-search-input-dep').val();
	if(value.length != 0){
        keyword_dep = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_dep = '';
    }
	$('#list_deps').load(baseUrl + '/dep_loan/list_dep?page=1&q='+keyword_dep+'&date='+dateloan+'&lesson='+lessonloan);
    $('#pager_deps').load(baseUrl + '/dep_loan/list_dep_page?page=1&q='+keyword_dep+'&date='+dateloan+'&lesson='+lessonloan);
}

function confirm_dep(idh){
    var title = $('#title_'+idh).text();
    $('#department_id').val(idh); $('#title_dep').val(title);
    $('#modal-department').modal('hide');
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function del_date_loan(){
    $('#date_loan_s').val(null);
}