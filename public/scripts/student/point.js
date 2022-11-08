var page = 1, fullnames = '', semesters = '', subjects = '', departments = '', url = '';
var page_app = 1, keyword_app = '';
$(function(){
    $('#list_student').load(baseUrl + '/student_point/content');
    combo_select_2('#subject_id', baseUrl + '/other/combo_subject_user');
});

function view_page_student(pages){
    page = pages;
    $('#list_student').load(baseUrl + '/student_point/content?page='+page+'&semester='+semesters+'&subject='+subjects+'&department='+departments+'&fullname='+fullnames);
}

function view_point(){
    var semester = $('#semester').val(), subject = $('#subject_id').val();
    var department = $('#department_id').val(), fullname = $('#fullnames').val();
    if(subject.length != 0){
        if(fullname.length > 0){
            fullnames = fullname.replaceAll(" ", "$", 'g');
        }else{
            fullnames = '';
        }
        if(department.length != 0){
            departments = department;
        }else{
            departments = '';
        }
        semesters = semester; subjects = subject;
        $('#list_student').load(baseUrl + '/student_point/content?page=1&semester='+semesters+'&subject='+subjects+'&department='+departments+'&fullname='+fullnames);
    }else{
        show_message("error", "Bạn phải chọn môn học");
    }
}

function set_point(idh, seme, sub){
    if(sub != 0){
        $('#info_student').load(baseUrl + '/student_point/info?id='+idh+'&seme='+seme+'&subject='+sub);
        $('#tbody').load(baseUrl + '/student_point/point_of_student?id='+idh+'&seme='+seme+'&subject='+sub)
        $('#studentid').val(idh); $('#semesterid').val(seme); $('#subjectid').val(sub);
        $('#type_point').val(1).trigger('change'); $('#point').val(null); $('#modal-point').modal('show'); 
        var diem = $('#diem1_'+idh).text();
        if(diem.length > 0){
            $('#ly_do').show(); $('#content').attr('required', true); $('#content').val(null);
            $('#file_bb').hide(); $('#image').attr('required', false);
            url = baseUrl + '/student_point/update';
        }else{
            $('#ly_do').hide(); $('#content').attr('required', false); $('#content').val(null);
            $('#file_bb').hide(); $('#image').attr('required', false);
            url = baseUrl + '/student_point/add';
        }
    }else{
        show_message("error", "Bạn chưa chọn môn học");
    }
}

function set_update(){
    var value = $('#type_point').val(); var diem = $('#diem'+value).text();
    if(diem.length > 0){
        $('#ly_do').show(); $('#content').attr('required', true); $('#content').val(null);
        if(value > 4){
            $('#file_bb').show(); $('#image').attr('required', true);
        }else{
            $('#file_bb').hide(); $('#image').attr('required', false);
        }
        url = baseUrl + '/student_point/update';
    }else{
        $('#ly_do').hide(); $('#content').attr('required', false); $('#content').val(null);
        $('#file_bb').hide(); $('#image').attr('required', false);
        url = baseUrl + '/student_point/add';
    }
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
        save_form_modal('#fm', url, '#modal-point', '#list_student',  baseUrl + '/student_point/content?page=1&semester='+semesters+'&subject='+subjects+'&department='+departments+'&fullname='+fullnames); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}
///////////////////////////////////////////////////////////////////////////////////////////
function set_dep(){
    var value = $('#subject_id').val();
    combo_select_2('#department_id', baseUrl + '/other/combo_department_user?id='+value);
}
///////////////////////////////////////////////////////////////////////////////////////////
function app_point(){
    $('#list_app').load(baseUrl + '/student_point/list_app');
    $('#pager_app').load(baseUrl + '/student_point/list_app_page');
    $('#modal-app').modal('show');
}

function view_page_app(pages){
    page_app = pages;
    $('#list_app').load(baseUrl + '/student_point/list_app?page='+page_app+'&q='+keyword_app);
    $('#pager_app').load(baseUrl + '/student_point/list_app_page?page='+page_app+'&q='+keyword_app);
}

function search_app(){
    var value = $('#nav-search-input-app').val();
    if(value.length != 0){
        keyword_app = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_app = '';
    }
    $('#list_app').load(baseUrl + '/student_point/list_app?page=1&q='+keyword_app);
    $('#pager_app').load(baseUrl + '/student_point/list_app_page?page=1&q='+keyword_app);
}
///////////////////////////////////////////////////////////////////////////////////////////
function app_point_true(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn duyệt điểm được sửa ?", baseUrl + '/student_point/app_point?type=1', '#list_app', baseUrl+'/student_point/list_app?page='+page_app+'&q='+keyword_app);
}

function app_point_false(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn duyệt điểm được sửa ?", baseUrl + '/student_point/app_point?type=2', '#list_app', baseUrl+'/student_point/list_app?page='+page_app+'&q='+keyword_app);
}