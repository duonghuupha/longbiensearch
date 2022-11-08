var page = 1, url = baseUrl + '/group_task/add';
$(function(){
    $('#list_group').load(baseUrl + '/group_task/content');
});

function edit(idh){
    var title = $('#title_'+idh).text();
    $('#title').val(title);
    url = baseUrl + '/group_task/update?id='+idh;
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
        save_form_reset_form('#fm', url, '#list_group',  baseUrl+'/group_task/content?page='+page); 
    }else{
        show_message("error", "Chưa điền đủ thông tin");
    }
}

function del(idh){
    var data_str = "id="+idh;
    del_data(data_str, 'Bạn có chắc chắn muốn xóa bản ghi này?', baseUrl+'/group_task/del', '#list_group', baseUrl + '/group_task/content?page='+page);
}


function  view_page_group_task(pages){
    page = pages;
    $('#list_group').load(baseUrl + '/group_task/content?page='+page);
}