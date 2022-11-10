<?php
class Qrcode extends Controller{
    function __construct(){
        parent::__construct();
    }

    function index(){
        $data = base64_decode($_REQUEST['data']);
        $data = explode("_", $data);
        $this->view->type = $data[1];
        $this->view->render('qrcode/index');
    }

    function proof(){
        $data = base64_decode($_REQUEST['data']);
        $data = explode("_", $data);
        $this->view->type = $data[1];
        $this->view->jsonObj = $this->model->get_detail_proof($data[0]);
        $this->view->render('qrcode/proof');
    }

    function works(){
        $data = base64_decode($_REQUEST['data']);
        $data = explode("_", $data);
        $this->view->type = $data[1];
        $this->view->jsonObj = $this->model->get_detail_works($data[0]);
        $this->view->render('qrcode/works');
    }

    function document_in(){
        $data = base64_decode($_REQUEST['data']);
        $data = explode("_", $data);
        $this->view->type = $data[1];
        $this->view->jsonObj = $this->model->get_detail_document_in($data[0]);
        $this->view->render('qrcode/document_in');
    }

    function document_out(){
        $data = base64_decode($_REQUEST['data']);
        $data = explode("_", $data);
        $this->view->type = $data[1];
        $this->view->jsonObj = $this->model->get_detail_document_out($data[0]);
        $this->view->render('qrcode/document_out');
    }

    function library(){
        $data = base64_decode($_REQUEST['data']);
        $data = explode("_", $data); $code = explode('-', $data[0]);
        $this->view->type = $data[1];
        $jsonObj = $this->model->get_detail_book($code[0]);
        $this->view->jsonObj = $jsonObj;
        if($jsonObj[0]['type'] == 2){// sach dien tu se cap nhat so luot doc
            $data = array("book_id" => $jsonObj[0]['id'], "time_read" => date("Y-m-d H:i:s"),
                            "info_read" => $_SERVER['REMOTE_ADDR'].'::'. $_SERVER['HTTP_USER_AGENT']);
            $this->model->addObj_read($data);
        }
        $this->view->render('qrcode/library');
    }
}
?>