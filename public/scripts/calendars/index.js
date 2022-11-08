var page = 1, url = '', page_user = 1, keyword_user = '', data = [];
var page_device  = 1,   keyword_device = '';
var page_gear = 1, keyword_gear = '';
var page_dep = 1, keyword_dep  = '', date_loan = '', lesson = '';
var dates = '', less = '', deps = '', subjects = '', exps = '', titles = '', teachers = '';
$(function(){
    $('#list_task').load(baseUrl + '/calendars/content');
});

function add(){
	let today = new Date(), ngay = today.getDate(), thang = (today.getMonth() + 1);
    var nam = today.getFullYear(), hientai = ngay+'-'+thang+'-'+nam; 
    $('#date_study').datepicker('setDate', hientai); $('#modal-cal').modal('show');
	var $userid = $('#user_id').val(); $('#lesson_export').val(''); $('#title').val('');  
	$('#subject_id').val(null).trigger('change'); $('#department_id').val(null).trigger('change');
	combo_select_2('#lesson', baseUrl + '/calendars/combo_lesson', 0, ''); $('#lesson').val('').trigger('change');
	if($userid.length != 0){
		combo_select_2('#subject_id', baseUrl + '/other/combo_subject_user', 0, '');
	}
	data = []; render_table(data);
	url = baseUrl + '/calendars/add';
}

function edit(idh){
	$.getJSON(baseUrl + '/calendars/data_edit?id='+idh, function(data){
		$('#user_id').val(data.user_id); $('#fullname').val(data.fullname);
		$('#date_study').datepicker('setDate', data.date_study); $('#code').val(data.code);
		combo_select_2('#subject_id', baseUrl + '/other/combo_subject_user?id='+data.user_id, data.subject_id, data.subject);
		combo_select_2('#department_id', baseUrl + '/other/combo_department_user?id='+data.subject_id+'&userid='+data.user_id, data.department_id, data.department);
		combo_select_2('#lesson', baseUrl + '/calendars/combo_lesson?id='+data.department_id+'&date_study='+data.date_study+'&lesson_id='+data.lesson, data.lesson, 'Tiết '+data.lesson);
		$('#lesson_export').val(data.lesson_export); $('#title').val(data.title);
	}); var datadc = $('#datadc_'+idh).text(); data = JSON.parse(datadc); render_table(data);
	$('#modal-cal').modal('show');
	url = baseUrl + '/calendars/update?id='+idh;
}

