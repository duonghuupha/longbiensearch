var url = '', page_level = 1, page_job = 1, page_subject = 1, page_years = 1, page_equipment = 1, page_utensils = 1;
$(function(){
    $('#list_level').load(baseUrl + '/level/content');
    $('#list_job').load(baseUrl + '/job/content');
    $('#list_subject').load(baseUrl + '/subject/content');
    $('#list_years').load(baseUrl + '/years/content');
    $('#list_equipment').load(baseUrl + '/equipment/content');
    $('#list_utensils').load(baseUrl + '/utensils/content');
    $('#sidebar').removeClass('menu-min');
});

/**
 * Level
 */
function add_level(){
    $('#form').load(baseUrl + '/level/form');
    $('#modal-form').modal('show');
    url = baseUrl + '/level/add';
}

function edit_level(idh){
    $('#form').load(baseUrl + '/level/form?id='+idh);
    $('#modal-form').modal('show');
    url = baseUrl + '/level/update';
}

function del_level(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl+'/level/del', '#list_level', baseUrl+'/level/content?page='+page_level);
}

function save_level(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-form', '#list_level',  baseUrl+'/level/content?page='+page_level); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_level(pages){
    page_level = pages;
    $('#list_level').load(baseUrl + '/level/content?page='+page_level);
}

/**
 * Job
 */
 function add_job(){
    $('#form').load(baseUrl + '/job/form');
    $('#modal-form').modal('show');
    url = baseUrl + '/job/add';
}

function edit_job(idh){
    $('#form').load(baseUrl + '/job/form?id='+idh);
    $('#modal-form').modal('show');
    url = baseUrl + '/job/update';
}

function del_job(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl+'/job/del', '#list_job', baseUrl+'/job/content?page='+page_job);
}

function save_job(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-form', '#list_job',  baseUrl+'/job/content?page='+page_job); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_job(pages){
    page_job = pages;
    $('#list_job').load(baseUrl + '/job/content?page='+page_job);
}

function change_job(idh, status){
    var data_str = "id="+idh+'&status='+status;
    del_data(data_str, "Bạn có muốn cập nhật trạng thái cho bản ghi này không ?",   baseUrl + '/job/change', '#list_job', baseUrl + '/job/content?page='+page_job);
}

/**
 * Subject
 */
 function add_subject(){
    $('#form').load(baseUrl + '/subject/form');
    $('#modal-form').modal('show');
    url = baseUrl+'/subject/add';
}

function edit_subject(idh){
    $('#form').load(baseUrl + '/subject/form?id='+idh);
    $('#modal-form').modal('show');
    url = baseUrl+'/subject/update';
}

function del_subject(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl+'/subject/del', '#list_subject', baseUrl+'/subject/content?page='+page_subject);
}

function save_subject(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-form', '#list_subject',  baseUrl+'/subject/content?page='+page_subject); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_subject(pages){
    page_subject = pages;
    $('#list_subject').load(baseUrl + '/subject/content?page='+page_subject);
}

/**
 * Years
 */
function add_years(){
    $('#form').load(baseUrl + '/years/form');
    $('#modal-form').modal('show');
    url = baseUrl + '/years/add';
}

function edit_years(idh){
    $('#form').load(baseUrl + '/years/form?id='+idh);
    $('#modal-form').modal('show');
    url = baseUrl + '/years/update';
}

function del_years(idh, active){
    if(active == 1){
        show_message("error", "Năm học đang kích hoạt, bạn không thể xóa");
    }else{
        var data_str = "id="+idh;
        del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl+'/years/del', '#list_years', baseUrl+'/years/content?page='+page_years);
    }
}

function save_years(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-form', '#list_years',  baseUrl+'/years/content?page='+page_years); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_years(pages){
    page_years = pages;
    $('#list_years').load(baseUrl + '/years/content?page='+page_years);
}

function change(status, idh){
    var data_str = "id="+idh+"&status="+status;
    del_data(data_str, "Bạn có chắc chắn muốn cập nhật trạng thái cho bản ghi này ?", baseUrl+'/years/change', '#list_years', baseUrl+'/years/content?page='+page_years);
}
/**
 * list_equipment
 */
function add_equipment(){
    $('#form').load(baseUrl + '/equipment/form');
    $('#modal-form').modal('show');
    url = baseUrl + '/equipment/add';
}

function edit_equipment(idh){
    $('#form').load(baseUrl + '/equipment/form?id='+idh);
    $('#modal-form').modal('show');
    url = baseUrl + '/equipment/update';
}

function del_equipment(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl+'/equipment/del', '#list_equipment', baseUrl+'/equipment/content?page='+page_equipment);
}

function save_equipment(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-form', '#list_equipment',  baseUrl+'/equipment/content?page='+page_equipment); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_equipment(pages){
    page_equipment = pages;
    $('#list_equipment').load(baseUrl+'/equipment/content?page='+page_equipment);
}
/**
 * list_utensils
 * utensils
 */
 function add_utensils(){
    $('#form').load(baseUrl + '/utensils/form');
    $('#modal-form').modal('show');
    url = baseUrl + '/utensils/add';
}

function edit_utensils(idh){
    $('#form').load(baseUrl + '/utensils/form?id='+idh);
    $('#modal-form').modal('show');
    url = baseUrl + '/utensils/update';
}

function del_utensils(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl+'/utensils/del', '#list_utensils', baseUrl+'/utensils/content?page='+page_utensils);
}

function save_utensils(){
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired){
        save_form_modal('#fm', url, '#modal-form', '#list_utensils',  baseUrl+'/utensils/content?page='+page_utensils); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_utensils(pages){
    page_utensils = pages;
    $('#list_utensils').load(baseUrl+'/utensils/content?page='+page_utensils);
}