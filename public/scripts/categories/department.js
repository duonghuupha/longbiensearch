var page = 1, keyword = '', url = baseUrl +'/department/add';
$(function(){
    $('#list_department').load(baseUrl + '/department/content');
    combo_select_2('#year_id', baseUrl + '/other/combo_years', 0, '');
    combo_select_2('#physical_id', baseUrl + '/other/combo_physical', 0, '');
    $('#is_function').attr('disabled', true);
});

function edit(idh){
    var title = $('#title_'+idh).text(), year = $('#yearid_'+idh).text(), physical = $('#physicalid_'+idh).text();
    $('#year_id').val(year).trigger('change'); $('#physical_id').val(physical).trigger('change');
    $('#title').val(title.trim()); var study = $('#study_'+idh).text(), isdefault = $('#default_'+idh).text();
    var isfunction = $('#function_'+idh).text();
    if(study == 1){
        $('#class_study').prop('checked',true);
    }else{
        $('#class_study').prop('checked',false);
    }
    if(isdefault == 1){
        $('#is_default').prop('checked',true);
        $('#is_function').attr("disabled", true);
        $('#class_study').prop('checked', true);
        $('#class_study').attr('disabled', false);
        $('#is_function').val(null).trigger('change');
        $('#is_function').attr('required', false);
    }else{
        $('#is_default').prop('checked',false);
        $('#is_function').attr("disabled", false);
        $('#class_study').prop('checked', false);
        $('#class_study').attr('disabled', true);
        $('#is_function').val(isfunction).trigger('change');
        $('#is_function').attr('required', true);
    }
    url = baseUrl + '/department/update?id='+idh;
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, "Bạn có chắc chắn muốn xóa bản ghi này ?", baseUrl+'/department/del', '#list_department', baseUrl+'/department/content?page='+page+'&q='+keyword);
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
        save_reject('#fm', url,  baseUrl+'/department'); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_department(pages){
    page = pages;
    $('#list_department').load(baseUrl + '/department/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_department').load(baseUrl + '/department/content?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_department').load(baseUrl + '/department/content?page=1&q='+keyword);
    }
}
//////////////////////////////////////////////////////////////////////////////
function copy(){
    combo_select_2('#year_from', baseUrl + '/other/combo_years', yearid, year_title);
    combo_select_2('#year_to', baseUrl + '/other/combo_years', 0, '');
    var demo1 = $('select[name="department_id[]"]').bootstrapDualListbox({
        infoTextFiltered: '<span class="label label-purple label-lg">Kết quả tìm kiếm</span>',
        filterPlaceHolder: 'Tìm kiếm',
        infoText: 'Hiển thị {0}',
        infoTextEmpty: 'Không có bản ghi',
        filterTextClear: 'Tất cả'
    });
    var container1 = demo1.bootstrapDualListbox('getContainer');
    container1.find('.btn').addClass('btn-white btn-info btn-bold');
    $('#modal-copy').modal('show');
}

function set_list_department(){
    var year = $('#year_from').val();
    $('#department_id').empty();
    $.getJSON(baseUrl + '/department/list_department?id='+year, function(data){
        $.each(data, function(i, val){
            var opt = "<option value=\'"+val.id+"\'>"+val.title+"</option>";
            $('#department_id').append(opt);
        });
        $('#department_id').bootstrapDualListbox('refresh', true);
    });
}

function save_copy(){
    var department = $('#department_id').val();
    var yearfrom = $('#year_from').val(), yearto = $('#year_to').val();
    if(department !== null && yearfrom.length > 0 && yearto.length > 0){
        if(yearfrom != yearto){
            save_form_modal('#fm_copy',  baseUrl+'/department/copy', '#modal-copy', '#list_department', baseUrl + '/department/content'); 
        }else{
            show_message("error", "Không thể copy dữ liệu cho cùng năm học");
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function set_default(){
    var value = $('#is_default').is(':checked');
    if(value){
        $('#is_function').attr("disabled", true);
        $('#class_study').prop('checked', true);
        $('#class_study').attr('disabled', false);
        $('#is_function').attr('required', false);
    }else{
        $('#is_function').attr("disabled", false);
        $('#class_study').prop('checked', false);
        $('#class_study').attr('disabled', true);
        $('#is_function').attr('required', true);
    }
}