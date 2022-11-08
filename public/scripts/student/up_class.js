var page = 1;
$(function(){
    $('#list_change').load(baseUrl + '/up_class/content');
    combo_select_2('#department_from', baseUrl + '/other/combo_department?yearid='+yearid);
    ////////////////////////////////////////////////////////////////////////////////
    combo_select_2('#year_to', baseUrl + '/other/combo_years', 0, '');
});

function view_page_change(pages){
    page = pages;
    $('#list_change').load(baseUrl + '/up_class/content?page='+page);
}

function set_department(){
    var value = $('#year_to').val();
    if(value == yearid){
        show_message("error", "Không thể lên  lớp trong cùng một năm học");
        $('#year_to').val(null).trigger("change");
        return false;
    }else{
        //$('#department_to').load(baseUrl + '/other/combo_department?yearid='+value);
        combo_select_2('#department_to', baseUrl + '/other/combo_department?yearid='+value);
    }
}

function save(){
    var value = $('#year_to').val();
    var required = $('input,textarea,select').filter('[required]:visible');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(allRequired && value != yearid){
        save_reject('#fm', baseUrl + '/up_class/add', baseUrl+'/up_class'); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}