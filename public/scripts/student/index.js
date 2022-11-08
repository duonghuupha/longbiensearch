var page = 1, keyword = '', url = '', numbers_line = 0, data = [];
var codes = '', names = '', dates = '', departments = '', addresss = '', genders = 0, peoples = '';
var religions = 0, codecsdls = '', sstatus = 1;
$(function(){
    $('#list_student').load(baseUrl + '/student/content');
    //$('#people_id').load(baseUrl + '/other/combo_people');
});

function add(){
    var number = Math.floor(Math.random() * 999999999999); data = []; render_table(data);
    $('#code').val(number); $('#fullname').val(null); $('#gender').val(1).trigger('change');
    $('#birthday').val(null); $('#address').val(null); 
    combo_select_2('#people_id',  baseUrl + '/other/combo_people', 2, 'Kinh');
    $('#image_old').val(null); $('#status').val(1).trigger('change'); $('#refreshcode').show();
    $('#modal-student').modal('show'); $('#religion').val(1).trigger('change');
    url = baseUrl + '/student/add'
}

function edit(idh){
    $('#refreshcode').hide();
    var code = $('#code_'+idh).text(), fullname = $('#fullname_'+idh).text();
    var gender = $('#gender_'+idh).text(), birthday = $('#birthday_'+idh).text();
    var status = $('#status_'+idh).text(), people = $('#people_'+idh).text();
    var address = $('#address_'+idh).text(), image = $('#image_'+idh).text();
    var datadc = $('#datadc_'+idh).text(), religion = $('#religion_'+idh).text();
    var codecsdl = $('#codecsdl_'+idh).text(), peoplet = $('#peopletext_'+idh).text();
    $('#code').val(code); $('#fullname').val(fullname); $('#gender').val(gender).trigger('change');
    $('#birthday').val(birthday); $('#address').val(address);
    $('#image_old').val(image); $('#status').val(status).trigger('change');
    $('#religion').val(religion).trigger('change'); $('#code_csdl').val(codecsdl);
    combo_select_2('#people_id',  baseUrl + '/other/combo_people', people, peoplet);
    // data relation////////////////////////////////////////////////////////
    data = JSON.parse(datadc); numbers_line = data.length;
    render_table(data);
    $('#modal-student').modal('show');
    url = baseUrl + '/student/update?id='+idh
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl + '/student/del', '#list_student', baseUrl + '/student/content?code='+codes+'&name='+names+'&date='+dates+'&class='+departments+'&address='+addresss+'&gender='+genders+'&people='+peoples+'&religion='+religions+'&page='+page+'&status='+sstatus);
}

function save(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired && data.length > 0){
        $('#datadc').val(JSON.stringify(data));
        save_form_modal('#fm', url, '#modal-student', '#list_student',  baseUrl + '/student/content?code='+codes+'&name='+names+'&date='+dates+'&class='+departments+'&address='+addresss+'&gender='+genders+'&people='+peoples+'&religion='+religions+'&page='+page+'&status='+sstatus); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_student(pages){
    page = pages;
    $('#list_student').load(baseUrl + '/student/content?code='+codes+'&name='+names+'&date='+dates+'&class='+departments+'&address='+addresss+'&gender='+genders+'&people='+peoples+'&religion='+religions+'&page='+page+'&status='+sstatus);
}

//////////////////////////////////////////////////////////////////////////////////////////
function detail(idh){
    $('#detail').load(baseUrl + '/student/detail?id='+idh);
    $('#modal-detail').modal('show');
}

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
                html += '<input id="phone_'+data_json[i].id+'" type="text" class="form-control" size="15" name="phone"';
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

function import_xls(){
    window.location.href = baseUrl + '/student/import';
}

function export_card(){
    window.location.href = baseUrl + '/student/export_card';
}

function filter(){
    $('#sdepartment').load(baseUrl + '/other/combo_department?yearid='+yearid);
    combo_select_2('#speople',  baseUrl + '/other/combo_people', 0, '');
    $('#modal-search').modal('show');
}

function del_speople(){
    $('#speople').val(null).trigger('change');
}

function del_sdepartment(){
    $('#sdepartment').val(null).trigger('change');
}

function search_adv(){
    var code= $('#scode').val(), name = $('#sfullname').val(), date = $('#sbirthday').val(), status = $('#sstatus').val();
    var classid = $('#sdepartment').val(), address = $('#saddress').val(), gender = $('#sgender').val();
    var peolpe = $('#speople').val(), religion = $('#sreligion').val(), codecsdl = $('#scodecsdl').val();
    if(code.length != 0 || name.length != 0 || date.length != 0 || classid.length != 0 || address.length != 0
        || gender != 0 || peolpe.length != 0 || religion != 0 || codecsdl.length != 0 || status != 0){
        if(name.length != 0){
            names = name.replaceAll(" ", "$", 'g');
        }
        if(address.length != 0){
            addresss = address.replaceAll(" ", "$", 'g');
        }
        codes = code; dates = date; departments = classid; genders = gender; 
        peoples = peolpe; religions = religion; codecsdls = codecsdl; sstatus = status;
    }else{
        codes = ''; dates = ''; departments = ''; names = ''; addresss = ''; genders = 0; peoples =  '';
        religions = 0; codecsdls = ''; sstatus = 1;
    }
    $('#modal-search').modal('hide');
    $('#list_student').load(baseUrl + '/student/content?code='+codes+'&name='+names+'&date='+dates+'&class='+departments+'&address='+addresss+'&gender='+genders+'&people='+peoples+'&religion='+religions+'&codecsdl='+codecsdls+'&page=1'+'&status='+sstatus);
}