function del(idh){
	var data_str = "id="+idh;
	del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này?", baseUrl+'/calendars/del', '#list_task', baseUrl + '/calendars/content?page='+page);
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
		$('#datadc').val(JSON.stringify(data));
        save_form_modal('#fm', url, '#modal-cal', '#list_task',  baseUrl + '/calendars/content?page='+page); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function detail(idh){
	$('#detail').load(baseUrl + '/calendars/detail?id='+idh);
	$('#modal-detail').modal('show');
}

function view_page_task(pages){
	page = pages;
	//$('#list_task').load(baseUrl + '/calendars/content?page='+page+'&title='+titles+'&date='+datestudy+'&lesson='+lessons+'&lesson_export='+lessonexps+'&teacher='+teacher+'&department_id='+department+'&subject_id='+subjects);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function select_user(){
	$('#modal-users').modal('show');
	$('#list_users').load(baseUrl+'/calendars/list_user');
	$('#pager').load(baseUrl+'/calendars/list_user_page');
}

function search_user(){
	var value = $('#nav-search-input-user').val();
	if(value.length != 0){
        keyword_user = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_user = '';
    }
	$('#list_users').load(baseUrl+'/calendars/list_user?page=1&q='+keyword_user);
	$('#pager').load(baseUrl+'/calendars/list_user_page?page=1&q='+keyword_user);
}

function view_page_user(pages){
	page_user = pages;
	$('#list_users').load(baseUrl+'/calendars/list_user?page='+page_user+'&q='+keyword_user);
	$('#pager').load(baseUrl+'/calendars/list_user_page?page='+page_user+'&q='+keyword_user);
}

function confirm_user(idh){
	$('#user_id').val(idh); var fullname = $('#fullname_'+idh).text();
	$('#fullname').val(fullname);
	combo_select_2('#subject_id', baseUrl + '/other/combo_subject_user?id='+idh, 0, '');
	$('#modal-users').modal('hide');
}
///////////////////////////////////////////////////////////////////////////////////////////////
function set_dep(){
	var value = $('#subject_id').val(), user_id = $('#user_id').val();
	combo_select_2('#department_id', baseUrl + '/other/combo_department_user?id='+value+'&userid='+user_id, 0, '');
}

function set_lesson(){
	var value = $('#department_id').val(), date_study = $('#date_study').val(); 
	if(date_study.length != 0){
		combo_select_2('#lesson', baseUrl + '/calendars/combo_lesson?id='+value+'&date_study='+date_study, 0, '');
	}else{
		show_message("error", "Bạn chưa chọn ngày dạy");
		return false;
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////
function select_device(){
	var date_study = $('#date_study').val();
	if(date_study.length != 0){
		date_loan = date_study;
		$('#list_device').load(baseUrl + '/calendars/list_device?date='+date_loan);
		$('#pager_device').load(baseUrl + '/calendars/list_device_page');
		$('#modal-device').modal('show');
	}else{
		show_message("error", "Để thực hiện đăng ký sử dụng thiết bị bạn phải chọn ngày dạy");
	}
}

function search_device(){
	var value = $('#nav-search-input-device').val();
	if(value.length != 0){
        keyword_device = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_device = '';
    }
	$('#list_device').load(baseUrl + '/calendars/list_device?page=1&q='+keyword_device+'&date='+date_loan);
	$('#pager_device').load(baseUrl + '/calendars/list_device_page?page=1&q='+keyword_device);
}

function view_page_device(pages){
	page_device = pages;
	$('#list_device').load(baseUrl + '/calendars/list_device?page='+page_device+'&q='+keyword_device+'&date='+date_loan);
	$('#pager_device').load(baseUrl + '/calendars/list_device_page?page='+page_device+'&q='+keyword_device);
}

function confirm_device(idh){
	var title = $('#title_'+idh).text(), sub_code = $('#device_'+idh).val();
	var str = {'id': idh+'.'+sub_code+".1", 'title': title, 'type': 1, 'id_detail': 0};
	var objIndex =  data.findIndex(item => item.id == idh+"."+sub_code+".1");
	if(objIndex != -1){
		show_message("error", "Thiết bị đã được chọn, không thể chọn lại được");
	}else{
    	data.push(str); $('#modal-device').modal('hide');
		render_table(data);
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////
function select_gear(){
	var date_study = $('#date_study').val();
	if(date_study.length != 0){
		date_loan = date_study;
		$('#list_gear').load(baseUrl + '/calendars/list_gear?date='+date_loan);
		$('#pager_gear').load(baseUrl + '/calendars/list_gear_page');
		$('#modal-gear').modal('show');
	}else{
		show_message("error", "Để thực hiện đăng ký sử dụng đồ dùng bạn phải chọn ngày dạy");
	}
}

function search_gear(){
	var value = $('#nav-search-input-gear').val();
	if(value.length != 0){
        keyword_gear = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_gear = '';
    }
	$('#list_gear').load(baseUrl + '/calendars/list_gear?page=1&q='+keyword_gear+'&date='+date_loan);
	$('#pager_gear').load(baseUrl + '/calendars/list_gear_page?page=1&q='+keyword_gear);
}

function view_page_gear(pages){
	page_gear = pages;
	$('#list_gear').load(baseUrl + '/calendars/list_gear?page='+page_gear+'&q='+keyword_gear+'&date='+date_loan);
	$('#pager_gear').load(baseUrl + '/calendars/list_gear_page?page='+page_gear+'&q='+keyword_gear);
}

function confirm_gear(idh){
	var title = $('#title_'+idh).text(), sub_code = $('#gear_'+idh).val();
	var str = {'id': idh+'.'+sub_code+'.2', 'title': title, 'type': 2, 'id_detail': 0};
	var objIndex =  data.findIndex(item => item.id == idh+"."+sub_code+".2");
	if(objIndex != -1){
		show_message("error", "Đồ dùng đã được chọn, không thể chọn lại được");
	}else{
    	data.push(str); $('#modal-gear').modal('hide');
		render_table(data);
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////
function select_dep(){
	var date_study = $('#date_study').val(), lessonloan = $('#lesson').val();
	if(date_study.length != 0 && lessonloan != null){
		date_loan = date_study; lesson = lessonloan;
		$('#list_dep').load(baseUrl + '/calendars/list_dep?date='+date_loan+'&lesson='+lesson);
		$('#pager_dep').load(baseUrl + '/calendars/list_dep_page?date='+date_loan+'&lesson='+lesson);
		$('#modal-dep').modal('show');
	}else{
		show_message("error", "Để thực hiện đăng ký sử phòng chức năng bạn phải chọn ngày dạy và tiết học");
	}
}

function search_dep(){
	var value = $('#nav-search-input-dep').val();
	if(value.length != 0){
        keyword_dep = value.replaceAll(" ", "$", 'g');
    }else{
        keyword_dep = '';
    }
	$('#list_dep').load(baseUrl + '/calendars/list_dep?page=1&q='+keyword_dep+'&date='+date_loan+'&lesson='+lesson);
	$('#pager_dep').load(baseUrl + '/calendars/list_dep_page?page=1&q='+keyword_dep+'&date='+date_loan+'&lesson='+lesson);
}

function view_page_dep(pages){
	page_dep = pages;
	$('#list_dep').load(baseUrl + '/calendars/list_dep?page='+page_dep+'&q='+keyword_dep+'&date='+date_loan+'&lesson='+lesson);
	$('#pager_dep').load(baseUrl + '/calendars/list_dep_page?page='+page_dep+'&q='+keyword_dep+'&date='+date_loan+'&lesson='+lesson);
}

function confirm_dep(idh){
	var title = $('#title_'+idh).text();
	var str = {'id': idh+'.3', 'title': title, 'type': 3, 'id_detail': 0};
	var objIndex =  data.findIndex(item => item.id == idh+'.3');
	if(objIndex != -1){
		show_message("error", "Phòng chức năng đã được chọn, không thể chọn lại được");
	}else{
    	data.push(str); $('#modal-dep').modal('hide');
		render_table(data);
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function del_selected(idh){
	data = data.filter(item => item.id != idh);
	render_table(data);
}

function render_table(data_json){
	$('#tbody').empty(); var html = '';
	for(i = 0; i < data_json.length; i++){
		html += '<li class="text-primary">';
			html += data_json[i].title+" | ";
			html += '<a href="javascript:void(0)" onclick="del_selected(\''+data_json[i].id+'\')">';
				html += '<i class="fa fa-trash" style="color:red"></i>';
			html += '</a>';
		html += '</li>';
    }
    $('#tbody').append(html);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
function filter(){
	combo_select_2('#subjects', baseUrl + '/other/combo_subject');
	combo_select_2('#deps',  baseUrl + '/other/combo_department?yearid='+yearid);
	$('#modal-search').modal('show');
}

function search(){
	var date = $('#dates').val(), subject = $('#subjects').val(), dep = $('#deps').val();
	var les = $('#less').val(), exp = $('#exps').val(), title = $('#titles').val();
	var teacher = $('#teachers').val();
	if(date.length != 0 || subject.length != 0 || dep.length != 0 || les.length != 0
	|| exp.length != 0 || title.length != 0 || teacher.length != 0){
		if(title.length != 0){
			titles = title.replaceAll(" ", "$", 'g');
		}else{
			titles = '';
		}
		if(teacher.length != 0){
			teachers = teacher.replaceAll(" ", "$", 'g');
		}else{
			teachers = '';
		}
		dates = date; subjects = subject; deps = dep; less = les; exps = exp;
	}else{
		dates = ''; subjecs = ''; deps = ''; less = ''; exps = ''; titles = '', teachers = '';
	}
	$('#list_task').load(baseUrl + '/calendars/content?page=1&date='+dates+'&title='+titles+'&lesson='+less+'&lesson_export='+exps+'&department_id='+deps+'&subject_id='+subjects+'&teacher='+teachers);
	$('#modal-search').modal('hide');
}

function del_combo_sub(){
	$('#subjects').val('').trigger('change');
}

function del_combo_dep(){
	$('#deps').val('').trigger('change');
}