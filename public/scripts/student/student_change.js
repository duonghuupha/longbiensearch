var page = 1, years = '', genders = 0, fullnames = '', page_check = 1, data = [], departmentid = 0;
var page_class = 1;
$(function(){
    //$('#department_id').load(baseUrl + '/other/combo_department?yearid='+yearid);
    $('#list_student').load(baseUrl + '/student_change/content');
    combo_select_2('#department_id', baseUrl + '/other/combo_department?yearid='+yearid);
});

function search(){
    var year = $('#year_s').val(), gender = $('#gender_s').val(), fullname = $('#fullname_s').val();
    if(year.length > 0 || gender.length > 0){
        years = year; genders = gender;
        if(fullname.length > 0){
            fullnames = fullname.replaceAll(" ", "$", 'g');
        }
    }else{
        years = ''; genders = 0; fullnames  = '';
    }
    $('#list_student').load(baseUrl + '/student_change/content?page=1&year='+years+'&gender='+genders+'&fullname='+fullnames);
}

function view_page_student(pages){
    page = pages;
    $('#list_student').load(baseUrl + '/student_change/content?page='+page+'&year='+years+'&gender='+genders+'&fullname='+fullnames);
}

function check_row(idh){
    var value = $('#ck_'+idh).prop("checked");
    if(value){
        $('#ck_'+idh).prop("checked", false);
    }else{
        $('#ck_'+idh).prop("checked", true);
    }
}

function check_list(){
    var classid = $('#department_id').val(), class_title = $('#department_id').select2('data'); 
    if(classid.length  > 0){
        departmentid = classid;
        let myArray = (function() {
            let a = [];
            $(".ck_inma:checked").each(function() {
                //var qty = $('#qty_'+this.value).val();
                a.push(this.value);
            });
            return a;
        })()
        if(myArray.length > 0){
            data = myArray;
            $('#title_modal').text("Danh sách học sinh đã chọn để phân vào "+class_title[0].text);
            $('#list_data').load(baseUrl + '/student_change/content_check?page=1&classid='+departmentid+"&data="+btoa(data.join(',')));
            $('#modal-detail').modal('show');
        }else{
            show_message('error', 'Không có bản ghi nào được chọn');
            return false;
        }
    }else{
        show_message('error', 'Bạn chưa chọn lớp');
        return false;
    }
}

function view_page_student_check(pages){
    page_check = pages;
    $('#list_data').load(baseUrl + '/student_change/content_check?page='+page_check+'&classid='+departmentid+"&data="+btoa(data.join(',')));
}

function save(){
    if(departmentid != 0 && data.length != 0){
        var data_str = "department_id="+departmentid+'&data='+btoa(data.join(','));
        del_data_modal(data_str, "Bạn có chắc chắn muốn phân lớp cho các học sinh này", baseUrl + '/student_change/add', "#list_student", baseUrl + '/student_change/content_class?classid='+departmentid, "#modal-detail");
    }else{
        show_message("error", "Không có dữ liệu lớp học và học sinh");
        return false;
    }
}

function view_page_student_class(pages){
    page_class = pages;
    $('#list_student').load(baseUrl + '/student_change/content_class?classid='+departmentid+'&page='+page_class);
}