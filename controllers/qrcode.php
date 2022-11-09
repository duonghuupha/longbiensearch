<?php
class Qrcode extends Controller{
    function __construct(){
        parent::__construct();
    }

    function index(){
        $data = base64_decode($_REQUEST['data']);
        $data = explode("_", $data);
        $this->view->type = $data[1];
        $this->view->jsonObj = $this->model->get_detail_proof($data[0]);
        $this->view->render('qrcode/index');
    }
}
?>