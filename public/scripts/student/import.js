var page = 1, keyword = '', numbers_line = 0, data = [], url = '', departmentid = 0;
$(function(){
    $('#list_student_tmp').load(baseUrl + '/student/content_tmp');
    combo_select_2('#department_id', baseUrl + '/other/combo_department?yearid='+yearid, 0, '');
});

function save(){
    var department = $('#department_id').val();
    if(department.length != 0){
        departmentid = department;
        save_form_reset_form('#fm', baseUrl + '/student/do_import', '#list_student_tmp', baseUrl + '/student/content_tmp?departmentid='+department);
        $('#file_tmp').val(null);
    }else{
        show_message("error", "Bạn chưa chọn lớp học");
        $('#file_tmp').val(null);
        return false;
    }
}

function view_page_student(pages){
    page = pages;
    $('#list_student_tmp').load(baseUrl + '/student/content_tmp?departmentid='+departmentid+'&page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_student_tmp').load(baseUrl + '/student/content_tmp?departmentid='+departmentid+'&page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_student_tmp').load(baseUrl + '/student/content_tmp?departmentid='+departmentid+'&page=1&q='+keyword);
    }
}

function del_tmp(){
    var data_str = "id=";
    del_data(data_str, "Bạn có chắc chắn muốn xóa dữ liệu tạm?", baseUrl+'/student/del_all', "#list_student_tmp", baseUrl + '/student/content_tmp?departmentid='+departmentid+'&page='+page+'&q='+keyword);
}

function edit(idh){
    var code = $('#code_'+idh).text(), fullname = $('#fullname_'+idh).text();
    var gender = $('#gender_'+idh).text(), birthday = $('#birthday_'+idh).text();
    var address = $('#address_'+idh).text(), datadc = $('#datadc_'+idh).text();
    var people = $('#people_'+idh).text(), religion = $('#religion_'+idh).text();
    var codecsdl = $('#codecsdl_'+idh).text(), peolpe_text = $('#peoplet_'+idh).text();
    data = JSON.parse(datadc); render_table(data); numbers_line = data.length;
    $('#code').val(code); $('#fullname').val(fullname); $('#gender').val(gender).trigger('change');
    $('#birthday').val(birthday); $('#address').val(address); $('#people_id').val(people).trigger('change');
    $('#religion').val(religion).trigger('change'); $('#code_csdl').val(codecsdl);
    combo_select_2('#people_id', baseUrl + '/other/combo_people?yearid='+yearid, people, peolpe_text);
    $('#modal-student').modal('show');
    url = baseUrl + '/student/update_tmp?id='+idh;
}

function save_info(){
    var fullname = $('#fullname').val(), gender = $('#gender').val(), birthday = $("#birthday").val();
    var address = $('#address').val(); 
    if(fullname.length > 0 && gender.length > 0 && birthday.length > 0 && address.length > 0){
        $('#datadc').val(JSON.stringify(data));
        save_form_modal('#fm_edit', url, '#modal-student', '#list_student_tmp',  baseUrl+'/student/content_tmp?departmentid='+departmentid+'&page='+page+'&q='+keyword); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa dữ liệu?", baseUrl+'/student/del_tmp', "#list_student_tmp", baseUrl + '/student/content_tmp?departmentid='+departmentid+'&page='+page+'&q='+keyword);
}

function detail(idh){
    $('#detail').load(baseUrl + '/student/detail?id='+idh);
    $('#modal-detail').modal('show');
}
///////////////////////////////////////////////////////////////////////////////////////
function add_line(){
    numbers_line += 1;
    var str = {'id': numbers_line, 'relation': '', 'fullname': '', 'year': '', 'phone': '', 'job': ''};
    data.push(str);
    render_table(data);
}

function render_table(data_json){
    var html = '', j = 1; $('#tbody').empty();
    for(i = 0; i < data_json.length; i++){
        html += '<tr id="line_'+data_json[i].id+'">';
            html += '<td class="text-center">'+j+'</td>'
            html += '<td class="text-center">';
                html += '<input id="relation_'+data_json[i].id+'" type="text" class="form-control" size="5" name="relation"';
                html += 'value="'+data_json[i].relation+'" onchange="push_data(this, '+data_json[i].id+')"/>';
            html += '</td>';
            html += '<td>';
                html += '<input id="fullname_'+data_json[i].id+'" type="text" class="form-control" size="15" name="fullname1"';
                html += 'value="'+data_json[i].fullname+'" onchange="push_data(this, '+data_json[i].id+')"/>';
            html += '</td>';
            html += '<td class="text-center">';
                html += '<input id="year_'+data_json[i].id+'" type="text" class="form-control" size="7" name="year"';
                html += 'onkeypress="validate(event)" maxlength="4" value="'+data_json[i].year+'" onchange="push_data(this, '+data_json[i].id+')"/>';
            html += '</td>';
            html += '<td class="text-center">';
                html += '<input id="phone_'+data_json[i].id+'" type="text" class="form-control" size="10" name="phone"';
                html += 'onkeypress="validate(event)" maxlength="10" value="'+data_json[i].phone+'" onchange="push_data(this, '+data_json[i].id+')"/>';
            html += '</td>';
            html += '<td class="text-center">';
                html += '<input id="job_'+data_json[i].id+'" type="text" class="form-control" size="15" name="job"';
                html += 'value="'+data_json[i].job+'" onchange="push_data(this, '+data_json[i].id+')"/>';
            html += '</td>';
            html += '<td class="text-center">';
                html += '<a href="javascript:void(0)" onclick="del_relatiion('+data_json[i].id+')">';
                    html += '<i class="fa fa-trash" style="color:red"></i>';
                html += '</a>';
            html += '</td>';
        html += '</tr>';
        j++;
    }
    $('#tbody').append(html);
}

function del_relatiion(idh){
    data = data.filter(item => item.id != idh);
    render_table(data);
}

function push_data(type, idh){
    var objIndex = data.findIndex(item => item.id == idh);
    if(type.name == 'relation'){
        data[objIndex].relation = $(type).val();
    }else if(type.name == 'fullname1'){
        data[objIndex].fullname = $(type).val();
    }else if(type.name == 'year'){
        data[objIndex].year = $(type).val();
    }else if(type.name == 'phone'){
        data[objIndex].phone = $(type).val();
    }else if(type.name == 'job'){
        data[objIndex].job = $(type).val();
    }
}

function refresh_code(){
    var number = Math.floor(Math.random() * 999999999999);
    $('#code').val(number);
}

function save_tmp(){
    var data_str = '';
    update_data(data_str, "Bạn có chắc chắn muốn cập nhật dữ liệu ?", baseUrl + '/student/update_all', baseUrl + '/student');
}