<?php
class Model {
    function __construct() {
		$this->db = new Database();
	}
//////////////////////////////////////////////////////////////////////////////////////////////////
	function get_info_document_in($id){
		$query = $this->db->query("SELECT id, cate_id, file FROM tbl_document_in WHERE id = $id");
		return $query->fetchAll();
	}
	function get_info_document_out($id){
		$query = $this->db->query("SELECT id, cate_id, file FROM tbl_document_out WHERE id = $id");
		return $query->fetchAll();
	}
/////////////////////////////////////end cac ham khac ///////////////////////////////////////////////////////////////////////
}

?>
