var page = 1, gender = 0, level = '', job = '', subject = '';
$(function(){
    $('#list_personel').load(baseUrl + '/report_personel/content?page='+page+'&gender='+gender+'&level='+level+'&job='+job+'&subject='+subject);
    combo_select_2('#level_s', baseUrl + '/other/combo_level');
    combo_select_2('#job_s', baseUrl + '/other/combo_job');
    combo_select_2('#subject_s', baseUrl + '/other/combo_subject');
});

function del_level(){
    $('#level_s').val(null).trigger('change');
}

function del_job(){
    $('#job_s').val(null).trigger('change');
}

function del_subject(){
    $('#subject_s').val(null).trigger('change');
}

function search(){
    var genders = $('#gender_s').val(), levels = $('#level_s').val(), jobs = $('#job_s').val();
    var subjects = $('#subject_s').val();
    if(genders != 0 || levels.length != 0 || jobs.length != 0 || subjects.length != 0){
        gender = genders; level = levels; job = jobs; subject = subjects;
    }else{
        gender = 0; level = ''; job = ''; subject = '';
    }
    $('#list_personel').load(baseUrl + '/report_personel/content?page=1&gender='+gender+'&level='+level+'&job='+job+'&subject='+subject);
}

function view_page_personal(pages){
    page = pages;
    $('#list_personel').load(baseUrl + '/report_personel/content?page='+page+'&gender='+gender+'&level='+level+'&job='+job+'&subject='+subject);
}

function export_xls(){
    var genders = $('#gender_s').val(), levels = $('#level_s').val(), jobs = $('#job_s').val();
    var subjects = $('#subject_s').val();
    if(genders != 0 || levels.length != 0 || jobs.length != 0 || subjects.length != 0){
        gender = genders; level = levels; job = jobs; subject = subjects;
    }else{
        gender = 0; level = ''; job = ''; subject = '';
    }
    window.open(baseUrl + '/report_personel/export&gender='+gender+'&level='+level+'&job='+job+'&subject='+subject);
}
