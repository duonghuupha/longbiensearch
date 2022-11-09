<?php
class Result extends Controller{
    function __construct(){
        parent::__construct();
    }

    function index(){
        $rows = 10;
        $keyword = isset($_REQUEST['q']) ? str_replace("+", " ", $_REQUEST['q']) : '';
        $get_pages = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $offset = ($get_pages-1)*$rows;
        $jsonObj = $this->model->getFetObj($keyword,  $offset, $rows);
        $this->view->jsonObj = $jsonObj; $this->view->perpage = $rows; $this->view->page = $get_pages;
        $this->view->render('result/index');
    }
}
?>
