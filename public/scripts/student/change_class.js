var page = 1, keyword = '';
$(function(){
    $('#list_change').load(baseUrl + '/change_class/content');
    //$('#class_to').load(baseUrl + '/other/combo_department?yearid='+yearid);
    combo_select_2('#class_to', baseUrl + '/other/combo_department?yearid='+yearid, 0, '');
    combo_select2_student('#student_id', baseUrl + '/change_class/student');
});

function set_current_class(){
    $('#student_id').on('select2:select', function(e){
        var data = e.params.data;
        $('#class_current_id').val(data.department_id);
        $('#class_current').val(data.department);
    });
}

function check_class_to(){
    var value = $('#class_to').val();
    if(value == $('#class_current_id').val()){
        show_message("error", "Không thể chuyển đến cùng lớp");
        $('#class_to').val(null).trigger('change');
        return false;
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
        if($('#class_current_id').val() != $('#class_to').val()){
            save_form_reset_form('#fm', baseUrl+'/change_class/add', '#list_change', baseUrl + '/change_class/content'); 
        }else{
            show_message("error", "Không thể chuyển học sinh đến lớp hiện tại");
        }
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function view_page_change(pages){
    page = pages;
    $('#list_change').load(baseUrl + '/change_class/content?page='+page+'&q='+keyword);
}

function search(){
    var value = $('#nav-search-input').val();
    if(value.length != 0){
        keyword = value.replaceAll(" ", "$", 'g');
        $('#list_change').load(baseUrl + '/change_class/content?page=1&q='+keyword);
    }else{
        keyword = '';
        $('#list_change').load(baseUrl + '/change_class/content?page=1&q='+keyword);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function combo_select2_student(id_select, url_data){
    $(id_select).select2({
        ajax: {
            url: url_data,
            type: 'POST',
            dataType: 'json',
            data: function (params) {
                return {
                    keyWord: params.term
                };
            },
            processResults: function (data, params) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.title,
                            id: item.id,
                            content: item.content,
                            department_id: item.department_id,
                            department: item.department
                        };
                    })
                };
            }
        },
        templateResult: format_content
    });
}