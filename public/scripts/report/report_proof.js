var page = 1, squan = '', sstand = '', scriteria = '', scode = '', stitle = '';
$(function(){
    $('#list_proof').load(baseUrl + '/report_proof/content');
});

function view_page_proof(pages){
    page = pages;
    $('#list_proof').load(baseUrl + '/report_proof/content?page='+page+'&quan='+squan+'&stand='+sstand+'&criteria='+scriteria+'&code='+scode+'&title='+stitle);
}

function search_adv(){
    var squan = $('#squan').val().length != 0 ? $('#squan').val() : '';
    var sstand = $('#sstand').val().length != 0 ? $('#sstand').val() : '';
    var scriteria = $('#scriteria').val().length != 0 ? $('#scriteria').val() : '';
    var scode = $('#scode').val().length != 0 ? $('#scode').val().replaceAll(" ", "$", 'g') : '';
    var stitle = $('#stitle').val().length != 0 ? $('#stitle').val().replaceAll(" ", "$", 'g') : '';
    $('#list_proof').load(baseUrl + '/report_proof/content?page=1&quan='+squan+'&stand='+sstand+'&criteria='+scriteria+'&code='+scode+'&title='+stitle);
    $('#modal-search').modal('hide');
}

function print_proof(){
    window.open(baseUrl + '/report_proof/print_proof?quan='+squan+'&stand='+sstand+'&criteria='+scriteria+'&code='+scode+'&title='+stitle);
}

function filter(){
    combo_select_2('#squan',   baseUrl + '/report_proof/combo_quan');
    $('#modal-search').modal('show');
}

function set_standard(){
    var value = $('#squan').val();
    combo_select_2('#sstand',   baseUrl + '/report_proof/combo_stand?id='+value);
}

function set_criteria(){
    var value = $('#sstand').val();
    combo_select_2('#scriteria',   baseUrl + '/report_proof/combo_criteria?id='+value);
}

function del_quanlity(){
    $('#squan').val('').trigger('change');
}

function del_stand(){
    $('#sstand').val('').trigger('change');
}

function del_criteria(){
    $('#scriteria').val('').trigger('change');
}   